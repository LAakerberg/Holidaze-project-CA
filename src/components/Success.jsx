import { Spinner } from './Spinner';
import { useNavigate } from 'react-router-dom';

/**
 * Component for the success page after login.
 * Navigates to the user's profile page.
 */
export function SuccessLogin() {
  const user = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  setTimeout(() => {
    navigate(`/profile/${user.name}`);
  }, 1000);
  return (
    <>
      {' '}
      <div className="border bg-green-500/50 border-green-800 w-full m-auto mt-5">
        <div className="flex">
          <div className="flex-1 p-1">
            <p>Login was successful!</p>
          </div>
          <div className="flex-initial p-1">
            <Spinner />
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Component for the success page after registration.
 * Navigates to the login page.
 */
export function SuccessRegister() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate(`/login`);
  }, 1000);
  return (
    <>
      {' '}
      <div className="border bg-green-500/50 border-green-800 w-full m-auto mt-5">
        <div className="flex">
          <div className="flex-1 p-1">
            <p>Registration was successful!</p>
          </div>
          <div className="flex-initial p-1">
            <Spinner />
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Component for the success page after login.
 * Navigates to the user's profile page.
 */
export function SuccessEvent() {
  const user = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  setTimeout(() => {
    navigate(`/profile/${user.name}`);
  }, 500);
  return (
    <>
      {' '}
      <div className="border bg-green-500/50 border-green-800 w-full m-auto mt-5">
        <div className="flex">
          <div className="flex-1 p-1">
            <p>The event was successful, you will be redirected</p>
          </div>
          <div className="flex-initial p-1">
            <Spinner />
          </div>
        </div>
      </div>
    </>
  );
}
