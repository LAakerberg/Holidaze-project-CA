import { Spinner } from './Spinner';

export function SuccessLogin() {
  return (
    <>
      {' '}
      <div className="border bg-green-500/50 border-green-800 w-full m-auto mt-5">
        <div className="flex">
          <div className="flex-1 p-1">
            <p>Login was successful</p>
          </div>
          <div className="flex-initial p-1">
            <Spinner />
          </div>
        </div>
      </div>
    </>
  );
}
