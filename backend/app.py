from flask import Flask
from flask_cors import CORS

from config import Config
from database.db import db

from routes.auth import auth_bp
from models.income import Income
from routes.income import income_bp
from models.expense import Expense
from routes.expense import expense_bp
from routes.dashboard import dashboard_bp
from routes.reports import reports_bp
from routes.financial_reports import financial_reports_bp
from routes.export import export_bp
from routes.export_pdf import pdf_bp

from models.user import User



app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)

CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(income_bp)
app.register_blueprint(expense_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(reports_bp)
app.register_blueprint(financial_reports_bp)
app.register_blueprint(export_bp)
app.register_blueprint(pdf_bp)

@app.route("/")
def home():
    return {
        "message": "IEMS backend running"
    }

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=5000)