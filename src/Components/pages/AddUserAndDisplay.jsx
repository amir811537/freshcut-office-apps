import { useEffect, useState } from "react";
import axios from "axios";

const AddUserAndDisplay = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    quantity: "",
    rate: "",
    todayDeposit: "",
    previousDue: 0,
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/izza");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    const quantity = parseInt(formData.quantity);
    const rate = parseInt(formData.rate);
    const deposit = parseInt(formData.todayDeposit);
    const previousDue = parseInt(formData.previousDue);
    const todaySell = quantity * rate;
    const due = previousDue + (todaySell - deposit);

    const dataToSend = {
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      date: today,
      quantity,
      rate,
      todaySell,
      todayDeposit: deposit,
      due,
    };

    try {
      await axios.post("http://localhost:5000/izza", dataToSend);
      setFormData({
        name: "",
        address: "",
        phone: "",
        quantity: "",
        rate: "",
        todayDeposit: "",
        previousDue: 0,
      });
      fetchUsers();
    } catch (error) {
      console.error("Insert failed:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10 mx-2">
        <h2 className="text-2xl font-bold mb-4">📝 নতুন এন্ট্রি যুক্ত করুন</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="নাম"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="address"
            placeholder="ঠিকানা"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="phone"
            placeholder="মোবাইল নম্বর"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="quantity"
            type="number"
            placeholder="পিস সংখ্যা (Qty)"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="rate"
            type="number"
            placeholder="প্রতি পিস দাম"
            value={formData.rate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="todayDeposit"
            type="number"
            placeholder="আজকের জমা"
            value={formData.todayDeposit}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="previousDue"
            type="number"
            placeholder="আগের ইজা"
            value={formData.previousDue}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="col-span-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-bold"
          >
            ✅ সংরক্ষণ করুন
          </button>
        </form>
      </div>

      {/* Display users */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-5 mx-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {users.map((user, index) => (
            <div
              key={index}
              className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {user.name}
              </h2>
              <div className="mt-4 space-y-3 text-gray-700">
                <p>
                  <span className="font-semibold">📍 তারিখ:</span> {user.date}
                </p>
                <p>
                  <span className="font-semibold">📍 ঠিকানা:</span> {user.address}
                </p>
                <p className="text-green-500">
                  <span className="font-semibold">💰 আজকের বিক্রি:</span> <br />
                  বয়লার {user.quantity} পিস × {user.rate} = {user.todaySell} টাকা
                </p>
                <p className="text-blue-500">
                  <span className="font-semibold">💳 আজকের জমা:</span> {user.todayDeposit} টাকা
                </p>
                <p className="text-red-600">
                  <span className="font-semibold">🧾 ইজা আছে:</span> {user.due} টাকা
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <a
                  href={`tel:${user.phone}`}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                  📞 কল করুন
                </a>
                <span className="text-gray-800 font-semibold">{user.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddUserAndDisplay;
