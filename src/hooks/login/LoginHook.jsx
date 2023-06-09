import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginAuth } from '../../services/authorization/apiBase';
import * as storage from '../../services/storage/loadToken';
import { Message } from '../../components/Message';
import { useNavigate } from 'react-router-dom';

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

/**
 * Renders a registration form component.
 *
 * @returns {JSX.Element} JSX element representing the registration form component.
 * @example
 * <RegistrationForm />
 * // Output:
 * // A registration form component with input fields for name, email, password, user or venue manager option, and avatar.
 * // Users can submit the form and receive messages indicating the success or failure of the registration.
 */
export function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(matchForm) });

  /**
   * Handles the form submission event.
   *
   * @param {Object} data - The form data submitted by the user.
   * @returns {Promise<void>} A promise that resolves after handling the form submission.
   */
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
        setMessage({
          type: 'success',
          text: 'Login was successful, you will be redirected',
        });
        setTimeout(() => {
          navigate(`/success/login`); // Redirect to success page
        }, 2500);
      } else {
        setMessage({
          type: 'error',
          text: 'Login was not successful, please try again',
        });
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
            {message && <Message type={message.type} text={message.text} />}
            {error && <p>{error}</p>}
            <button className="button primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
