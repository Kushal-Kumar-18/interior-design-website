import logging

from flask import (
    Blueprint,
    jsonify,
    request
)

from models import (
    db,
    Testimonial
)


# ============================================================
# BLUEPRINT
# ============================================================
testimonial_bp = Blueprint(
    "testimonials",
    __name__
)

logger = logging.getLogger(__name__)


# ============================================================
# CREATE TESTIMONIAL
# ============================================================
@testimonial_bp.route(
    "/",
    methods=["POST"]
)
def create_testimonial():

    try:

        data = request.get_json()

        # ====================================================
        # VALIDATION
        # ====================================================
        if not data:

            return jsonify({

                "success": False,

                "error":
                    "No data provided"

            }), 400

        client_name = (
            data.get(
                "client_name",
                ""
            ).strip()
        )

        review = (
            data.get(
                "review",
                ""
            ).strip()
        )

        if not client_name:

            return jsonify({

                "success": False,

                "error":
                    "Client name is required"

            }), 400

        if not review:

            return jsonify({

                "success": False,

                "error":
                    "Review is required"

            }), 400

        # ====================================================
        # CREATE TESTIMONIAL
        # ====================================================
        testimonial = Testimonial(

            client_name=client_name,

            designation=data.get(
                "designation"
            ),

            review=review,

            rating=data.get(
                "rating",
                5
            ),

            profile_image=data.get(
                "profile_image"
            ),

            featured=data.get(
                "featured",
                False
            )
        )

        db.session.add(
            testimonial
        )

        db.session.commit()

        logger.info(
            f"Testimonial created "
            f"for {client_name}"
        )

        return jsonify({

            "success": True,

            "message":
                "Testimonial created successfully",

            "data":
                testimonial.to_dict()

        }), 201

    except Exception as error:

        logger.exception(
            "Failed to create testimonial"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# GET ALL TESTIMONIALS
# ============================================================
@testimonial_bp.route(
    "/",
    methods=["GET"]
)
def get_testimonials():

    try:

        featured = request.args.get(
            "featured"
        )

        query = Testimonial.query

        # ====================================================
        # FILTER FEATURED
        # ====================================================
        if featured == "true":

            query = query.filter_by(
                featured=True
            )

        testimonials = (

            query

            .order_by(
                Testimonial.created_at.desc()
            )

            .all()
        )

        return jsonify({

            "success": True,

            "count":
                len(testimonials),

            "data": [

                testimonial.to_dict()

                for testimonial in testimonials
            ]

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to fetch testimonials"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# GET SINGLE TESTIMONIAL
# ============================================================
@testimonial_bp.route(
    "/<int:testimonial_id>",
    methods=["GET"]
)
def get_single_testimonial(
    testimonial_id
):

    try:

        testimonial = (
            Testimonial.query.get(
                testimonial_id
            )
        )

        if not testimonial:

            return jsonify({

                "success": False,

                "error":
                    "Testimonial not found"

            }), 404

        return jsonify({

            "success": True,

            "data":
                testimonial.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to fetch testimonial"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# UPDATE TESTIMONIAL
# ============================================================
@testimonial_bp.route(
    "/<int:testimonial_id>",
    methods=["PUT"]
)
def update_testimonial(
    testimonial_id
):

    try:

        testimonial = (
            Testimonial.query.get(
                testimonial_id
            )
        )

        if not testimonial:

            return jsonify({

                "success": False,

                "error":
                    "Testimonial not found"

            }), 404

        data = request.get_json()

        # ====================================================
        # UPDATE FIELDS
        # ====================================================
        testimonial.client_name = data.get(
            "client_name",
            testimonial.client_name
        )

        testimonial.designation = data.get(
            "designation",
            testimonial.designation
        )

        testimonial.review = data.get(
            "review",
            testimonial.review
        )

        testimonial.rating = data.get(
            "rating",
            testimonial.rating
        )

        testimonial.profile_image = data.get(
            "profile_image",
            testimonial.profile_image
        )

        testimonial.featured = data.get(
            "featured",
            testimonial.featured
        )

        db.session.commit()

        logger.info(
            f"Testimonial updated: "
            f"{testimonial.client_name}"
        )

        return jsonify({

            "success": True,

            "message":
                "Testimonial updated successfully",

            "data":
                testimonial.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to update testimonial"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# DELETE TESTIMONIAL
# ============================================================
@testimonial_bp.route(
    "/<int:testimonial_id>",
    methods=["DELETE"]
)
def delete_testimonial(
    testimonial_id
):

    try:

        testimonial = (
            Testimonial.query.get(
                testimonial_id
            )
        )

        if not testimonial:

            return jsonify({

                "success": False,

                "error":
                    "Testimonial not found"

            }), 404

        db.session.delete(
            testimonial
        )

        db.session.commit()

        logger.info(
            f"Testimonial deleted: "
            f"{testimonial.client_name}"
        )

        return jsonify({

            "success": True,

            "message":
                "Testimonial deleted successfully"

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to delete testimonial"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500