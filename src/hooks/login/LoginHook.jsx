import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginAuth } from '../../services/authorization/apiBase';
import * as storage from '../../services/storage/loadToken';
import { SuccessLogin } from '../../components/StatusMessage';

const regexEmail = /^[\w\-.]+@(stud\.)?noroff\.no$/;

const matchForm = yup
  .object({
    email: yup
      .string()
      .matches(
        regexEmail,
        'Must be a @stud.noroff.no or @noroff.no defined email'
      ),
    password: yup.string().min(8).required(),
  })
  .required();

export function LoginForm() {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Added state variable for success message
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(matchForm) });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(loginAuth, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      const accessToken = responseData.accessToken;
      storage.save('accessToken', accessToken);
      storage.save2('userData', responseData);

      if (response.ok) {
        const user = JSON.parse(localStorage.getItem('userData'));
        setSuccessMessage(<SuccessLogin />); // Set the success message
        setTimeout(() => {
          window.location.href = `/profile/${user.name}`; // Redirect to success page
        }, 2500);
      } else {
        setError('Login was not successful, please try again');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <>
      <form
        id="login-form"
        onSubmit={handleSubmit(onSubmit)}
        action="/success"
        method="post"
      >
        <div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email')}
              />
              <p>{errors.email?.message}</p>

              <label htmlFor="password" className="">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter a password"
                {...register('password')}
              />
              <p>{errors.password?.message}</p>
            </div>
          </div>
          <div>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}{' '}
            {/* Render success message */}
            <button className="button primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
