import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

const staffList = [
  "কামাল ভাই", "সিদ্দিক ভাই", "আলাউদ্দিন মামা", "শফিক মামা", "রবিউল ভাই", "ফরিদ ভাই",
  "মেহেদি ভাই","পলাশ মামা", "রনি", "মনির মামা", "রুবেল ভাই", "রবিউল"
];

const Attendance = () => {
  const [month, setMonth] = useState(dayjs().month()); // 0-11
  const [year, setYear] = useState(dayjs().year());
  const [attendance, setAttendance] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({ date: "", staff: "" });

  const today = dayjs();
  const selectedMonth = dayjs().year(year).month(month);
  const daysInMonth = selectedMonth.daysInMonth();

  const dates = Array.from({ length: daysInMonth }, (_, i) =>
    selectedMonth.date(i + 1).format("YYYY-MM-DD")
  );

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/attendance", {
        params: { year, month: month + 1 },
      });
      setAttendance(res.data?.data || {});
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [month, year]);

  const openModal = (date, staff) => {
    const clickedDate = dayjs(date);
    if (clickedDate.isAfter(today, "day")) return; // restrict future dates
    setSelected({ date, staff });
    setShowModal(true);
  };

  const setAttendanceStatus = async (status) => {
    const { date, staff } = selected;

    setAttendance((prev) => {
      const updated = { ...prev };
      if (!updated[date]) updated[date] = {};
      updated[date][staff] = status;
      return updated;
    });

    try {
      await axios.patch("http://localhost:5000/attendance", {
        year,
        month: month + 1,
        date,
        staff,
        status,
      });
    } catch (err) {
      console.error("PATCH error", err);
    }

    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 bg-gradient-to-br from-blue-50 to-green-50 overflow-auto">
      <div className="flex items-center gap-4 mb-4">
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="border p-2 rounded"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {dayjs().month(i).format("MMMM")}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="border p-2 rounded"
        >
          {[2024, 2025, 2026].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border p-2 bg-white sticky left-0 z-10">Staff</th>
            {dates.map((date) => (
              <th key={date} className="border p-1">{dayjs(date).format("D")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff}>
              <td className="border p-2 bg-white sticky left-0 z-10 font-medium">{staff}</td>
              {dates.map((date) => {
                const status = attendance[date]?.[staff];
                const isFuture = dayjs(date).isAfter(today, "day");

                return (
                  <td
                    key={date}
                    className={`border h-8 w-8 text-center cursor-pointer ${
                      isFuture ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                    }`}
                    onClick={() => !isFuture && openModal(date, staff)}
                  >
                    {status === "present" ? (
                      <span className="text-green-600 font-bold">P</span>
                    ) : status === "absent" ? (
                      <span className="text-red-600 font-bold">A</span>
                    ) : (
                      ""
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-72 text-center">
            <h3 className="text-lg font-semibold mb-2">
              {selected.staff} - {dayjs(selected.date).format("D MMM YYYY")}
            </h3>
            <p className="mb-4 text-sm text-gray-600">Select attendance status:</p>
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setAttendanceStatus("present")}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                ✅ Present
              </button>
              <button
                onClick={() => setAttendanceStatus("absent")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                ❌ Absent
              </button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="text-sm text-gray-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
