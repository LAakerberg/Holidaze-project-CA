import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

export function NavLinks() {
  const getUserData = localStorage.getItem('userData');
  const userData = getUserData ? JSON.parse(getUserData) : null;

  if (userData) {
    console.log('True');
    console.log(userData.venueManager);
    return <Links1 userData={userData} />;
  } else {
    console.log('False');
    return <Links2 />;
  }
}

export function Links1(props) {
  const getUserData = localStorage.getItem('userData');
  const userData = getUserData ? JSON.parse(getUserData) : null;
  console.log(userData);
  const isLoggedIn = props.userData.accessToken;
  const isAdmin = props.userData.venueManager;

  const handleLogout = () => {
    localStorage.clear();
    props.history.push('/');
  };

  return (
    <>
      <div className={classes.NavBar}>
        <ul className="menu-items">
          <li onClick={() => props.isMobile && props.closeMobile()}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => props.isMobile && props.closeMobile()}>
            <Link to="/bookings">Venues</Link>
          </li>
          {isLoggedIn && (
            <li onClick={() => props.isMobile && props.closeMobile()}>
              <Link to="/bookings">Profile</Link>
            </li>
          )}
          {isLoggedIn && isAdmin && (
            <li onClick={() => props.isMobile && props.closeMobile()}>
              <Link to="/bookings">Admin</Link>
            </li>
          )}
          {isLoggedIn && (
            <li onClick={() => props.isMobile && props.closeMobile()}>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li onClick={() => props.isMobile && props.closeMobile()}>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
          {/*           <li onClick={() => props.isMobile && props.closeMobile()}>
            <Link to="/contact">Contact</Link>
          </li> */}
        </ul>
      </div>
    </>
  );
}

export function Links2(props) {
  return (
    <>
      <div className={classes.NavBar}>
        <ul className="menu-items">
          <li onClick={() => props.isMobile && props.closeMobile()}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => props.isMobile && props.closeMobile()}>
            <Link to="/bookings">Booking</Link>
          </li>
          {/*           <li onClick={() => props.isMobile && props.closeMobile()}>
            <Link to="/contact">Contact</Link>
          </li> */}
        </ul>
      </div>
    </>
  );
}
