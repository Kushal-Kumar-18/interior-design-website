import logging

from flask import (

    Blueprint,

    jsonify,

    request
)

from models import (

    db,

    WebsiteSetting
)


# ============================================================
# BLUEPRINT
# ============================================================
settings_bp = Blueprint(

    "settings",

    __name__
)

logger = logging.getLogger(__name__)


# ============================================================
# GET SETTINGS
# ============================================================
@settings_bp.route(
    "/",
    methods=["GET"]
)
def get_settings():

    try:

        settings = (
            WebsiteSetting.query.first()
        )

        # ====================================================
        # CREATE DEFAULT SETTINGS
        # ====================================================
        if not settings:

            settings = WebsiteSetting(

                website_name=
                    "InteriorX",

                tagline=
                    "Luxury Interior Design Studio",

                phone=
                    "+91 98765 43210",

                email=
                    "hello@interiorx.com",

                address=
                    "Bangalore, Karnataka",

                instagram=
                    "https://instagram.com/interiorx",

                facebook=
                    "https://facebook.com/interiorx",

                linkedin=
                    "https://linkedin.com/company/interiorx",

                meta_title=
                    "InteriorX Luxury Interiors",

                meta_description=(
                    "Luxury interior design "
                    "studio delivering "
                    "timeless elegant spaces."
                ),
            )

            db.session.add(
                settings
            )

            db.session.commit()

        return jsonify({

            "success": True,

            "data":
                settings.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to fetch settings"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# UPDATE SETTINGS
# ============================================================
@settings_bp.route(
    "/",
    methods=["PUT"]
)
def update_settings():

    try:

        data = request.get_json()

        settings = (
            WebsiteSetting.query.first()
        )

        # ====================================================
        # CREATE IF NOT EXISTS
        # ====================================================
        if not settings:

            settings = WebsiteSetting()

            db.session.add(
                settings
            )

        # ====================================================
        # UPDATE FIELDS
        # ====================================================
        settings.website_name = data.get(

            "website_name",

            settings.website_name
        )

        settings.tagline = data.get(

            "tagline",

            settings.tagline
        )

        settings.phone = data.get(

            "phone",

            settings.phone
        )

        settings.email = data.get(

            "email",

            settings.email
        )

        settings.address = data.get(

            "address",

            settings.address
        )

        settings.instagram = data.get(

            "instagram",

            settings.instagram
        )

        settings.facebook = data.get(

            "facebook",

            settings.facebook
        )

        settings.linkedin = data.get(

            "linkedin",

            settings.linkedin
        )

        settings.meta_title = data.get(

            "meta_title",

            settings.meta_title
        )

        settings.meta_description = data.get(

            "meta_description",

            settings.meta_description
        )

        db.session.commit()

        return jsonify({

            "success": True,

            "message":
                "Settings updated successfully",

            "data":
                settings.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to update settings"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500