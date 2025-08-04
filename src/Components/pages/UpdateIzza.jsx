import { useEffect, useState } from "react";
import axios from "axios";

const UpdateIzza = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    date: "",
    address: "",
    phone: "",
    boilerQtypes: "",
    boilerQtykg: "",
    boilerRate: "",
    todaySell: 0,
    payment: 0,
    due: 0,
    originalDue: 0, // extra field to store DB due
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/izza");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // temp update form data
    const updatedForm = {
      ...formData,
      [name]: value,
    };

    const qty = name === "boilerQtykg" ? parseFloat(value) || 0 : parseFloat(updatedForm.boilerQtykg) || 0;
    const rate = name === "boilerRate" ? parseInt(value) || 0 : parseInt(updatedForm.boilerRate) || 0;
    const payment = name === "payment" ? parseInt(value) || 0 : parseInt(updatedForm.payment) || 0;

    const todaySell = Math.round(qty * rate);
    let newDue = formData.originalDue; // base is the DB's old due

    if (payment < todaySell) {
      const unpaid = todaySell - payment;
      newDue = formData.originalDue + unpaid;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      todaySell: todaySell,
      due: newDue,
    }));
  };

  const handleEdit = (user) => {
    setFormData({
      ...user,
      boilerQtypes: user.boilerQtypes || "",
      boilerQtykg: user.boilerQtykg || "",
      boilerRate: user.boilerRate || "",
      payment: user.payment || 0,
      todaySell: user.todaySell || 0,
      due: user.due || 0,
      originalDue: user.due || 0, // store original due for logic
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, originalDue, ...payload } = formData;
      await axios.patch(`http://localhost:5000/izza/${_id}`, payload);
      alert("Updated successfully!");
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">ইজা হালনাগাদ করুন</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-md space-y-2">
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p>📅 <strong>তারিখ:</strong> {user.date || "N/A"}</p>
            <p>📍 <strong>ঠিকানা:</strong> {user.address}</p>
            <p>💰 <strong>আজকের বিক্রি:</strong> {user.todaySell || 0} টাকা</p>
            <p>💳 <strong>আজকের জমা:</strong> {user.payment || 0} টাকা</p>
            <p>🧾 <strong>ইজা আছে:</strong> {user.due || 0} টাকা</p>
            <p>📞 <strong>ফোন:</strong> {user.phone}</p>
            <button
              onClick={() => handleEdit(user)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ✏️ Update
            </button>
          </div>
        ))}
      </div>

     {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">ইজা আপডেট করুন</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">নাম</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">তারিখ</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">ঠিকানা</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">ফোন নম্বর</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">বয়লার সংখ্যা</label>
            <input
              type="number"
              name="boilerQtypes"
              value={formData.boilerQtypes}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">কেজি</label>
            <input
              type="number"
              name="boilerQtykg"
              value={formData.boilerQtykg}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">রেট</label>
            <input
              type="number"
              name="boilerRate"
              value={formData.boilerRate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">আজকের বিক্রি</label>
          <input
            type="number"
            name="todaySell"
            value={formData.todaySell}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">আজকের জমা</label>
          <input
            type="number"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">ইজা আছে</label>
          <input
            type="number"
            name="due"
            value={formData.due}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            বাতিল
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default UpdateIzza;
