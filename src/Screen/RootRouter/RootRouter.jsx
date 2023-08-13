import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login, Home, Header, Portfolio, TransactionHistory, BrowseProduct } from '../'
import AuthenticatedComponents from "../../Components/AuthenticatedComponents";


const renderHome = (authenticated) => (
  <>
    <AuthenticatedComponents
      authenticated={authenticated}
    >
      <Home />
    </AuthenticatedComponents>
  </>
) 

const renderPortfolio = (authenticated) => (
  <>
    <AuthenticatedComponents
      authenticated={authenticated}
    >
      <Portfolio />
    </AuthenticatedComponents>
  </>
) 

const renderTransactionHistory = (authenticated) => (
  <>
    <AuthenticatedComponents
      authenticated={authenticated}
    >
      <TransactionHistory />
    </AuthenticatedComponents>
  </>
) 

const renderBrowseProduct = (authenticated) => (
  <>
    <AuthenticatedComponents
      authenticated={authenticated}
    >
      <BrowseProduct />
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
      {
        path: "portfolio",
        element: renderPortfolio(authenticated)
      },
      {
        path: "transaction-history",
        element: renderTransactionHistory(authenticated)
      },
      {
        path: "browse-product",
        element: renderBrowseProduct(authenticated)
      },
    ],
  },
])};

const RootRouter = (props) => (
  <RouterProvider router={router(props)} />
)

export default RootRouter