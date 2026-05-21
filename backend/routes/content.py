from flask import Blueprint, jsonify
from sqlalchemy.exc import SQLAlchemyError

from models import (
    HeroSection,
    HeroStat,
    TrustFeature,
    ProcessStep,
    Service,
    Project,
    Testimonial,
    SiteSetting,
)

# ============================================================
# BLUEPRINT
# ============================================================
content_bp = Blueprint(
    "content",
    __name__,
    url_prefix="/api/content"
)


# ============================================================
# RESPONSE HELPERS
# ============================================================
def success_response(data=None, message="Success", status=200):

    return jsonify({
        "success": True,
        "message": message,
        "data": data,
    }), status


def error_response(message="Something went wrong", status=500):

    return jsonify({
        "success": False,
        "message": message,
    }), status


# ============================================================
# HERO SECTION
# ============================================================
@content_bp.route("/hero", methods=["GET"])
def get_hero():

    try:

        hero = (
            HeroSection.query
            .filter_by(is_active=True)
            .order_by(HeroSection.sort_order.asc())
            .first()
        )

        if not hero:

            return error_response(
                "Hero content not found",
                404
            )

        stats = (
            HeroStat.query
            .filter_by(is_active=True)
            .order_by(HeroStat.sort_order.asc())
            .all()
        )

        return success_response({
            "hero": hero.to_dict(),
            "stats": [
                stat.to_dict()
                for stat in stats
            ]
        })

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# TRUST FEATURES
# ============================================================
@content_bp.route("/trust", methods=["GET"])
def get_trust_features():

    try:

        features = (
            TrustFeature.query
            .filter_by(is_active=True)
            .order_by(
                TrustFeature.sort_order.asc()
            )
            .all()
        )

        return success_response([
            feature.to_dict()
            for feature in features
        ])

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# PROCESS STEPS
# ============================================================
@content_bp.route("/process", methods=["GET"])
def get_process_steps():

    try:

        steps = (
            ProcessStep.query
            .filter_by(is_active=True)
            .order_by(
                ProcessStep.step_number.asc()
            )
            .all()
        )

        return success_response([
            step.to_dict()
            for step in steps
        ])

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# SERVICES
# ============================================================
@content_bp.route("/services", methods=["GET"])
def get_services():

    try:

        services = (
            Service.query
            .filter_by(is_active=True)
            .order_by(Service.sort_order.asc())
            .all()
        )

        return success_response([
            service.to_dict()
            for service in services
        ])

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# FEATURED SERVICES
# ============================================================
@content_bp.route(
    "/services/featured",
    methods=["GET"]
)
def get_featured_services():

    try:

        services = (
            Service.query
            .filter_by(
                is_active=True,
                featured=True
            )
            .order_by(Service.sort_order.asc())
            .all()
        )

        return success_response([
            service.to_dict()
            for service in services
        ])

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# SINGLE SERVICE
# ============================================================
@content_bp.route(
    "/services/<string:slug>",
    methods=["GET"]
)
def get_single_service(slug):

    try:

        service = (
            Service.query
            .filter_by(
                slug=slug,
                is_active=True
            )
            .first()
        )

        if not service:

            return error_response(
                "Service not found",
                404
            )

        return success_response(
            service.to_dict()
        )

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# PROJECTS
# ============================================================
@content_bp.route("/projects", methods=["GET"])
def get_projects():

    try:

        projects = (
            Project.query
            .filter_by(is_active=True)
            .order_by(Project.sort_order.asc())
            .all()
        )

        return success_response([
            project.to_dict()
            for project in projects
        ])

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# FEATURED PROJECTS
# ============================================================
@content_bp.route(
    "/projects/featured",
    methods=["GET"]
)
def get_featured_projects():

    try:

        projects = (
            Project.query
            .filter_by(
                is_active=True,
                featured=True
            )
            .order_by(Project.sort_order.asc())
            .all()
        )

        return success_response([
            project.to_dict()
            for project in projects
        ])

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# SINGLE PROJECT
# ============================================================
@content_bp.route(
    "/projects/<string:slug>",
    methods=["GET"]
)
def get_single_project(slug):

    try:

        project = (
            Project.query
            .filter_by(
                slug=slug,
                is_active=True
            )
            .first()
        )

        if not project:

            return error_response(
                "Project not found",
                404
            )

        return success_response(
            project.to_dict()
        )

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# TESTIMONIALS
# ============================================================
@content_bp.route(
    "/testimonials",
    methods=["GET"]
)
def get_testimonials():

    try:

        testimonials = (
            Testimonial.query
            .filter_by(
                approved=True,
                is_active=True
            )
            .order_by(
                Testimonial.sort_order.asc()
            )
            .all()
        )

        return success_response([
            testimonial.to_dict()
            for testimonial in testimonials
        ])

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# FEATURED TESTIMONIALS
# ============================================================
@content_bp.route(
    "/testimonials/featured",
    methods=["GET"]
)
def get_featured_testimonials():

    try:

        testimonials = (
            Testimonial.query
            .filter_by(
                approved=True,
                featured=True,
                is_active=True
            )
            .order_by(
                Testimonial.sort_order.asc()
            )
            .all()
        )

        return success_response([
            testimonial.to_dict()
            for testimonial in testimonials
        ])

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# SITE SETTINGS
# ============================================================
@content_bp.route(
    "/settings",
    methods=["GET"]
)
def get_site_settings():

    try:

        settings = (
            SiteSetting.query
            .filter_by(is_active=True)
            .first()
        )

        if not settings:

            return error_response(
                "Settings not found",
                404
            )

        return success_response(
            settings.to_dict()
        )

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )


# ============================================================
# HOME PAGE PAYLOAD
# ============================================================
@content_bp.route(
    "/home",
    methods=["GET"]
)
def get_home_content():

    """
    Single optimized payload
    for homepage rendering
    """

    try:

        hero = (
            HeroSection.query
            .filter_by(is_active=True)
            .first()
        )

        hero_stats = (
            HeroStat.query
            .filter_by(is_active=True)
            .order_by(HeroStat.sort_order.asc())
            .all()
        )

        trust = (
            TrustFeature.query
            .filter_by(is_active=True)
            .order_by(
                TrustFeature.sort_order.asc()
            )
            .all()
        )

        process = (
            ProcessStep.query
            .filter_by(is_active=True)
            .order_by(
                ProcessStep.step_number.asc()
            )
            .all()
        )

        services = (
            Service.query
            .filter_by(
                is_active=True,
                featured=True
            )
            .order_by(Service.sort_order.asc())
            .limit(3)
            .all()
        )

        projects = (
            Project.query
            .filter_by(
                is_active=True,
                featured=True
            )
            .order_by(Project.sort_order.asc())
            .limit(6)
            .all()
        )

        testimonials = (
            Testimonial.query
            .filter_by(
                approved=True,
                featured=True,
                is_active=True
            )
            .limit(6)
            .all()
        )

        settings = (
            SiteSetting.query
            .filter_by(is_active=True)
            .first()
        )

        return success_response({

            "hero":
                hero.to_dict()
                if hero else None,

            "hero_stats": [
                item.to_dict()
                for item in hero_stats
            ],

            "trust_features": [
                item.to_dict()
                for item in trust
            ],

            "process_steps": [
                item.to_dict()
                for item in process
            ],

            "services": [
                item.to_dict()
                for item in services
            ],

            "projects": [
                item.to_dict()
                for item in projects
            ],

            "testimonials": [
                item.to_dict()
                for item in testimonials
            ],

            "settings":
                settings.to_dict()
                if settings else None,
        })

    except SQLAlchemyError as e:

        return error_response(
            f"Database error: {str(e)}"
        )