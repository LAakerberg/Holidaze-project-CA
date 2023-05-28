import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Message } from '../../components/Message';
import { useNavigate } from 'react-router-dom';

/**
 * AuthUser component.
 * Renders the login and registration options for the user.
 * Handles authentication and redirects if the user is already logged in.
 */
export function AuthUser() {
  const titleName = 'Login or create account';
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    document.title = `Venue | ${titleName}`;
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData')); // Retrieve user data from localStorage
    if (user && user.accessToken) {
      setIsLoggedIn(true);
      setMessage({
        type: 'success',
        text: 'You are already logged in, you will be redirected',
      });
      setTimeout(() => {
        navigate(`/profile/${user.name}`); // Redirect to profile page
      }, 2500);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {isLoggedIn && (
        <div>
          {message && <Message type={message.type} text={message.text} />}
        </div>
      )}
      {!isLoggedIn && (
        <>
          <div>
            <h2>Register account</h2>
          </div>
          <div>
            <div className="w-full border border-light_salmon p-1 mb-2 flex flex-col bg-gray-200">
              <div className="flex flex-col p-1">
                <h3>Login or Register?</h3>
                <div className="flex flex-col mobile:flex-row">
                  <div className="flex-initial pt-4">
                    <Link
                      to="/register"
                      className="button primary"
                      id="register_account"
                    >
                      New account
                    </Link>
                  </div>
                  <div className="flex-initial pt-4">
                    <Link
                      to="/login"
                      className="button secondary"
                      id="login_user"
                    >
                      Login
                    </Link>
                  </div>
                </div>
                <div className="hidden"></div>
              </div>
              <div className="justify-center m-auto hidden">
                <div className="text-center">
                  <button className="button primary">View</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
