import logging

from flask import (
    Blueprint,
    jsonify,
    request
)

from models import (
    db,
    ContactMessage
)


# ============================================================
# BLUEPRINT
# ============================================================
contact_bp = Blueprint(
    "contact",
    __name__
)

logger = logging.getLogger(__name__)


# ============================================================
# CREATE CONTACT MESSAGE
# ============================================================
@contact_bp.route(
    "/",
    methods=["POST"]
)
def create_contact_message():

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

        name = (
            data.get("name", "")
            .strip()
        )

        email = (
            data.get("email", "")
            .strip()
        )

        subject = (
            data.get("subject", "")
            .strip()
        )

        message = (
            data.get("message", "")
            .strip()
        )

        # ====================================================
        # REQUIRED FIELDS
        # ====================================================
        if not name:

            return jsonify({

                "success": False,

                "error":
                    "Name is required"

            }), 400

        if not email:

            return jsonify({

                "success": False,

                "error":
                    "Email is required"

            }), 400

        if not message:

            return jsonify({

                "success": False,

                "error":
                    "Message is required"

            }), 400

        # ====================================================
        # CREATE MESSAGE
        # ====================================================
        new_message = ContactMessage(

            name=name,

            email=email,

            subject=subject,

            message=message
        )

        db.session.add(
            new_message
        )

        db.session.commit()

        logger.info(
            f"New contact message "
            f"from {email}"
        )

        # ====================================================
        # SUCCESS RESPONSE
        # ====================================================
        return jsonify({

            "success": True,

            "message":
                "Message sent successfully",

            "data":
                new_message.to_dict()

        }), 201

    except Exception as error:

        logger.exception(
            "Failed to create "
            "contact message"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# GET ALL CONTACT MESSAGES
# ============================================================
@contact_bp.route(
    "/",
    methods=["GET"]
)
def get_contact_messages():

    try:

        messages = (
            ContactMessage
            .query
            .order_by(
                ContactMessage.created_at.desc()
            )
            .all()
        )

        return jsonify({

            "success": True,

            "count":
                len(messages),

            "data": [

                message.to_dict()

                for message in messages
            ]

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to fetch "
            "contact messages"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# GET SINGLE MESSAGE
# ============================================================
@contact_bp.route(
    "/<int:message_id>",
    methods=["GET"]
)
def get_single_message(
    message_id
):

    try:

        message = (
            ContactMessage.query.get(
                message_id
            )
        )

        if not message:

            return jsonify({

                "success": False,

                "error":
                    "Message not found"

            }), 404

        return jsonify({

            "success": True,

            "data":
                message.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to fetch "
            "single message"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# MARK AS READ
# ============================================================
@contact_bp.route(
    "/<int:message_id>/read",
    methods=["PUT"]
)
def mark_message_as_read(
    message_id
):

    try:

        message = (
            ContactMessage.query.get(
                message_id
            )
        )

        if not message:

            return jsonify({

                "success": False,

                "error":
                    "Message not found"

            }), 404

        message.is_read = True

        db.session.commit()

        return jsonify({

            "success": True,

            "message":
                "Message marked as read",

            "data":
                message.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to update "
            "message"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# DELETE MESSAGE
# ============================================================
@contact_bp.route(
    "/<int:message_id>",
    methods=["DELETE"]
)
def delete_message(
    message_id
):

    try:

        message = (
            ContactMessage.query.get(
                message_id
            )
        )

        if not message:

            return jsonify({

                "success": False,

                "error":
                    "Message not found"

            }), 404

        db.session.delete(
            message
        )

        db.session.commit()

        return jsonify({

            "success": True,

            "message":
                "Message deleted successfully"

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to delete "
            "message"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500