import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 *
 * @returns The correct links based on the user is a Admin or not and also if the user is logged in or not
 *
 */

export function NavLinks(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));

  /**
   * Take's the information from localStorage to see if the user
   * is logged in and if the user is admin or not.
   */

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user && user.accessToken && user.venueManager) {
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else if (user && user.accessToken) {
      setIsLoggedIn(true);
      setIsAdmin(false);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  /**
   *
   * @returns This function handle the logout link and is clearing the localStorage and redirect the user to the homepage
   */

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = "/";
  };

  return (
    <>
      <ul className="menu-items">
        <li className="">
          <Link to="/" onClick={() => props.isMobile && props.closeMobile()}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/venues"
            onClick={() => props.isMobile && props.closeMobile()}
          >
            Venues
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link
                to={`/profile/${user.name}`}
                onClick={() => props.isMobile && props.closeMobile()}
              >
                Profile
              </Link>
            </li>
            {isAdmin && (
              <li className="hidden">
                <Link
                  to="/admin"
                  onClick={() => props.isMobile && props.closeMobile()}
                >
                  Admin
                </Link>
              </li>
            )}
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Link
              to="/auth"
              onClick={() => props.isMobile && props.closeMobile()}
            >
              Login
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </>
  );
}
