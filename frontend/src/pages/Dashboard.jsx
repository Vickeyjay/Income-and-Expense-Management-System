import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

function Dashboard() {

  const [recent, setRecent] = useState({
    income: [],
    expense: [],
  });
  const [data, setData] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
  });

  useEffect(() => {
    fetchDashboard();
    fetchRecent();
  }, []);
  

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/dashboard"
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecent = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/recent-transactions"
    );

    setRecent(response.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="page-content">

        <div className="hero-banner">

          <div>

              <h1>
                  Welcome back,
                  {
                    localStorage.getItem("username")
                      ? localStorage.getItem("username").charAt(0).toUpperCase() +
                        localStorage.getItem("username").slice(1)
                      : "User"
                  }
                  !
              </h1>

              <p>
                  Manage your income and expenses
                  smarter and faster.
              </p>

          </div>

          <div className="hero-date">

              {new Date().toLocaleDateString(
                  "en-GB",
                  {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  }
              )}

          </div>

      </div>
        <h1>Dashboard</h1>

        <div className="cards">
          <div className="card">
            <h3>Balance</h3>
            <h2>₦{data.balance}</h2>
          </div>

          <div className="card">
            <h3>Total Income</h3>
            <h2 className="income">₦{data.total_income}</h2>
          </div>

          <div className="card">
            <h3>Total Expense</h3>
            <h2 className="expense">₦{data.total_expense}</h2>
          </div>
        </div>

        <div className="recent-section">
          <div className="recent-card">
            <h2>Recent Income</h2>

            {recent.income.map((item) => (
              <div
                key={item.id}
                className="transaction-item"
              >
                <span>{item.category}</span>
                <strong>₦{item.amount}</strong>
              </div>
            ))}
          </div>

          <div className="recent-card">
            <h2>Recent Expenses</h2>

            {recent.expense.map((item) => (
              <div
                key={item.id}
                className="transaction-item"
              >
                <span>{item.category}</span>
                <strong>₦{item.amount}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;