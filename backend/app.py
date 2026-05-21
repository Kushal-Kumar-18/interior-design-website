import os
import logging

from flask import Flask, jsonify
from flask_cors import CORS
from flask_mail import Mail
from flask_jwt_extended import JWTManager

from models import db
from config import get_config


# ============================================================
# EXTENSIONS
# ============================================================
mail = Mail()

jwt = JWTManager()


# ============================================================
# CREATE APPLICATION
# ============================================================
def create_app():

    app = Flask(__name__)

    # ========================================================
    # LOAD CONFIGURATION
    # ========================================================
    app.config.from_object(
        get_config()
    )

    # ========================================================
    # JWT CONFIG
    # ========================================================
    app.config["JWT_SECRET_KEY"] = (

        os.environ.get(

            "JWT_SECRET_KEY",

            "super-secret-key"
        )
    )

    app.url_map.strict_slashes = False

    # ========================================================
    # LOGGING
    # ========================================================
    logging.basicConfig(

        level=logging.INFO,

        format=(

            "%(asctime)s "

            "[%(levelname)s] "

            "%(message)s"
        )
    )

    logger = logging.getLogger(
        __name__
    )

    logger.info(
        "Starting InteriorX Backend..."
    )

    # ========================================================
    # CORS
    # ========================================================
    frontend_url = os.environ.get(

        "FRONTEND_URL",

        "http://localhost:3000"
    )

    allowed_origins = [

        frontend_url,

        "http://localhost:3000",

        "http://127.0.0.1:3000",
    ]

    CORS(

        app,

        origins=allowed_origins,

        supports_credentials=True,

        methods=[

            "GET",

            "POST",

            "PUT",

            "PATCH",

            "DELETE",

            "OPTIONS"
        ],

        allow_headers=[

            "Content-Type",

            "Authorization",

            "X-Admin-Key"
        ],
    )

    logger.info(
        "CORS initialized"
    )

    # ========================================================
    # DATABASE
    # ========================================================
    db.init_app(app)

    logger.info(
        "Database initialized"
    )

    # ========================================================
    # JWT
    # ========================================================
    jwt.init_app(app)

    logger.info(
        "JWT initialized"
    )

    # ========================================================
    # MAIL
    # ========================================================
    mail.init_app(app)

    logger.info(
        "Mail service initialized"
    )

    # ========================================================
    # CREATE DATABASE TABLES
    # ========================================================
    with app.app_context():

        db.create_all()

        logger.info(
            "Database tables created"
        )

    # ========================================================
    # RATE LIMITER
    # ========================================================
    try:

        from flask_limiter import (
            Limiter
        )

        from flask_limiter.util import (
            get_remote_address
        )

        limiter = Limiter(

            key_func=
                get_remote_address,

            app=app,

            default_limits=[

                "300 per day",

                "60 per hour"
            ],

            storage_uri=
                "memory://",
        )

        logger.info(
            "Rate limiter initialized"
        )

    except ImportError:

        logger.warning(

            "Flask-Limiter "
            "not installed"
        )

    # ========================================================
    # REGISTER BLUEPRINTS
    # ========================================================

    # --------------------------------------------------------
    # AUTH
    # --------------------------------------------------------
    from routes.auth import (
        auth_bp
    )

    app.register_blueprint(

        auth_bp,

        url_prefix=
            "/api/auth"
    )

    logger.info(
        "Auth routes registered"
    )

    # --------------------------------------------------------
    # CONTACT
    # --------------------------------------------------------
    from routes.contact import (
        contact_bp
    )

    app.register_blueprint(

        contact_bp,

        url_prefix=
            "/api/contact"
    )

    logger.info(
        "Contact routes registered"
    )

    # --------------------------------------------------------
    # BOOKINGS
    # --------------------------------------------------------
    from routes.bookings import (
        booking_bp
    )

    app.register_blueprint(

        booking_bp,

        url_prefix=
            "/api/bookings"
    )

    logger.info(
        "Booking routes registered"
    )

    # --------------------------------------------------------
    # PROJECTS
    # --------------------------------------------------------
    from routes.projects import (
        project_bp
    )

    app.register_blueprint(

        project_bp,

        url_prefix=
            "/api/projects"
    )

    logger.info(
        "Project routes registered"
    )

    # --------------------------------------------------------
    # SERVICES
    # --------------------------------------------------------
    from routes.services import (
        service_bp
    )

    app.register_blueprint(

        service_bp,

        url_prefix=
            "/api/services"
    )

    logger.info(
        "Service routes registered"
    )

    # --------------------------------------------------------
    # TESTIMONIALS
    # --------------------------------------------------------
    from routes.testimonials import (
        testimonial_bp
    )

    app.register_blueprint(

        testimonial_bp,

        url_prefix=
            "/api/testimonials"
    )

    logger.info(
        "Testimonial routes registered"
    )

    # --------------------------------------------------------
    # SETTINGS
    # --------------------------------------------------------
    from routes.settings import (
        settings_bp
    )

    app.register_blueprint(

        settings_bp,

        url_prefix=
            "/api/settings"
    )

    logger.info(
        "Settings routes registered"
    )

    # ========================================================
    # ERROR HANDLERS
    # ========================================================

    # --------------------------------------------------------
    # 404
    # --------------------------------------------------------
    @app.errorhandler(404)
    def not_found(error):

        return jsonify({

            "success": False,

            "error":
                "Resource not found"

        }), 404

    # --------------------------------------------------------
    # 405
    # --------------------------------------------------------
    @app.errorhandler(405)
    def method_not_allowed(error):

        return jsonify({

            "success": False,

            "error":
                "Method not allowed"

        }), 405

    # --------------------------------------------------------
    # 429
    # --------------------------------------------------------
    @app.errorhandler(429)
    def too_many_requests(error):

        return jsonify({

            "success": False,

            "error": (
                "Too many requests. "
                "Please try again later."
            )

        }), 429

    # --------------------------------------------------------
    # 500
    # --------------------------------------------------------
    @app.errorhandler(500)
    def internal_server_error(error):

        logger.exception(
            "Internal server error"
        )

        return jsonify({

            "success": False,

            "error":
                "Internal server error"

        }), 500

    # ========================================================
    # ROOT ROUTE
    # ========================================================
    @app.route("/")
    def root():

        return jsonify({

            "success": True,

            "message":
                "InteriorX API is running",

            "version":
                "4.0.0",

            "environment":
                app.config.get(
                    "ENV",
                    "production"
                )

        })

    # ========================================================
    # API HEALTH
    # ========================================================
    @app.route("/api/health")
    def api_health():

        return jsonify({

            "success": True,

            "status":
                "healthy",

            "database":
                "connected"

        })

    # ========================================================
    # ADMIN HEALTH
    # ========================================================
    @app.route("/api/admin/health")
    def admin_health():

        return jsonify({

            "success": True,

            "admin":
                "available"

        })

    logger.info(
        "Application initialized successfully"
    )

    return app


# ============================================================
# ENTRY POINT
# ============================================================
if __name__ == "__main__":

    app = create_app()

    app.run(

        host="0.0.0.0",

        port=int(

            os.environ.get(
                "PORT",
                5000
            )
        ),

        debug=
            app.config["DEBUG"]
    )