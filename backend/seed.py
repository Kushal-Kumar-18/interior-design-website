from app import create_app

from models import (

    db,

    Project,

    Service,

    Testimonial,

    WebsiteSetting,

    AdminUser
)

from werkzeug.security import (
    generate_password_hash
)


# ============================================================
# CREATE APP
# ============================================================
app = create_app()


# ============================================================
# SEED DATABASE
# ============================================================
with app.app_context():

    # ========================================================
    # RESET DATABASE
    # ========================================================
    db.drop_all()

    db.create_all()

    print(
        "\nDatabase recreated successfully\n"
    )

    # ========================================================
    # WEBSITE SETTINGS
    # ========================================================
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

        meta_description=
            "Premium luxury interior design studio creating timeless elegant spaces."
    )

    db.session.add(settings)

    # ========================================================
    # ADMIN USER
    # ========================================================
    admin_user = AdminUser(

        full_name=
            "InteriorX Admin",

        email=
            "admin@interiorx.com",

        password_hash=
            generate_password_hash(
                "Admin@123"
            ),

        role=
            "super_admin"
    )

    db.session.add(admin_user)

    # ========================================================
    # PROJECTS
    # ========================================================
    projects = [

        Project(

            title=
                "Modern Luxury Villa",

            slug=
                "modern-luxury-villa",

            category=
                "Residential",

            short_description=
                "Premium luxury villa interior with elegant modern aesthetics.",

            description=
                "A complete luxury villa transformation with premium materials, ambient lighting, and sophisticated modern design.",

            cover_image=
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",

            gallery_images=
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85,"
                "https://images.unsplash.com/photo-1484154218962-a197022b5858",

            location=
                "Bangalore",

            client_name=
                "Rahul Sharma",

            completion_date=
                "2026",

            area_size=
                "4500 sq.ft",

            budget=
                "₹45 Lakhs",

            featured=True
        ),

        Project(

            title=
                "Minimal Office Space",

            slug=
                "minimal-office-space",

            category=
                "Commercial",

            short_description=
                "Elegant minimal workspace for modern startups.",

            description=
                "Designed a luxury office workspace focused on productivity, minimalism, and premium aesthetics.",

            cover_image=
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72",

            gallery_images=
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72,"
                "https://images.unsplash.com/photo-1497366412874-3415097a27e7",

            location=
                "Hyderabad",

            client_name=
                "TechNova",

            completion_date=
                "2025",

            area_size=
                "3000 sq.ft",

            budget=
                "₹28 Lakhs",

            featured=True
        ),

        Project(

            title=
                "Contemporary Apartment",

            slug=
                "contemporary-apartment",

            category=
                "Residential",

            short_description=
                "Sophisticated apartment interiors with timeless appeal.",

            description=
                "Luxury apartment interior designed with warm textures, premium furniture, and modern lighting.",

            cover_image=
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",

            gallery_images=
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",

            location=
                "Chennai",

            client_name=
                "Priya Mehta",

            completion_date=
                "2025",

            area_size=
                "2200 sq.ft",

            budget=
                "₹18 Lakhs",

            featured=False
        ),
    ]

    db.session.add_all(
        projects
    )

    # ========================================================
    # SERVICES
    # ========================================================
    services = [

        Service(

            title=
                "Luxury Residential Interiors",

            slug=
                "luxury-residential-interiors",

            short_description=
                "Premium residential interior solutions.",

            description=
                "Complete luxury residential interior design tailored for modern elegant living.",

            icon=
                "FiHome",

            cover_image=
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",

            featured=True
        ),

        Service(

            title=
                "Commercial Space Design",

            slug=
                "commercial-space-design",

            short_description=
                "Elegant office and workspace interiors.",

            description=
                "Modern commercial interiors built for productivity and luxury branding.",

            icon=
                "FiBriefcase",

            cover_image=
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72",

            featured=True
        ),

        Service(

            title=
                "Custom Furniture Design",

            slug=
                "custom-furniture-design",

            short_description=
                "Bespoke furniture crafted for luxury interiors.",

            description=
                "Premium furniture design customized for high-end interiors.",

            icon=
                "FiBox",

            cover_image=
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",

            featured=False
        ),
    ]

    db.session.add_all(
        services
    )

    # ========================================================
    # TESTIMONIALS
    # ========================================================
    testimonials = [

        Testimonial(

            client_name=
                "Aarav Sharma",

            designation=
                "Business Owner",

            review=
                "InteriorX transformed our villa into a luxurious masterpiece. Exceptional quality and professionalism.",

            rating=5,

            profile_image=
                "https://randomuser.me/api/portraits/men/32.jpg",

            featured=True
        ),

        Testimonial(

            client_name=
                "Priya Mehta",

            designation=
                "Entrepreneur",

            review=
                "The office design exceeded our expectations. Elegant, modern, and perfectly functional.",

            rating=5,

            profile_image=
                "https://randomuser.me/api/portraits/women/44.jpg",

            featured=True
        ),

        Testimonial(

            client_name=
                "Rahul Verma",

            designation=
                "Architect",

            review=
                "Outstanding design approach and premium execution quality throughout the project.",

            rating=5,

            profile_image=
                "https://randomuser.me/api/portraits/men/51.jpg",

            featured=False
        ),
    ]

    db.session.add_all(
        testimonials
    )

    # ========================================================
    # COMMIT
    # ========================================================
    db.session.commit()

    print(
        "Demo data seeded successfully\n"
    )

    print(
        "Admin Login Credentials:"
    )

    print(
        "Email: admin@interiorx.com"
    )

    print(
        "Password: Admin@123\n"
    )