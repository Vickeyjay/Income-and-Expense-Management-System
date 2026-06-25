from flask import Blueprint

from models.income import Income
from models.expense import Expense

reports_bp = Blueprint(
    "reports",
    __name__
)


@reports_bp.route("/recent-transactions", methods=["GET"])
def recent_transactions():

    recent_income = (
        Income.query
        .order_by(Income.created_at.desc())
        .limit(5)
        .all()
    )

    recent_expense = (
        Expense.query
        .order_by(Expense.created_at.desc())
        .limit(5)
        .all()
    )

    return {
        "income": [
            item.to_dict()
            for item in recent_income
        ],
        "expense": [
            item.to_dict()
            for item in recent_expense
        ]
    }