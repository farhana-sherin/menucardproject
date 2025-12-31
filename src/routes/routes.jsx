import {
  createBrowserRouter,

} from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import Home from "../pages/Home";
import QrCode from "../pages/QrCode";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/",
        element: <QrCode />,
      }
    ]
  },
]);