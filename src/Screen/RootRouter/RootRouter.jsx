import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login, Home, Header, Portfolio, TransactionHistory, BrowseProduct } from '../'
import AuthenticatedComponents from "../../Components/AuthenticatedComponents";


const renderHome = (props) => (
  <>
    <AuthenticatedComponents
      authenticated={props.authentication.authenticated}
    >
      <Home authentication={props.authentication} request={props.request}/>
    </AuthenticatedComponents>
  </>
) 

const renderPortfolio = (props) => (
  <>
    <AuthenticatedComponents
      authenticated={props.authentication.authenticated}
    >
      <Portfolio authentication={props.authentication} request={props.request}/>
    </AuthenticatedComponents>
  </>
) 

const renderTransactionHistory = (props) => (
  <>
    <AuthenticatedComponents
      authenticated={props.authentication.authenticated}
    >
      <TransactionHistory authentication={props.authentication} request={props.request}/>
    </AuthenticatedComponents>
  </>
) 

const renderBrowseProduct = (props) => (
  <>
    <AuthenticatedComponents
      authenticated={props.authentication.authenticated}
    >
      <BrowseProduct authentication={props.authentication} request={props.request}/>
    </AuthenticatedComponents>
  </>
) 

const router = (props) => {
  return createBrowserRouter([
  {
    path: "/",
    element: <Header authentication={props.authentication}/>,
    children: [
      {
        path: "login",
        element: <Login authentication={props.authentication} request={props.request}/>
      },
      {
        path: "home",
        element: renderHome(props)
      },
      {
        path: "portfolio",
        element: renderPortfolio(props)
      },
      {
        path: "transaction-history",
        element: renderTransactionHistory(props)
      },
      {
        path: "browse-product",
        element: renderBrowseProduct(props)
      },
    ],
  },
])};

const RootRouter = (props) => (
  <RouterProvider router={router(props)} />
)

export default RootRouter