import {
  createBrowserRouter,
} from "react-router-dom";
import { Login, Home } from '../'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },  {
    path: "/login",
    element: <Login />,
  }
]);

export default router;