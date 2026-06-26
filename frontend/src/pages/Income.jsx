import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Income.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Income() {
  const [incomes, setIncomes] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (income) => {
  setEditingId(income.id);

  setFormData({
    amount: income.amount,
    category: income.category,
    description: income.description,
  });
};

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/income"
      );

      setIncomes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
  await axios.put(
    `http://localhost:5000/income/${editingId}`,
    formData
  );

  toast.success("Income updated successfully!");

  setEditingId(null);
} else {
  await axios.post(
    "http://localhost:5000/income",
    formData
  );

  toast.success("Income added successfully!");
}

setFormData({
  amount: "",
  category: "",
  description: "",
});

fetchIncome();
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong!");
  }
};


const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Income?",
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
      `http://localhost:5000/income/${id}`
    );

    fetchIncome();

    Swal.fire({
      title: "Deleted!",
      text: "Income record deleted successfully.",
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
        <h1>Income Management</h1>

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
            {editingId ? "Update Income" : "Add Income"}
          </button>
        </form>

        <input
        type="text"
        className="search-box"
        placeholder="Search by category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
              {incomes
                .filter((income) =>
                    income.category
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((income, index) => (
                <tr key={income.id}>
                  <td>{index + 1}</td>
                  <td>₦{income.amount}</td>
                  <td>{income.category}</td>
                  <td>{income.description}</td>

                  <td className="action-buttons">
                    {
                      role === "admin" && (
                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(income)
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
                            handleDelete(income.id)
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

export default Income;