import logging

from flask import (

    Blueprint,

    jsonify,

    request
)

from werkzeug.security import (

    generate_password_hash,

    check_password_hash
)

from flask_jwt_extended import (

    create_access_token,

    jwt_required,

    get_jwt_identity
)

from models import (

    db,

    User,

    AdminUser
)


# ============================================================
# BLUEPRINT
# ============================================================
auth_bp = Blueprint(

    "auth",

    __name__
)

logger = logging.getLogger(__name__)


# ============================================================
# USER REGISTER
# ============================================================
@auth_bp.route(
    "/register",
    methods=["POST"]
)
def register():

    try:

        data = request.get_json()

        if not data:

            return jsonify({

                "success": False,

                "error":
                    "No data provided"

            }), 400


        # ====================================================
        # FIELDS
        # ====================================================
        full_name = (
            data.get("full_name", "")
            .strip()
        )

        email = (
            data.get("email", "")
            .strip()
            .lower()
        )

        password = (
            data.get("password", "")
        )


        # ====================================================
        # VALIDATION
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

        if not password:

            return jsonify({

                "success": False,

                "error":
                    "Password is required"

            }), 400

        if len(password) < 6:

            return jsonify({

                "success": False,

                "error":
                    "Password must be at least 6 characters"

            }), 400


        # ====================================================
        # CHECK EXISTING USER
        # ====================================================
        existing_user = (
            User.query.filter_by(
                email=email
            ).first()
        )

        if existing_user:

            return jsonify({

                "success": False,

                "error":
                    "Email already registered"

            }), 409


        # ====================================================
        # HASH PASSWORD
        # ====================================================
        hashed_password = (
            generate_password_hash(
                password
            )
        )


        # ====================================================
        # CREATE USER
        # ====================================================
        new_user = User(

            full_name=
                full_name,

            email=
                email,

            password_hash=
                hashed_password,
        )

        db.session.add(
            new_user
        )

        db.session.commit()


        # ====================================================
        # CREATE TOKEN
        # ====================================================
        token = create_access_token(

            identity={

                "id":
                    new_user.id,

                "email":
                    new_user.email,

                "role":
                    "user"
            }
        )


        logger.info(
            f"New user registered: {email}"
        )


        return jsonify({

            "success": True,

            "message":
                "Registration successful",

            "token":
                token,

            "user":
                new_user.to_dict()

        }), 201

    except Exception as error:

        logger.exception(
            "Registration failed"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# USER LOGIN
# ============================================================
@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():

    try:

        data = request.get_json()

        email = (
            data.get("email", "")
            .strip()
            .lower()
        )

        password = (
            data.get("password", "")
        )


        # ====================================================
        # FIND USER
        # ====================================================
        user = (
            User.query.filter_by(
                email=email
            ).first()
        )

        if not user:

            return jsonify({

                "success": False,

                "error":
                    "Invalid email or password"

            }), 401


        # ====================================================
        # CHECK PASSWORD
        # ====================================================
        if not check_password_hash(

            user.password_hash,

            password
        ):

            return jsonify({

                "success": False,

                "error":
                    "Invalid email or password"

            }), 401


        # ====================================================
        # TOKEN
        # ====================================================
        token = create_access_token(

            identity={

                "id":
                    user.id,

                "email":
                    user.email,

                "role":
                    "user"
            }
        )


        logger.info(
            f"User logged in: {email}"
        )


        return jsonify({

            "success": True,

            "message":
                "Login successful",

            "token":
                token,

            "user":
                user.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Login failed"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# ADMIN LOGIN
# ============================================================
@auth_bp.route(
    "/admin/login",
    methods=["POST"]
)
def admin_login():

    try:

        data = request.get_json()

        email = (
            data.get("email", "")
            .strip()
            .lower()
        )

        password = (
            data.get("password", "")
        )


        # ====================================================
        # FIND ADMIN
        # ====================================================
        admin = (
            AdminUser.query.filter_by(
                email=email
            ).first()
        )

        if not admin:

            return jsonify({

                "success": False,

                "error":
                    "Invalid admin credentials"

            }), 401


        # ====================================================
        # CHECK PASSWORD
        # ====================================================
        if not check_password_hash(

            admin.password_hash,

            password
        ):

            return jsonify({

                "success": False,

                "error":
                    "Invalid admin credentials"

            }), 401


        # ====================================================
        # TOKEN
        # ====================================================
        token = create_access_token(

            identity={

                "id":
                    admin.id,

                "email":
                    admin.email,

                "role":
                    "admin"
            }
        )


        logger.info(
            f"Admin logged in: {email}"
        )


        return jsonify({

            "success": True,

            "message":
                "Admin login successful",

            "token":
                token,

            "admin":
                admin.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Admin login failed"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# PROFILE
# ============================================================
@auth_bp.route(
    "/profile",
    methods=["GET"]
)
@jwt_required()
def profile():

    try:

        # ====================================================
        # CURRENT JWT USER
        # ====================================================
        current_user = get_jwt_identity()

        role = current_user.get(
            "role"
        )

        user_id = current_user.get(
            "id"
        )

        # ====================================================
        # ADMIN PROFILE
        # ====================================================
        if role == "admin":

            admin = (
                AdminUser.query.get(
                    user_id
                )
            )

            if not admin:

                return jsonify({

                    "success": False,

                    "error":
                        "Admin not found"

                }), 404

            return jsonify({

                "success": True,

                "role":
                    "admin",

                "data":
                    admin.to_dict()

            }), 200

        # ====================================================
        # USER PROFILE
        # ====================================================
        user = (
            User.query.get(
                user_id
            )
        )

        if not user:

            return jsonify({

                "success": False,

                "error":
                    "User not found"

            }), 404

        return jsonify({

            "success": True,

            "role":
                "user",

            "data":
                user.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Profile fetch failed"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500