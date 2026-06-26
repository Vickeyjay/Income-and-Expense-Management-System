import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Reports.css";
import { toast } from "react-toastify";

function Reports() {
  const [period, setPeriod] = useState("month");

  const [reportData, setReportData] =
    useState({
      income: [],
      expense: [],
    });

  const fetchReport = async (
    selectedPeriod
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/report?period=${selectedPeriod}`
      );

      setPeriod(selectedPeriod);
      setReportData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const role = localStorage.getItem("role");

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="page-content">
        <h1>Financial Reports</h1>

        <div className="filter-buttons">
          <button
            onClick={() =>
              fetchReport("day")
            }
          >
            Day
          </button>

          <button
            onClick={() =>
              fetchReport("week")
            }
          >
            Week
          </button>

          <button
            onClick={() =>
              fetchReport("month")
            }
          >
            Month
          </button>

          <button
            onClick={() =>
              fetchReport("year")
            }
          >
            Year
          </button>
        </div>

        <div className="report-card">
          <h2>
            Income Report (
            {period.toUpperCase()})
          </h2>
        <div className="report-table">
                    <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {reportData.income.map(
                (item) => (
                  <tr key={item.id}>
                    <td>
                      ₦{item.amount}
                    </td>
                    <td>
                      {item.category}
                    </td>
                    <td>
                      {item.description}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        </div>

        <div className="report-card">
          <h2>
            Expense Report (
            {period.toUpperCase()})
          </h2>
          <div className="report-table">
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                {reportData.expense.map(
                  (item) => (
                    <tr key={item.id}>
                      <td>
                        ₦{item.amount}
                      </td>
                      <td>
                        {item.category}
                      </td>
                      <td>
                        {item.description}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            
          </div>
        </div>
            {
            role === "admin" && (
                <div className="export-buttons">
                <button
                    onClick={() =>
                    window.open(
                        "http://localhost:5000/export/pdf",
                        "_blank"
                    )
                    }
                >
                    Export PDF
                </button>

                <button
                    onClick={() =>
                    window.open(
                        "http://localhost:5000/export/excel",
                        "_blank"
                    )
                    }
                >
                    Export Excel
                </button>
                </div>
            )
            }
      </div>
    </div>
  );
}

export default Reports;