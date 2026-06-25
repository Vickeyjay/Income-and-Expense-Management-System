from flask import Blueprint, send_file
from models.income import Income
from models.expense import Expense
from openpyxl import Workbook

export_bp = Blueprint("export", __name__)

@export_bp.route("/export/excel")
def export_excel():

    wb = Workbook()

    income_sheet = wb.active
    income_sheet.title = "Income"

    income_sheet.append([
        "ID",
        "Amount",
        "Category",
        "Description",
        "Date"
    ])

    for item in Income.query.all():
        income_sheet.append([
            item.id,
            item.amount,
            item.category,
            item.description,
            str(item.created_at)
        ])

    expense_sheet = wb.create_sheet(
        title="Expense"
    )

    expense_sheet.append([
        "ID",
        "Amount",
        "Category",
        "Description",
        "Date"
    ])

    for item in Expense.query.all():
        expense_sheet.append([
            item.id,
            item.amount,
            item.category,
            item.description,
            str(item.created_at)
        ])

    filename = "financial_report.xlsx"

    wb.save(filename)

    return send_file(
        filename,
        as_attachment=True
    )