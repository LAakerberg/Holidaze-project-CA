import { FaUserEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../Message';
import { getProfileUrl } from '../../../services/authorization/apiBase';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const matchForm = yup
  .object({
    avatar: yup.string().required('Avatar link is required'),
  })
  .required();

/**
 * Renders the component for editing the user profile.
 * @returns {JSX.Element} - The rendered component.
 */
export function EditProfile() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData'));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(matchForm) });

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Handles the form submission for updating the user avatar.
   * @param {Object} data - The form data.
   */
  const onSubmit = async (data) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(getProfileUrl + user.name + `/media`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Avatar was changed, page will be refreshed',
        });
        setTimeout(() => {
          navigate(`/success/login`);
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: `Avatar was not changed, please try again`,
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Error to make the call, please try again`,
        error,
      });
    }
  };

  return (
    <>
      <button onClick={toggleOpen}>
        <FaUserEdit className="icons-style bg-orange-500/20 hover:bg-orange-500/70 transition delay-50 duration-300 ease-in-out p-1 rounded-2xl" />
      </button>

      <form
        id="avatar-form"
        onSubmit={handleSubmit(onSubmit)}
        action="/register"
        method="post"
      >
        <div>
          {isOpen && (
            <>
              <div className="bg-gray-200/80 p-1 rounded-md">
                <div className="flex flex-col">
                  <label htmlFor="avatar" className="font-bold">
                    Avatar
                  </label>
                  <input
                    type="url"
                    id="avatar"
                    placeholder="Enter a url for avatar"
                    {...register('avatar')}
                  />

                  <p>
                    {errors.avatar?.message ? (
                      <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                        {errors.avatar?.message}
                      </p>
                    ) : null}
                  </p>
                </div>
                <div>
                  {message && (
                    <Message type={message.type} text={message.text} />
                  )}
                  <button className="button secondary" type="submit">
                    Update
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
}
