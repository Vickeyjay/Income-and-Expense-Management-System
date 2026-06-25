from flask import Blueprint, request

from database.db import db
from models.expense import Expense

expense_bp = Blueprint(
    "expense",
    __name__
)


# CREATE
@expense_bp.route("/expense", methods=["POST"])
def add_expense():

    data = request.get_json()

    expense = Expense(
        amount=data["amount"],
        category=data["category"],
        description=data.get("description")
    )

    db.session.add(expense)
    db.session.commit()

    return {
        "message": "Expense added successfully"
    }, 201


# READ
@expense_bp.route("/expense", methods=["GET"])
def get_expense():

    expenses = Expense.query.all()

    return [
        expense.to_dict()
        for expense in expenses
    ]


# UPDATE
@expense_bp.route("/expense/<int:id>", methods=["PUT"])
def update_expense(id):

    expense = Expense.query.get_or_404(id)

    data = request.get_json()

    expense.amount = data["amount"]
    expense.category = data["category"]
    expense.description = data.get("description")

    db.session.commit()

    return {
        "message": "Expense updated successfully"
    }


# DELETE
@expense_bp.route("/expense/<int:id>", methods=["DELETE"])
def delete_expense(id):

    expense = Expense.query.get_or_404(id)

    db.session.delete(expense)
    db.session.commit()

    return {
        "message": "Expense deleted successfully"
    }