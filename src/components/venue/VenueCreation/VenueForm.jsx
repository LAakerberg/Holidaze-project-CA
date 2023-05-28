import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { venueApiUrl } from '../../../services/authorization/apiBase';
import { Message } from '../../Message';
import { useNavigate } from 'react-router-dom';

const matchForm = yup
  .object({
    name: yup
      .string()
      .min(3, 'Title must be at least 3 characters')
      .max(30)
      .required(),
    description: yup
      .string()
      .min(50, 'Description must be at least 50 characters')
      .required(),
    media: yup
      .mixed()
      .transform((value, originalValue) =>
        originalValue ? [originalValue] : []
      )
      .test(
        'is-media-array',
        'Please enter at least one media URL',
        (value) => Array.isArray(value) && value.length > 0
      )
      .required('Please enter a media URL'),
    price: yup
      .number('Price must contain a number ok?')
      .min(1, 'Price must be higher than 0')
      .required('Price must contain a number'),
    maxGuests: yup.number().integer().min(1).max(100).required(),
    rating: yup.number().min(1).max(5).required(),
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
    address: yup.string().min(3).max(30).required(),
    city: yup.string().required(),
    zip: yup.number().required(),
    country: yup.string().required(),
    continent: yup.string().required(),
  })
  .required();

/**
 * Represents a form for creating a venue.
 * @returns {JSX.Element} The JSX element containing the venue creation form.
 */
export function VenueForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(matchForm) });

  /**
   * Handles form submission.
   * @param {Object} data - The form data.
   * @returns {Promise<void>} A Promise that resolves when the form submission is complete.
   */
  const onSubmit = async (data) => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      // Ensure media field is always an array
      data.media = Array.isArray(data.media) ? data.media : [data.media];

      const response = await fetch(venueApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Venue was successfully created, page will refresh!',
        });

        setTimeout(() => {
          navigate(`/success/event`);
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Venue was not created successful, please try again',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Venue was not created successful, please try again',
      });
    }
  };

  return (
    <div className="venue-form">
      {message && <Message type={message.type} text={message.text} />}

      <div className="transition-all delay-500 duration-300 ease-in-out p-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          method="post"
          className="create-venue"
          id="create-venue-form"
        >
          <div>
            <div className="flex flex-col tablet:flex-row">
              <div className="border m-1 flex-1 p-2">
                <div className="flex flex-col">
                  <label htmlFor="name" className="">
                    Title name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="venue_form"
                    placeholder="Enter your first-name"
                    {...register('name')}
                  />

                  <p>
                    {errors.name?.message ? (
                      <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                        {errors.name?.message}
                      </p>
                    ) : null}
                  </p>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="media" className="">
                    Media
                  </label>
                  <input
                    placeholder="Enter a link for the media"
                    {...register('media')}
                  />
                  <p>
                    {errors.media?.message ? (
                      <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                        {errors.media?.message}
                      </p>
                    ) : null}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="">
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    className="venue_form"
                    placeholder="Enter a description"
                    {...register('description')}
                  />

                  <p>
                    {errors.description?.message ? (
                      <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                        {errors.description?.message}
                      </p>
                    ) : null}
                  </p>
                </div>
              </div>
              <div className="border flex-1 m-1 p-2">
                <div className="flex flex-col">
                  <label htmlFor="price" className="">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    placeholder="Price for venue"
                    className="venue_form"
                    {...register('price')}
                  />
                  <p>
                    {errors.price?.message ? (
                      <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                        {errors.price?.message}
                      </p>
                    ) : null}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="maxGuests" className="">
                    Max Guests
                  </label>
                  <input
                    type="number"
                    id="maxGuests"
                    placeholder="Max guests"
                    min="1"
                    max="100"
                    className="venue_form"
                    {...register('maxGuests')}
                  />
                  <p>
                    {errors.maxGuests?.message ? (
                      <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                        {errors.maxGuests?.message}
                      </p>
                    ) : null}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="rating" className="">
                    Ratings
                  </label>
                  <input
                    type="number"
                    id="rating"
                    placeholder="Ratings"
                    min="0"
                    max="5"
                    className="venue_form"
                    {...register('rating')}
                  />
                  <p>
                    {errors.rating?.message ? (
                      <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                        {errors.rating?.message}
                      </p>
                    ) : null}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 item-center justify-center mb-2">
                  <div className="flex flex-col">
                    <label htmlFor="wifi" className="">
                      Wifi
                    </label>
                    <input
                      type="checkbox"
                      id="wifi"
                      {...register('meta.wifi')}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="parking" className="">
                      Parking
                    </label>
                    <input
                      type="checkbox"
                      id="parking"
                      {...register('meta.parking')}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="breakfast" className="">
                      Breakfast
                    </label>
                    <input
                      type="checkbox"
                      id="breakfast"
                      {...register('meta.breakfast')}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="pets" className="">
                      Pets
                    </label>
                    <input
                      type="checkbox"
                      id="pets"
                      {...register('meta.pets')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border m-1 p-2">
              <div className="flex flex-col">
                <label htmlFor="address" className="">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="venue_form"
                  placeholder="Enter the address"
                  {...register('address')}
                />

                <p>
                  {errors.address?.message ? (
                    <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                      {errors.address?.message}
                    </p>
                  ) : null}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="city" className="">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="venue_form"
                  placeholder="Enter the city name"
                  {...register('city')}
                />

                <p>
                  {errors.city?.message ? (
                    <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                      {errors.city?.message}
                    </p>
                  ) : null}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="zip" className="">
                  Zip
                </label>
                <input
                  type="number"
                  id="zip"
                  className="venue_form"
                  placeholder="Enter a zip code"
                  {...register('zip')}
                />
                <p>
                  {errors.zip?.message ? (
                    <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                      {errors.zip?.message}
                    </p>
                  ) : null}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="country" className="">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="venue_form"
                  placeholder="Enter country name"
                  {...register('country')}
                />
                <p>
                  {errors.country?.message ? (
                    <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                      {errors.country?.message}
                    </p>
                  ) : null}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="continent" className="">
                  Continent
                </label>
                <input
                  type="text"
                  id="continent"
                  className="venue_form"
                  placeholder="Enter continent"
                  {...register('continent')}
                />
                <p>
                  {errors.continent?.message ? (
                    <p className="bg-red-200 border border-red-800 p-1 mt-1 animate-pulse">
                      {errors.continent?.message}
                    </p>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
          <button type="submit" className="button primary">
            Create
          </button>
          <button type="reset" className="button secondary">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
