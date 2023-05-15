import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Spinner } from '../Spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getVenue } from '../../services/authorization/apiBase';

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
      .number('Price must contain a number')
      .min(1, 'Price must contain a number')
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

export function VenueForm() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(matchForm) });

  const onSubmit = async (data) => {
    console.log(data);
    const accessToken = localStorage.getItem('accessToken');

    try {
      // Ensure media field is always an array
      data.media = Array.isArray(data.media) ? data.media : [data.media];

      const response = await fetch(getVenue, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setSuccessMessage('Venue was successfully created, page will refresh!');
        setTimeout(() => {
          setSuccessMessage(''); // Clear the success message
        }, 3000);
      } else {
        console.log('Registration was not successful, please try again');
        setErrorMessage('Registration was not successful, please try again');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [errorMessage, successMessage]);

  return (
    <div className="venue-form">
      {/* Render success message if it exists */}
      {successMessage && (
        <>
          <div className="border bg-green-500/50 border-green-800 w-full m-auto">
            <div className="flex">
              <div className="flex-1 p-1">
                <p>{successMessage}</p>
              </div>
              <div className="flex-initial p-1">
                <Spinner />
              </div>
            </div>
          </div>
        </>
      )}
      {/* Render error message if it exists */}
      {errorMessage && (
        <>
          <div className="flex border bg-red-500/50 border-red-800 w-full h-10 m-auto">
            <p className="m-auto">{errorMessage}</p>
          </div>
        </>
      )}
      {/* Rest of your form code */}
      <div className="transition-all delay-500 duration-300 ease-in-out p-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          method="post"
          className="create-venue"
          id="create-venue-form"
        >
          <div>
            <div className="flex flex-row">
              <div className="border flex-1 p-2">
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

                  <p>{errors.name?.message}</p>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="venue_form"
                    placeholder="Enter your first-name"
                    {...register('description')}
                  />

                  <p>{errors.description?.message}</p>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="media" className="">
                    Media
                  </label>
                  <input {...register('media')} />
                  <p>{errors.media?.message}</p>
                </div>
              </div>
              <div className="border ml-2 flex-1 p-2">
                <div className="flex flex-col">
                  <label htmlFor="price" className="">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    placeholder="Price for venue"
                    min="1"
                    max="3000"
                    className="venue_form"
                    {...register('price')}
                  />
                  <p>{errors.price?.message}</p>
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
                  <p>{errors.maxGuests?.message}</p>
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
                  <p>{errors.rating?.message}</p>
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
                    <p>{errors.wifi?.message}</p>
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
                    <p>{errors.parking?.message}</p>
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
                    <p>{errors.breakfast?.message}</p>
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
                    <p>{errors.pets?.message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border mt-2 p-2">
              <div className="flex flex-col">
                <label htmlFor="address" className="">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="venue_form"
                  placeholder="Enter your first-name"
                  {...register('address')}
                />

                <p>{errors.address?.message}</p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="city" className="">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="venue_form"
                  placeholder="Enter your first-name"
                  {...register('city')}
                />

                <p>{errors.city?.message}</p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="zip" className="">
                  Zip
                </label>
                <input
                  type="number"
                  id="zip"
                  className="venue_form"
                  placeholder="Enter a url for avatar"
                  {...register('zip')}
                />
                <p>{errors.zip?.message}</p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="country" className="">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="venue_form"
                  placeholder="Enter a url for avatar"
                  {...register('country')}
                />
                <p>{errors.country?.message}</p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="continent" className="">
                  Continent
                </label>
                <input
                  type="text"
                  id="continent"
                  className="venue_form"
                  placeholder="Enter a url for avatar"
                  {...register('continent')}
                />
                <p>{errors.continent?.message}</p>
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
