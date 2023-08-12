import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login, Home } from '../'
import AuthenticatedComponents from "../../Components/AuthenticatedComponents";
import Header from "../Header/Header";

// const router = ({ authenticated }) => createBrowserRouter([
//   {
//     path: "/",
//     element:
//       <AuthenticatedComponents authenticated={authenticated}>
//         <Home/>
//       </AuthenticatedComponents>,
//   },  {
//     path: "/login",
//     element:
//       <AuthenticatedComponents authenticated={authenticated}>
//         <Login/>
//       </AuthenticatedComponents>,
//   }
// ]);

const renderHome = (authenticated) => (
  <>
    <AuthenticatedComponents
      authenticated={authenticated}
    >
      <Home />
    </AuthenticatedComponents>
  </>
) 

const router = (props) => {
  const { authenticated } = props.authentication
  
  return createBrowserRouter([
  {
    path: "/",
    element: <Header authentication={props.authentication}/>,
    children: [
      {
        path: "login",
        element: <Login authentication={props.authentication}/>
      },
      {
        path: "home",
        element: renderHome(authenticated)
      },
    ],
  },
])};

const RootRouter = (props) => (
  <RouterProvider router={router(props)} />
)

export default RootRouter