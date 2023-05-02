import { useForm } from 'react-hook-form';

export function RegistrationForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="fName" className="">
                First name
              </label>
              <input
                type="text"
                id="fName"
                placeholder="Enter your first-name"
                {...register('fName', {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
              />

              <label htmlFor="lName" className="">
                Last name
              </label>
              <input
                type="text"
                id="lName"
                placeholder="Enter your last-name"
                {...register('lName', {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
              />

              <label htmlFor="password" className="">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter a password"
                {...register('password', {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
              />
            </div>

            <div className="flex flex-row">
              <label htmlFor="user" className="pr-2">
                User
              </label>
              <input
                type="radio"
                id="user"
                value="user"
                placeholder="Enter your name"
                {...register('user', {
                  required: true,
                })}
              />

              <label htmlFor="admin" className="px-2">
                Admin
              </label>
              <input
                type="radio"
                id="admin"
                value="admin"
                {...register('admin', {
                  required: true,
                })}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="url" className="">
                Avatar
              </label>
              <input
                type="url"
                id="url"
                value=""
                placeholder="Enter a url for avatar"
                {...register('url', {
                  required: false,
                })}
              />
            </div>
          </div>
          <div>
            <button className="button primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
