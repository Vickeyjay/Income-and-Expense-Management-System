from flask import Blueprint, request

from models.user import User
from database.db import db

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")
    role = data.get("role", "staff")

    existing_user = User.query.filter_by(
        username=username
    ).first()

    if existing_user:
        return {
            "message": "Username already exists"
        }, 400

    hashed_password = generate_password_hash(password)

    user = User(
        username=username,
        password=hashed_password,
        role=role
    )

    db.session.add(user)
    db.session.commit()

    return {
        "message": "User created successfully"
    }, 201


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(
        username=username
    ).first()

    if not user:
        return {
            "message": "Invalid credentials"
        }, 401

    if not check_password_hash(
        user.password,
        password
    ):
        return {
            "message": "Invalid credentials"
        }, 401

    return {
        "message": "Login successful",
        "role": user.role
    }