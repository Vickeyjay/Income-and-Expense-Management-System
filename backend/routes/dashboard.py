from flask import Blueprint
from sqlalchemy import func

from models.income import Income
from models.expense import Expense

dashboard_bp = Blueprint(
    "dashboard",
    __name__
)


@dashboard_bp.route("/dashboard", methods=["GET"])
def dashboard():

    total_income = (
        Income.query.with_entities(
            func.sum(Income.amount)
        ).scalar()
        or 0
    )

    total_expense = (
        Expense.query.with_entities(
            func.sum(Expense.amount)
        ).scalar()
        or 0
    )

    balance = total_income - total_expense

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": balance
    }