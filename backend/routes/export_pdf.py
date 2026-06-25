from flask import Blueprint, send_file
from models.income import Income
from models.expense import Expense

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    PageBreak
)

from reportlab.lib.styles import getSampleStyleSheet

pdf_bp = Blueprint(
    "pdf",
    __name__
)


@pdf_bp.route("/export/pdf")
def export_pdf():

    filename = "financial_report.pdf"

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "Income & Expense Management System",
            styles["Title"]
        )
    )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "Income Records",
            styles["Heading2"]
        )
    )

    content.append(
        Spacer(1, 10)
    )

    incomes = Income.query.all()

    if incomes:
        for item in incomes:
            content.append(
                Paragraph(
                    f"""
                    ID: {item.id}<br/>
                    Amount: NGN {item.amount}<br/>
                    Category: {item.category}<br/>
                    Description: {item.description}<br/>
                    Date: {item.created_at}
                    """,
                    styles["BodyText"]
                )
            )

            content.append(
                Spacer(1, 10)
            )

    else:
        content.append(
            Paragraph(
                "No income records found.",
                styles["BodyText"]
            )
        )

    content.append(PageBreak())

    content.append(
        Paragraph(
            "Expense Records",
            styles["Heading2"]
        )
    )

    content.append(
        Spacer(1, 10)
    )

    expenses = Expense.query.all()

    if expenses:
        for item in expenses:
            content.append(
                Paragraph(
                    f"""
                    ID: {item.id}<br/>
                    Amount: NGN {item.amount}<br/>
                    Category: {item.category}<br/>
                    Description: {item.description}<br/>
                    Date: {item.created_at}
                    """,
                    styles["BodyText"]
                )
            )

            content.append(
                Spacer(1, 10)
            )

    else:
        content.append(
            Paragraph(
                "No expense records found.",
                styles["BodyText"]
            )
        )

    doc.build(content)

    return send_file(
        filename,
        as_attachment=True
    )