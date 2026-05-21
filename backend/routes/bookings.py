import logging

from flask import (
    Blueprint,
    jsonify,
    request
)

from models import (
    db,
    Booking
)


# ============================================================
# BLUEPRINT
# ============================================================
booking_bp = Blueprint(
    "bookings",
    __name__
)

logger = logging.getLogger(__name__)


# ============================================================
# CREATE BOOKING
# ============================================================
@booking_bp.route(
    "/",
    methods=["POST"]
)
def create_booking():

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

        full_name = (
            data.get("full_name", "")
            .strip()
        )

        email = (
            data.get("email", "")
            .strip()
        )

        phone = (
            data.get("phone", "")
            .strip()
        )

        project_type = (
            data.get(
                "project_type",
                ""
            ).strip()
        )

        budget = (
            data.get("budget", "")
            .strip()
        )

        message = (
            data.get("message", "")
            .strip()
        )

        # ====================================================
        # REQUIRED FIELDS
        # ====================================================
        if not full_name:

            return jsonify({

                "success": False,

                "error":
                    "Full name is required"

            }), 400

        if not email:

            return jsonify({

                "success": False,

                "error":
                    "Email is required"

            }), 400

        if not phone:

            return jsonify({

                "success": False,

                "error":
                    "Phone number is required"

            }), 400

        # ====================================================
        # CREATE BOOKING
        # ====================================================
        new_booking = Booking(

            full_name=full_name,

            email=email,

            phone=phone,

            project_type=project_type,

            budget=budget,

            message=message
        )

        db.session.add(
            new_booking
        )

        db.session.commit()

        logger.info(
            f"New booking created "
            f"by {email}"
        )

        return jsonify({

            "success": True,

            "message":
                "Booking created successfully",

            "data":
                new_booking.to_dict()

        }), 201

    except Exception as error:

        logger.exception(
            "Failed to create booking"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# GET ALL BOOKINGS
# ============================================================
@booking_bp.route(
    "/",
    methods=["GET"]
)
def get_bookings():

    try:

        bookings = (
            Booking.query
            .order_by(
                Booking.created_at.desc()
            )
            .all()
        )

        return jsonify({

            "success": True,

            "count":
                len(bookings),

            "data": [

                booking.to_dict()

                for booking in bookings
            ]

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to fetch bookings"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# GET SINGLE BOOKING
# ============================================================
@booking_bp.route(
    "/<int:booking_id>",
    methods=["GET"]
)
def get_single_booking(
    booking_id
):

    try:

        booking = (
            Booking.query.get(
                booking_id
            )
        )

        if not booking:

            return jsonify({

                "success": False,

                "error":
                    "Booking not found"

            }), 404

        return jsonify({

            "success": True,

            "data":
                booking.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to fetch booking"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# UPDATE BOOKING STATUS
# ============================================================
@booking_bp.route(
    "/<int:booking_id>",
    methods=["PUT"]
)
def update_booking_status(
    booking_id
):

    try:

        booking = (
            Booking.query.get(
                booking_id
            )
        )

        if not booking:

            return jsonify({

                "success": False,

                "error":
                    "Booking not found"

            }), 404

        data = request.get_json()

        status = (
            data.get("status")
        )

        valid_statuses = [

            "Pending",

            "Approved",

            "Rejected",

            "Completed"
        ]

        if status not in valid_statuses:

            return jsonify({

                "success": False,

                "error":
                    "Invalid booking status"

            }), 400

        booking.status = status

        db.session.commit()

        return jsonify({

            "success": True,

            "message":
                "Booking updated successfully",

            "data":
                booking.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to update booking"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# DELETE BOOKING
# ============================================================
@booking_bp.route(
    "/<int:booking_id>",
    methods=["DELETE"]
)
def delete_booking(
    booking_id
):

    try:

        booking = (
            Booking.query.get(
                booking_id
            )
        )

        if not booking:

            return jsonify({

                "success": False,

                "error":
                    "Booking not found"

            }), 404

        db.session.delete(
            booking
        )

        db.session.commit()

        return jsonify({

            "success": True,

            "message":
                "Booking deleted successfully"

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to delete booking"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500