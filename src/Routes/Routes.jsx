import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Components/pages/Home";
import TodaysCall from "../Components/pages/TodaysCall";
import Attendance from "../Components/pages/Attendance";
import UpdateIzza from "../Components/pages/UpdateIzza";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        index: true, // 👈 Default route ("/") will render Home
        element:<Home></Home>
      },
      {
        path:"todayscall",
        element:<TodaysCall></TodaysCall>
      },
      {
        path:"attendance",
        element: <Attendance></Attendance>
      },
      {
        path:"update",
        element: <UpdateIzza></UpdateIzza>
      }
    ],
  },
]);

export default router;
