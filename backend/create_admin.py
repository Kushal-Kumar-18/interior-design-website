from app import create_app

from models import (
    db,
    AdminUser
)

from werkzeug.security import (
    generate_password_hash
)

app = create_app()

with app.app_context():

    existing = (
        AdminUser.query.filter_by(
            email="admin@interiorx.com"
        ).first()
    )

    if existing:

        print("Admin already exists")

    else:

        admin = AdminUser(

            full_name="Super Admin",

            email="admin@interiorx.com",

            password_hash=
                generate_password_hash(
                    "admin123"
                ),
        )

        db.session.add(admin)

        db.session.commit()

        print(
            "Admin created successfully"
        )