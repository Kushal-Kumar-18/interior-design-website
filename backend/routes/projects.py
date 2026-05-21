import logging
import re

from flask import (
    Blueprint,
    jsonify,
    request
)

from models import (
    db,
    Project
)


# ============================================================
# BLUEPRINT
# ============================================================
project_bp = Blueprint(
    "projects",
    __name__
)

logger = logging.getLogger(__name__)


# ============================================================
# SLUG GENERATOR
# ============================================================
def generate_slug(
    title
):

    slug = re.sub(
        r"[^a-zA-Z0-9\s-]",
        "",
        title
    )

    slug = slug.lower()

    slug = re.sub(
        r"\s+",
        "-",
        slug
    )

    return slug


# ============================================================
# CREATE PROJECT
# ============================================================
@project_bp.route(
    "/",
    methods=["POST"]
)
def create_project():

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

        title = (
            data.get("title", "")
            .strip()
        )

        category = (
            data.get("category", "")
            .strip()
        )

        description = (
            data.get(
                "description",
                ""
            ).strip()
        )

        cover_image = (
            data.get(
                "cover_image",
                ""
            ).strip()
        )

        # ====================================================
        # REQUIRED FIELDS
        # ====================================================
        if not title:

            return jsonify({

                "success": False,

                "error":
                    "Project title is required"

            }), 400

        if not category:

            return jsonify({

                "success": False,

                "error":
                    "Category is required"

            }), 400

        if not description:

            return jsonify({

                "success": False,

                "error":
                    "Description is required"

            }), 400

        if not cover_image:

            return jsonify({

                "success": False,

                "error":
                    "Cover image is required"

            }), 400

        # ====================================================
        # GENERATE SLUG
        # ====================================================
        slug = generate_slug(
            title
        )

        existing_project = (
            Project.query.filter_by(
                slug=slug
            ).first()
        )

        if existing_project:

            slug = (
                f"{slug}-"
                f"{Project.query.count() + 1}"
            )

        # ====================================================
        # GALLERY IMAGES
        # ====================================================
        gallery_images = (
            ",".join(
                data.get(
                    "gallery_images",
                    []
                )
            )
        )

        # ====================================================
        # CREATE PROJECT
        # ====================================================
        new_project = Project(

            title=title,

            slug=slug,

            category=category,

            short_description=data.get(
                "short_description"
            ),

            description=description,

            cover_image=cover_image,

            gallery_images=gallery_images,

            location=data.get(
                "location"
            ),

            client_name=data.get(
                "client_name"
            ),

            completion_date=data.get(
                "completion_date"
            ),

            area_size=data.get(
                "area_size"
            ),

            budget=data.get(
                "budget"
            ),

            featured=data.get(
                "featured",
                False
            ),

            published=data.get(
                "published",
                True
            ),

            meta_title=data.get(
                "meta_title"
            ),

            meta_description=data.get(
                "meta_description"
            )
        )

        db.session.add(
            new_project
        )

        db.session.commit()

        logger.info(
            f"Project created: {title}"
        )

        return jsonify({

            "success": True,

            "message":
                "Project created successfully",

            "data":
                new_project.to_dict()

        }), 201

    except Exception as error:

        logger.exception(
            "Failed to create project"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# GET ALL PROJECTS
# ============================================================
@project_bp.route(
    "/",
    methods=["GET"]
)
def get_projects():

    try:

        featured = request.args.get(
            "featured"
        )

        category = request.args.get(
            "category"
        )

        query = Project.query

        # ====================================================
        # FILTER FEATURED
        # ====================================================
        if featured == "true":

            query = query.filter_by(
                featured=True
            )

        # ====================================================
        # FILTER CATEGORY
        # ====================================================
        if category:

            query = query.filter_by(
                category=category
            )

        # ====================================================
        # ORDER
        # ====================================================
        projects = (
            query
            .order_by(
                Project.created_at.desc()
            )
            .all()
        )

        return jsonify({

            "success": True,

            "count":
                len(projects),

            "data": [

                project.to_dict()

                for project in projects
            ]

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to fetch projects"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# GET SINGLE PROJECT
# ============================================================
@project_bp.route(
    "/<int:project_id>",
    methods=["GET"]
)
def get_single_project(
    project_id
):

    try:

        project = (
            Project.query.get(
                project_id
            )
        )

        if not project:

            return jsonify({

                "success": False,

                "error":
                    "Project not found"

            }), 404

        return jsonify({

            "success": True,

            "data":
                project.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to fetch project"
        )

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# UPDATE PROJECT
# ============================================================
@project_bp.route(
    "/<int:project_id>",
    methods=["PUT"]
)
def update_project(
    project_id
):

    try:

        project = (
            Project.query.get(
                project_id
            )
        )

        if not project:

            return jsonify({

                "success": False,

                "error":
                    "Project not found"

            }), 404

        data = request.get_json()

        # ====================================================
        # UPDATE FIELDS
        # ====================================================
        project.title = data.get(
            "title",
            project.title
        )

        project.category = data.get(
            "category",
            project.category
        )

        project.short_description = data.get(
            "short_description",
            project.short_description
        )

        project.description = data.get(
            "description",
            project.description
        )

        project.cover_image = data.get(
            "cover_image",
            project.cover_image
        )

        project.location = data.get(
            "location",
            project.location
        )

        project.client_name = data.get(
            "client_name",
            project.client_name
        )

        project.completion_date = data.get(
            "completion_date",
            project.completion_date
        )

        project.area_size = data.get(
            "area_size",
            project.area_size
        )

        project.budget = data.get(
            "budget",
            project.budget
        )

        project.featured = data.get(
            "featured",
            project.featured
        )

        project.published = data.get(
            "published",
            project.published
        )

        project.meta_title = data.get(
            "meta_title",
            project.meta_title
        )

        project.meta_description = data.get(
            "meta_description",
            project.meta_description
        )

        # ====================================================
        # GALLERY
        # ====================================================
        if "gallery_images" in data:

            project.gallery_images = (
                ",".join(
                    data.get(
                        "gallery_images",
                        []
                    )
                )
            )

        db.session.commit()

        logger.info(
            f"Project updated: "
            f"{project.title}"
        )

        return jsonify({

            "success": True,

            "message":
                "Project updated successfully",

            "data":
                project.to_dict()

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to update project"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500


# ============================================================
# DELETE PROJECT
# ============================================================
@project_bp.route(
    "/<int:project_id>",
    methods=["DELETE"]
)
def delete_project(
    project_id
):

    try:

        project = (
            Project.query.get(
                project_id
            )
        )

        if not project:

            return jsonify({

                "success": False,

                "error":
                    "Project not found"

            }), 404

        db.session.delete(
            project
        )

        db.session.commit()

        logger.info(
            f"Project deleted: "
            f"{project.title}"
        )

        return jsonify({

            "success": True,

            "message":
                "Project deleted successfully"

        }), 200

    except Exception as error:

        logger.exception(
            "Failed to delete project"
        )

        db.session.rollback()

        return jsonify({

            "success": False,

            "error":
                str(error)

        }), 500