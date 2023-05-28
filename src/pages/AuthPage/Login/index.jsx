import { LoginForm } from '../../../hooks/login/LoginHook';
import { useEffect, useState } from 'react';
import { Message } from '../../../components/Message';
import { useNavigate } from 'react-router-dom';

/**
 * Login component.
 * Renders the login form and handles user authentication.
 * Handles authentication and redirects if the user is already logged in.
 */
export function Login() {
  const titleName = 'Login';
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
            <h2>Login</h2>
          </div>
          <div>
            <div className="w-full border border-light_salmon p-1 mb-2 flex flex-col bg-gray-200">
              <div className="flex flex-row p-1">
                <div className="flex-1">
                  <div>
                    <LoginForm />
                  </div>
                </div>
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
