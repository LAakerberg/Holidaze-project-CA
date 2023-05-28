import { RegistrationForm } from '../../../hooks/registration/RegistrationHook';
import { useEffect, useState } from 'react';
import { Message } from '../../../components/Message';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const titleName = 'Create account';
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
          <div className="w-4/5 p-1 m-auto flex flex-col">
            <h2>Register account</h2>
          </div>
          <div>
            <div className="w-full lg:w-4/6 xl:w-3/6 border border-light_salmon rounded-lg p-1 m-auto flex flex-col bg-gray-200">
              <div className="flex flex-row p-1">
                <div className="flex-1">
                  <div>
                    <RegistrationForm />
                  </div>
                </div>
                <div className="flex"></div>
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
