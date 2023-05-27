import { Link } from 'react-router-dom';

export function AuthUser() {
  return (
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
                <Link to="/login" className="button secondary" id="login_user">
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
  );
}
