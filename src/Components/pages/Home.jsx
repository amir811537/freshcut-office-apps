import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://officeappsserverdie-topaz.vercel.app/izza")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-5 mt-14 mx-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {users.map((user, index) => {
            const autoDate = user.date || dayjs().format("YYYY-MM-DD");

            const todaySell =
              user.boilerQtykg && user.boilerRate
                ? user.boilerQtykg * user.boilerRate
                : user.todaySell || 0;

            const todayDeposit = user.payment || 0;

            const due = user.due ?? todaySell - todayDeposit;

            return (
              <div
                key={index}
                className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                  {user.name}
                </h2>
                <div className="mt-4 space-y-3 text-gray-700">
                  <p>
                    <span className="font-semibold">📅 তারিখ:</span> {autoDate}
                  </p>
                  <p>
                    <span className="font-semibold">📍 ঠিকানা:</span> {user.address}
                  </p>
                  <p className="text-green-600">
                    <span className="font-semibold">💰 আজকের বিক্রি:</span>
                    <br />
                    বয়লার {user.boilerQtypes || "0" }পিছ ( {user.boilerQtykg || "?"} kg × {user.boilerRate || "?"} ) ={" "}
                    {todaySell} টাকা
                  </p>
                  <p className="text-blue-600">
                    <span className="font-semibold">💳 আজকের জমা:</span> {todayDeposit} টাকা
                  </p>
                  <p className="text-red-600">
                    <span className="font-semibold">🧾 ইজা আছে:</span> {due} টাকা
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
