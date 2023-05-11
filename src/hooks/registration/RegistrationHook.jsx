import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerAuth } from '../../services/authorization/apiBase';

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
    avatar: yup.string(),
  })
  .required();

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(matchForm) });

  const onSubmit = async (data) => {
    console.log(data);

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
        alert(
          'Registration was successful, you will be redirected to login page'
        );
        window.location.href = '/success'; // Redirect to success page
      } else {
        alert('Registration was not successful, please try again');
      }

      console.log(response);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} action="/register" method="post">
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

          <div className="flex flex-row">
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
          <button className="button primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
