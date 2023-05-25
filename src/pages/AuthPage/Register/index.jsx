import { RegistrationForm } from '../../../hooks/registration/RegistrationHook';

export function Register() {
  return (
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
  );
}
