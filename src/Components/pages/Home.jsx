const Home = () => {
  const users = [
    {
      name: "Rahim Uddin",
      address: "Mirpur, Dhaka",
      phone: "01336100836",
      todaySell: 1250,
      due: 750,
    },
    {
      name: "Karim Hossain",
      address: "Uttara, Dhaka",
      phone: "01711223344",
      todaySell: 850,
      due: 300,
    },
    {
      name: "Shahin Alam",
      address: "Mohammadpur, Dhaka",
      phone: "01999887766",
      todaySell: 1450,
      due: 1200,
    },
    // Add more users if needed
  ];

  return (
    <div className="max-w-7xl mx-auto">
        <div className=" bg-gradient-to-br from-blue-50 to-green-50 py-5  mt-14 mx-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {users.map((user, index) => (
          <div
            key={index}
            className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">{user.name}</h2>
            <div className="mt-4 space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">📍 ঠিকানা:</span> {user.address}
              </p>
              <p>
                <span className="font-semibold">💰 আজকের বিক্রি:</span> {user.todaySell} টাকা
              </p>
              <p>
                <span className="font-semibold">🧾 বাকি আছে:</span> {user.due} টাকা
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

export default Home;
