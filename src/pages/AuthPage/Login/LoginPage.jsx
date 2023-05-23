import { LoginForm } from '../../../hooks/login/LoginHook';

export function Login() {
  return (
    <>
      <main className="relative flex flex-col w-full md:w-4/5 max-w-screen-2xl px-1 py-6">
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <div className="w-full border border-light_salmon p-1 mb-2 flex flex-col">
            <div className="flex flex-row p-1">
              <div className="flex-1">
                <p>Form:</p>
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
      </main>
    </>
  );
}
