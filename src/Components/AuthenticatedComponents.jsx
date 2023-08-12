import { Navigate } from 'react-router-dom';

const AuthenticatedComponents = (props) => {
  if (props.authenticated) {
    return props.children
  } else {
    <Navigate to='/login' />
  }
};

export default AuthenticatedComponents;
