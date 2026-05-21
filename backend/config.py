import os

from dotenv import load_dotenv


# ============================================================
# LOAD ENV VARIABLES
# ============================================================
load_dotenv()


# ============================================================
# BASE DIRECTORY
# ============================================================
BASE_DIR = os.path.abspath(
    os.path.dirname(__file__)
)


# ============================================================
# INSTANCE DIRECTORY
# ============================================================
INSTANCE_DIR = os.path.join(
    BASE_DIR,
    "instance"
)

# AUTO CREATE instance/
os.makedirs(
    INSTANCE_DIR,
    exist_ok=True
)


# ============================================================
# DATABASE PATH
# ============================================================
DATABASE_PATH = os.path.join(
    INSTANCE_DIR,
    "app.db"
)


# ============================================================
# BASE CONFIG
# ============================================================
class Config:

    # ========================================================
    # GENERAL
    # ========================================================
    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "interiorx-secret-key"
    )

    DEBUG = False

    TESTING = False

    ENV = "production"

    # ========================================================
    # DATABASE
    # ========================================================
    SQLALCHEMY_DATABASE_URI = os.getenv(

        "DATABASE_URL",

        f"sqlite:///{DATABASE_PATH}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ========================================================
    # MAIL
    # ========================================================
    MAIL_SERVER = os.getenv(
        "MAIL_SERVER",
        "smtp.gmail.com"
    )

    MAIL_PORT = int(
        os.getenv(
            "MAIL_PORT",
            587
        )
    )

    MAIL_USE_TLS = True

    MAIL_USE_SSL = False

    MAIL_USERNAME = os.getenv(
        "MAIL_USERNAME"
    )

    MAIL_PASSWORD = os.getenv(
        "MAIL_PASSWORD"
    )

    MAIL_DEFAULT_SENDER = os.getenv(
        "MAIL_DEFAULT_SENDER"
    )

    # ========================================================
    # UPLOADS
    # ========================================================
    UPLOAD_FOLDER = os.path.join(
        BASE_DIR,
        "uploads"
    )

    os.makedirs(
        UPLOAD_FOLDER,
        exist_ok=True
    )

    MAX_CONTENT_LENGTH = (
        16 * 1024 * 1024
    )

    ALLOWED_IMAGE_EXTENSIONS = {

        "png",
        "jpg",
        "jpeg",
        "webp"
    }

    # ========================================================
    # SECURITY
    # ========================================================
    SESSION_COOKIE_HTTPONLY = True

    REMEMBER_COOKIE_HTTPONLY = True

    SESSION_COOKIE_SAMESITE = "Lax"

    # ========================================================
    # JSON
    # ========================================================
    JSON_SORT_KEYS = False

    JSONIFY_PRETTYPRINT_REGULAR = True

    # ========================================================
    # ADMIN
    # ========================================================
    ADMIN_SECRET_KEY = os.getenv(
        "ADMIN_SECRET_KEY",
        "interiorx-admin-key"
    )


# ============================================================
# DEVELOPMENT CONFIG
# ============================================================
class DevelopmentConfig(
    Config
):

    DEBUG = True

    ENV = "development"


# ============================================================
# PRODUCTION CONFIG
# ============================================================
class ProductionConfig(
    Config
):

    DEBUG = False

    ENV = "production"


# ============================================================
# TESTING CONFIG
# ============================================================
class TestingConfig(
    Config
):

    TESTING = True

    DEBUG = True

    ENV = "testing"

    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///:memory:"
    )


# ============================================================
# CONFIG MAP
# ============================================================
config_by_name = {

    "development":
        DevelopmentConfig,

    "production":
        ProductionConfig,

    "testing":
        TestingConfig,
}


# ============================================================
# GET CONFIG
# ============================================================
def get_config():

    env = os.getenv(
        "FLASK_ENV",
        "development"
    )

    return config_by_name.get(
        env,
        DevelopmentConfig
    )