import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerAuth } from '../../services/authorization/apiBase';
import { Message } from '../../components/Message';

const regexEmail = /^[\w\-.]+@(stud\.)?noroff\.no$/;
const regexName = /^[\w]+$/;

const matchForm = yup
  .object({
    name: yup
      .string()
      .matches(regexName, 'No special character and max 20 char long')
      .required(),
    email: yup
      .string()
      .matches(
        regexEmail,
        'Must be a @stud.noroff.no or @noroff.no defined email'
      ),
    password: yup.string().min(3).max(20).required(),
    venueManager: yup.boolean().required(),
    avatar: yup.string().required(),
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
export function RegistrationForm() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
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
      const response = await fetch(registerAuth, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Registration was successful, you will be redirected to login page',
        });

        navigate(`/success/register'`); // Redirect to success page
      } else {
        setMessage({
          type: 'error',
          text: `Registration was not successful, please try again -> ${responseData.errors[0].message}`,
        });
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <form
      id="reg-form"
      onSubmit={handleSubmit(onSubmit)}
      action="/register"
      method="post"
    >
      <div>
        <div>
          <div className="flex flex-col">
            <label htmlFor="firstName" className="">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first-name"
              {...register('name')}
            />

            <p>{errors.name?.message}</p>
          </div>

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

          <div className="flex flex-col">
            User or Venue manager
            <div className="flex-1">
              <label htmlFor="user" className="pr-2 switch">
                <input
                  type="checkbox"
                  id="user"
                  className="user_2"
                  {...register('venueManager')}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="avatar" className="">
              Avatar
            </label>
            <input
              type="url"
              id="avatar"
              placeholder="Enter a url for avatar"
              {...register('avatar')}
            />
            <p>{errors.avatar?.message}</p>
          </div>
        </div>
        <div>
          {message && <Message type={message.type} text={message.text} />}
          <button className="button primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
