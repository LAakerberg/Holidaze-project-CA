import { Spinner } from "../../components/Spinner";

export function SuccessLogin() {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (user) {
    console.log(user);
    setTimeout(() => {
      window.location.href = `/profile/${user.name}`;
    }, 500);
    return (
      <>
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
  } else {
    return (
      <>
        <div>Hello, the login was not successful</div>
      </>
    );
  }
}

export function SuccessRegistration() {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (user) {
    console.log(user);
    setTimeout(() => {
      /* window.location.href = `/profile/${user.name}`; */
    }, 500);
    return (
      <>
        <div className="border bg-green-500/50 border-green-800 w-full m-auto mt-5">
          <div className="flex">
            <div className="flex-1 p-1">
              <p>Registration was successful</p>
            </div>
            <div className="flex-initial p-1">
              <Spinner />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>Hello, the login was not successful</div>
      </>
    );
  }
}
