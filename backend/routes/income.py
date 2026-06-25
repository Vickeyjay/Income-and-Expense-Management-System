from flask import Blueprint, request

from database.db import db
from models.income import Income

income_bp = Blueprint(
    "income",
    __name__
)


# CREATE INCOME
@income_bp.route("/income", methods=["POST"])
def add_income():

    data = request.get_json()

    income = Income(
        amount=data["amount"],
        category=data["category"],
        description=data.get("description")
    )

    db.session.add(income)
    db.session.commit()

    return {
        "message": "Income added successfully"
    }, 201


# READ ALL INCOME
@income_bp.route("/income", methods=["GET"])
def get_income():

    incomes = Income.query.all()

    return [
        income.to_dict()
        for income in incomes
    ]


# UPDATE INCOME
@income_bp.route("/income/<int:id>", methods=["PUT"])
def update_income(id):

    income = Income.query.get_or_404(id)

    data = request.get_json()

    income.amount = data["amount"]
    income.category = data["category"]
    income.description = data.get("description")

    db.session.commit()

    return {
        "message": "Income updated successfully"
    }


# DELETE INCOME
@income_bp.route("/income/<int:id>", methods=["DELETE"])
def delete_income(id):

    income = Income.query.get_or_404(id)

    db.session.delete(income)
    db.session.commit()

    return {
        "message": "Income deleted successfully"
    }