import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Income.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/expense"
      );

      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/expense/${editingId}`,
          formData
        );

        toast.success("Expense updated successfully!");

        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/expense",
          formData
        );

        toast.success("Expense added successfully!");
      }

      setFormData({
        amount: "",
        category: "",
        description: "",
      });

      fetchExpense();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);

    setFormData({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
    });
  };

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Expense?",
    text: "You won't be able to recover this record.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(
      `http://localhost:5000/expense/${id}`
    );

    fetchIncome();

    Swal.fire({
      title: "Deleted!",
      text: "Expense record deleted successfully.",
      icon: "success",
      timer: 1800,
      showConfirmButton: false,
    });

  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Something went wrong.",
      icon: "error",
    });
  }
};

  const role = localStorage.getItem("role");

  return (
    <div className="page-layout">
      <Sidebar />

      <div className="page-content">
        <h1>Expense Management</h1>

        <form
          className="income-form"
          onSubmit={handleSubmit}
        >
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />

          <button type="submit">
            {editingId ? "Update Expense" : "Add Expense"}
          </button>
        </form>

        <input
          type="text"
          className="search-box"
          placeholder="Search by category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses
                .filter((expense) =>
                  expense.category
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((expense, index) => (
                  <tr key={expense.id}>
                    <td >{index + 1}</td>
                    <td>₦{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>{expense.description}</td>

                    <td className="action-buttons">
                      {
                        role === "admin" && (
                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(expense)
                            }
                          >
                            Edit
                          </button>
                        )
                      }

                      {
                        role === "admin" && (
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(expense.id)
                            }
                          >
                            Delete
                          </button>
                        )
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Expense;