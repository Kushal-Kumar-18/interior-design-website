from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


# ============================================================
# DATABASE
# ============================================================
db = SQLAlchemy()


# ============================================================
# PROJECT MODEL
# ============================================================
class Project(db.Model):

    __tablename__ = "projects"

    # ========================================================
    # PRIMARY KEY
    # ========================================================
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # ========================================================
    # BASIC INFO
    # ========================================================
    title = db.Column(
        db.String(255),
        nullable=False
    )

    slug = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )

    category = db.Column(
        db.String(120),
        nullable=False
    )

    short_description = db.Column(
        db.String(500)
    )

    description = db.Column(
        db.Text,
        nullable=False
    )

    # ========================================================
    # IMAGES
    # ========================================================
    cover_image = db.Column(
        db.String(500),
        nullable=False
    )

    gallery_images = db.Column(
        db.Text
    )

    # ========================================================
    # PROJECT DETAILS
    # ========================================================
    location = db.Column(
        db.String(255)
    )

    client_name = db.Column(
        db.String(255)
    )

    completion_date = db.Column(
        db.String(100)
    )

    area_size = db.Column(
        db.String(100)
    )

    budget = db.Column(
        db.String(100)
    )

    # ========================================================
    # STATUS
    # ========================================================
    featured = db.Column(
        db.Boolean,
        default=False
    )

    published = db.Column(
        db.Boolean,
        default=True
    )

    # ========================================================
    # SEO
    # ========================================================
    meta_title = db.Column(
        db.String(255)
    )

    meta_description = db.Column(
        db.String(500)
    )

    # ========================================================
    # TIMESTAMPS
    # ========================================================
    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # ========================================================
    # SERIALIZER
    # ========================================================
    def to_dict(self):

        return {

            "id":
                self.id,

            "title":
                self.title,

            "slug":
                self.slug,

            "category":
                self.category,

            "short_description":
                self.short_description,

            "description":
                self.description,

            "cover_image":
                self.cover_image,

            "gallery_images":
                self.gallery_images.split(",")
                if self.gallery_images
                else [],

            "location":
                self.location,

            "client_name":
                self.client_name,

            "completion_date":
                self.completion_date,

            "area_size":
                self.area_size,

            "budget":
                self.budget,

            "featured":
                self.featured,

            "published":
                self.published,

            "meta_title":
                self.meta_title,

            "meta_description":
                self.meta_description,

            "created_at":
                self.created_at.isoformat(),

            "updated_at":
                self.updated_at.isoformat(),
        }


# ============================================================
# SERVICE MODEL
# ============================================================
class Service(db.Model):

    __tablename__ = "services"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(255),
        nullable=False
    )

    slug = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )

    short_description = db.Column(
        db.String(500)
    )

    description = db.Column(
        db.Text,
        nullable=False
    )

    icon = db.Column(
        db.String(100)
    )

    cover_image = db.Column(
        db.String(500)
    )

    featured = db.Column(
        db.Boolean,
        default=False
    )

    active = db.Column(
        db.Boolean,
        default=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # ========================================================
    # SERIALIZER
    # ========================================================
    def to_dict(self):

        return {

            "id":
                self.id,

            "title":
                self.title,

            "slug":
                self.slug,

            "short_description":
                self.short_description,

            "description":
                self.description,

            "icon":
                self.icon,

            "cover_image":
                self.cover_image,

            "featured":
                self.featured,

            "active":
                self.active,

            "created_at":
                self.created_at.isoformat(),
        }


# ============================================================
# BOOKING MODEL
# ============================================================
class Booking(db.Model):

    __tablename__ = "bookings"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    full_name = db.Column(
        db.String(255),
        nullable=False
    )

    email = db.Column(
        db.String(255),
        nullable=False
    )

    phone = db.Column(
        db.String(50),
        nullable=False
    )

    project_type = db.Column(
        db.String(255)
    )

    budget = db.Column(
        db.String(100)
    )

    message = db.Column(
        db.Text
    )

    status = db.Column(
        db.String(50),
        default="Pending"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # ========================================================
    # SERIALIZER
    # ========================================================
    def to_dict(self):

        return {

            "id":
                self.id,

            "full_name":
                self.full_name,

            "email":
                self.email,

            "phone":
                self.phone,

            "project_type":
                self.project_type,

            "budget":
                self.budget,

            "message":
                self.message,

            "status":
                self.status,

            "created_at":
                self.created_at.isoformat(),
        }


# ============================================================
# CONTACT MESSAGE MODEL
# ============================================================
class ContactMessage(db.Model):

    __tablename__ = "contact_messages"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(255),
        nullable=False
    )

    email = db.Column(
        db.String(255),
        nullable=False
    )

    subject = db.Column(
        db.String(255)
    )

    message = db.Column(
        db.Text,
        nullable=False
    )

    is_read = db.Column(
        db.Boolean,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # ========================================================
    # SERIALIZER
    # ========================================================
    def to_dict(self):

        return {

            "id":
                self.id,

            "name":
                self.name,

            "email":
                self.email,

            "subject":
                self.subject,

            "message":
                self.message,

            "is_read":
                self.is_read,

            "created_at":
                self.created_at.isoformat(),
        }


# ============================================================
# TESTIMONIAL MODEL
# ============================================================
class Testimonial(db.Model):

    __tablename__ = "testimonials"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    client_name = db.Column(
        db.String(255),
        nullable=False
    )

    designation = db.Column(
        db.String(255)
    )

    review = db.Column(
        db.Text,
        nullable=False
    )

    rating = db.Column(
        db.Integer,
        default=5
    )

    profile_image = db.Column(
        db.String(500)
    )

    featured = db.Column(
        db.Boolean,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # ========================================================
    # SERIALIZER
    # ========================================================
    def to_dict(self):

        return {

            "id":
                self.id,

            "client_name":
                self.client_name,

            "designation":
                self.designation,

            "review":
                self.review,

            "rating":
                self.rating,

            "profile_image":
                self.profile_image,

            "featured":
                self.featured,

            "created_at":
                self.created_at.isoformat(),
        }


# ============================================================
# ADMIN USER MODEL
# ============================================================
class AdminUser(db.Model):

    __tablename__ = "admin_users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    full_name = db.Column(
        db.String(255),
        nullable=False
    )

    email = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(500),
        nullable=False
    )

    role = db.Column(
        db.String(50),
        default="admin"
    )

    active = db.Column(
        db.Boolean,
        default=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # ========================================================
    # SERIALIZER
    # ========================================================
    def to_dict(self):

        return {

            "id":
                self.id,

            "full_name":
                self.full_name,

            "email":
                self.email,

            "role":
                self.role,

            "active":
                self.active,

            "created_at":
                self.created_at.isoformat(),
        }
    
# ============================================================
# USER MODEL
# ============================================================
class User(db.Model):

    __tablename__ = "users"

    # ========================================================
    # PRIMARY KEY
    # ========================================================
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # ========================================================
    # BASIC INFO
    # ========================================================
    full_name = db.Column(
        db.String(255),
        nullable=False
    )

    email = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(500),
        nullable=False
    )

    profile_image = db.Column(
        db.String(500),

        default=(
            "https://ui-avatars.com/api/"
            "?background=111827"
            "&color=ffffff"
            "&name=User"
        )
    )

    phone = db.Column(
        db.String(50)
    )

    # ========================================================
    # STATUS
    # ========================================================
    active = db.Column(
        db.Boolean,
        default=True
    )

    verified = db.Column(
        db.Boolean,
        default=False
    )

    # ========================================================
    # TIMESTAMPS
    # ========================================================
    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # ========================================================
    # SERIALIZER
    # ========================================================
    def to_dict(self):

        return {

            "id":
                self.id,

            "full_name":
                self.full_name,

            "email":
                self.email,

            "profile_image":
                self.profile_image,

            "phone":
                self.phone,

            "active":
                self.active,

            "verified":
                self.verified,

            "created_at":
                self.created_at.isoformat(),

            "updated_at":
                self.updated_at.isoformat(),
        }

# ============================================================
# WEBSITE SETTINGS MODEL
# ============================================================
class WebsiteSetting(db.Model):

    __tablename__ = "website_settings"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    website_name = db.Column(
        db.String(255)
    )

    tagline = db.Column(
        db.String(500)
    )

    phone = db.Column(
        db.String(100)
    )

    email = db.Column(
        db.String(255)
    )

    address = db.Column(
        db.Text
    )

    instagram = db.Column(
        db.String(500)
    )

    facebook = db.Column(
        db.String(500)
    )

    linkedin = db.Column(
        db.String(500)
    )

    meta_title = db.Column(
        db.String(255)
    )

    meta_description = db.Column(
        db.String(500)
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # ========================================================
    # SERIALIZER
    # ========================================================
    def to_dict(self):

        return {

            "id":
                self.id,

            "website_name":
                self.website_name,

            "tagline":
                self.tagline,

            "phone":
                self.phone,

            "email":
                self.email,

            "address":
                self.address,

            "instagram":
                self.instagram,

            "facebook":
                self.facebook,

            "linkedin":
                self.linkedin,

            "meta_title":
                self.meta_title,

            "meta_description":
                self.meta_description,

            "updated_at":
                self.updated_at.isoformat(),
        }