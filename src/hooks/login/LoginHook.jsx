import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { baseUrl, loginAuth } from '../../services/api/apiBase';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(matchForm) });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await fetch(baseUrl + loginAuth, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok) {
        alert(
          'Registration was successful, you will be redirected to login page'
        );
        /* window.location.href = '/success'; // Redirect to success page */
      } else {
        alert('Registration was not successful, please try again');
      }

      console.log(response);
      console.log(responseData);
      localStorage.setItem('userData', JSON.stringify(responseData));
      const getUserData = localStorage.getItem('userData');
      const userData = JSON.parse(getUserData);
      console.log(userData.accessToken);
    } catch (error) {
      console.log(error);
      console.error(error);
      setError('Login failed');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} action="/login" method="post">
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
          <button className="button primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
