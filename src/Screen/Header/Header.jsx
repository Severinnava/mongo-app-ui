import { Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import AuthenticatedComponents from '../../Components/AuthenticatedComponents';
import styles from './Header.style';
import { css } from 'glamor';

const renderNavBarTitle = () => (
    <Navbar.Brand {...css(styles.navTitle)}>Mutual Fund</Navbar.Brand>
)

const handleLogout = (logout, navigate) => (e) => {
  e.preventDefault();
  navigate('/login')
}

const renderLogoutHeader = (logout, navigate) => {
  return (
    <div onClick={handleLogout(logout, navigate)}>
        <NavItem {...css(styles.navItem)}>Logout</NavItem>
    </div>
  )
}
const renderNavBarOptions = (props) => {
  const { authenticated } = props.authentication;
  return (
  <Nav className="me-auto">
    <AuthenticatedComponents
      authenticated={authenticated}
    >
      <LinkContainer to='/'>
        <NavItem {...css(styles.navItem)}>Portfolio</NavItem>
      </LinkContainer>
    </AuthenticatedComponents>
    <AuthenticatedComponents
      authenticated={authenticated}
    >
      <LinkContainer to='/'>
        <NavItem {...css(styles.navItem)}>Transaction History</NavItem>
      </LinkContainer>
    </AuthenticatedComponents>
    <AuthenticatedComponents
      authenticated={authenticated}
    >
      <LinkContainer to='/'>
        <NavItem {...css(styles.navItem)}>Browse Product</NavItem>
      </LinkContainer>
    </AuthenticatedComponents>
  </Nav>
)}

const Header = (props) => {
  const { authentication: { authenticated, logout } } = props
  const navigate = useNavigate()
  
  useEffect(() => {
    if (authenticated) {
      console.log('authenticated')
      navigate('/home')
      return
    } else {
      console.log('not')
      navigate('/login')
      return
    }
  }, [])

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary rounded">
        <Container>
          {renderNavBarTitle()}
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            {renderNavBarOptions(props, navigate)}
          </Navbar.Collapse>
          <Navbar.Collapse id="basic-navbar-nav-end" className='justify-content-end'>
            {authenticated && renderLogoutHeader(logout, navigate)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
    </>
  );
}

Header.propTypes = {
  authentication: PropTypes.object
}

export default Header;