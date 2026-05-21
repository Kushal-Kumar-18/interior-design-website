from flask import (

    Blueprint,

    jsonify,

    request
)

from models import (

    db,

    Service
)


# ============================================================
# BLUEPRINT
# ============================================================
service_bp = Blueprint(

    "services",

    __name__
)


# ============================================================
# SERIALIZER
# ============================================================
def serialize_service(service):

    return {

        "id":
            service.id,

        "title":
            service.title,

        "slug":
            service.slug,

        "short_description":
            service.short_description,

        "description":
            service.description,

        "icon":
            service.icon,

        "cover_image":
            service.cover_image,

        "featured":
            service.featured,

        "created_at":
            (
                service.created_at.isoformat()

                if service.created_at

                else None
            ),
    }


# ============================================================
# GET ALL SERVICES
# ============================================================
@service_bp.route(
    "",
    methods=["GET"]
)
def get_services():

    try:

        featured = request.args.get(
            "featured"
        )

        query = Service.query


        # ====================================================
        # FEATURED FILTER
        # ====================================================
        if featured:

            featured_bool = (

                featured.lower()

                == "true"
            )

            query = query.filter_by(

                featured=
                    featured_bool
            )


        # ====================================================
        # ORDER
        # ====================================================
        services = query.order_by(

            Service.created_at.desc()

        ).all()


        return jsonify({

            "success": True,

            "count":
                len(services),

            "data": [

                serialize_service(
                    service
                )

                for service in services
            ]
        }), 200

    except Exception as e:

        print(
            "GET SERVICES ERROR:",
            e
        )

        return jsonify({

            "success": False,

            "error":
                "Failed to fetch services"
        }), 500


# ============================================================
# GET SINGLE SERVICE
# ============================================================
@service_bp.route(
    "/<int:service_id>",
    methods=["GET"]
)
def get_service(service_id):

    try:

        service = Service.query.get(
            service_id
        )

        if not service:

            return jsonify({

                "success": False,

                "error":
                    "Service not found"
            }), 404


        return jsonify({

            "success": True,

            "data":
                serialize_service(
                    service
                )
        }), 200

    except Exception as e:

        print(
            "GET SERVICE ERROR:",
            e
        )

        return jsonify({

            "success": False,

            "error":
                "Failed to fetch service"
        }), 500


# ============================================================
# CREATE SERVICE
# ============================================================
@service_bp.route(
    "",
    methods=["POST"]
)
def create_service():

    try:

        data = request.get_json()

        # ====================================================
        # VALIDATION
        # ====================================================
        required_fields = [

            "title",

            "description"
        ]

        for field in required_fields:

            if not data.get(field):

                return jsonify({

                    "success": False,

                    "error":
                        f"{field} is required"
                }), 400


        # ====================================================
        # CREATE SLUG
        # ====================================================
        slug = (

            data["title"]

            .lower()

            .replace(" ", "-")
        )


        # ====================================================
        # CREATE SERVICE
        # ====================================================
        service = Service(

            title=
                data.get("title"),

            slug=
                slug,

            short_description=
                data.get(
                    "short_description"
                ),

            description=
                data.get(
                    "description"
                ),

            icon=
                data.get("icon"),

            cover_image=
                data.get(
                    "cover_image"
                ),

            featured=
                data.get(
                    "featured",
                    False
                ),
        )

        db.session.add(
            service
        )

        db.session.commit()


        return jsonify({

            "success": True,

            "message":
                "Service created successfully",

            "data":
                serialize_service(
                    service
                )
        }), 201

    except Exception as e:

        db.session.rollback()

        print(
            "CREATE SERVICE ERROR:",
            e
        )

        return jsonify({

            "success": False,

            "error":
                "Failed to create service"
        }), 500


# ============================================================
# UPDATE SERVICE
# ============================================================
@service_bp.route(
    "/<int:service_id>",
    methods=["PUT"]
)
def update_service(service_id):

    try:

        service = Service.query.get(
                service_id
            )

        if not service:

            return jsonify({

                "success": False,

                "error":
                    "Service not found"
            }), 404


        data = request.get_json()


        # ====================================================
        # UPDATE FIELDS
        # ====================================================
        service.title = data.get(

            "title",

            service.title
        )

        service.slug = (

            service.title

            .lower()

            .replace(" ", "-")
        )

        service.short_description = data.get(

            "short_description",

            service.short_description
        )

        service.description = data.get(

            "description",

            service.description
        )

        service.icon = data.get(

            "icon",

            service.icon
        )

        service.cover_image = data.get(

            "cover_image",

            service.cover_image
        )

        service.featured = data.get(

            "featured",

            service.featured
        )


        db.session.commit()


        return jsonify({

            "success": True,

            "message":
                "Service updated successfully",

            "data":
                serialize_service(
                    service
                )
        }), 200

    except Exception as e:

        db.session.rollback()

        print(
            "UPDATE SERVICE ERROR:",
            e
        )

        return jsonify({

            "success": False,

            "error":
                "Failed to update service"
        }), 500


# ============================================================
# DELETE SERVICE
# ============================================================
@service_bp.route(
    "/<int:service_id>",
    methods=["DELETE"]
)
def delete_service(service_id):

    try:

        service = Service.query.get(
                service_id
            )

        if not service:

            return jsonify({

                "success": False,

                "error":
                    "Service not found"
            }), 404


        db.session.delete(
            service
        )

        db.session.commit()


        return jsonify({

            "success": True,

            "message":
                "Service deleted successfully"
        }), 200

    except Exception as e:

        db.session.rollback()

        print(
            "DELETE SERVICE ERROR:",
            e
        )

        return jsonify({

            "success": False,

            "error":
                "Failed to delete service"
        }), 500