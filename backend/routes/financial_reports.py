from flask import Blueprint, request
from datetime import datetime, timedelta

from models.income import Income
from models.expense import Expense

financial_reports_bp = Blueprint(
    "financial_reports",
    __name__
)


@financial_reports_bp.route("/report")
def generate_report():

    period = request.args.get("period")

    today = datetime.now()

    if period == "day":
        start_date = today.replace(
            hour=0,
            minute=0,
            second=0,
            microsecond=0
        )

    elif period == "week":
        start_date = today - timedelta(days=7)

    elif period == "month":
        start_date = today - timedelta(days=30)

    elif period == "year":
        start_date = today - timedelta(days=365)

    else:
        return {
            "message": "Invalid period"
        }, 400

    income = Income.query.filter(
        Income.created_at >= start_date
    ).all()

    expense = Expense.query.filter(
        Expense.created_at >= start_date
    ).all()

    return {
        "income": [
            item.to_dict()
            for item in income
        ],
        "expense": [
            item.to_dict()
            for item in expense
        ]
    }