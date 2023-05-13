import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TiArrowSortedDown } from 'react-icons/ti';
import houseImg from '../../assets/img/house.jpg';

export function CreateVenue({ data }) {
  const user = JSON.parse(localStorage.getItem('userData'));

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (user.venueManager === true) {
    return (
      <>
        <div className="border border-light_salmon bg-gray-200 py-1 my-1">
          <div className="flex flex-col p-1">
            <div className="flex flex-row">
              <div className="flex-1">
                <h3>Manage venue</h3>
              </div>
              <div className="flex-initial">
                <button
                  className={`arrow-button ${isOpen ? 'open' : ''}`}
                  onClick={toggleOpen}
                >
                  <TiArrowSortedDown />
                </button>
              </div>
            </div>
            <div>{isOpen && <ManageVenue data={data} />}</div>
          </div>
        </div>
      </>
    );
  } else {
    return console.log('No admin access');
  }
}

function ManageVenue({ data }) {
  return (
    <>
      <MyVenues key="comp1" data={data} />
      <VenueCreation key="comp2" />
    </>
  );
}

function VenueCreation() {
  /*   const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data or perform other actions here
  }; */

  const matchForm = yup
    .object({
      name: yup.string().required(),
      email: yup.string(),
      password: yup.string().min(3).max(20).required(),
      venueManager: yup.boolean().required(),
      avatar: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(matchForm) });

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="venue-form">
      <div className="flex">
        <div className="flex-1">
          <h3>Create New Venue</h3>
        </div>
        <div className="flex-initial">
          <button
            className={`arrow-button ${isOpen ? 'open' : ''}`}
            onClick={toggleOpen}
          >
            <TiArrowSortedDown />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="transition-all delay-500 duration-300 ease-in-out p-1">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="flex flex-row">
                <div className="border flex-1">
                  Title, description & Media
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="">
                      Title name:
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
                    <label htmlFor="firstName" className="">
                      Description
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
                    <label htmlFor="avatar" className="">
                      Media
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
                <div className="border ml-2 flex-1">
                  Price, Max guests, Rating + Meta = Wifi, Parking, Breakfast &
                  Pets
                  <div className="flex max-w-10">
                    <div className="flex-initial">
                      <div className="flex flex-col">
                        <label htmlFor="avatar" className="">
                          Price
                        </label>
                        <input
                          type="range"
                          id="avatar"
                          placeholder="Enter a url for avatar"
                          min="1"
                          max="2000"
                          className="w-32"
                          {...register('avatar')}
                        />
                        <p>{errors.avatar?.message}</p>
                      </div>
                    </div>
                    <div className="flex-initial m-2 p-1 border"> 10</div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="avatar" className="">
                      Max Guests
                    </label>
                    <input
                      type="range"
                      id="avatar"
                      placeholder="Enter a url for avatar"
                      min="1"
                      max="50"
                      className="w-32"
                      {...register('avatar')}
                    />
                    <p>{errors.avatar?.message}</p>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="avatar" className="">
                      Ratings
                    </label>
                    <input
                      type="range"
                      id="avatar"
                      placeholder="Max guests"
                      min="0"
                      max="50"
                      className="w-32"
                      {...register('avatar')}
                    />
                    <p>{errors.avatar?.message}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 item-center justify-center mb-2">
                    <div className="flex flex-col">
                      <label htmlFor="avatar" className="">
                        Wifi
                      </label>
                      <input
                        type="checkbox"
                        id="avatar"
                        placeholder="Enter a url for avatar"
                        {...register('avatar')}
                      />
                      <p>{errors.avatar?.message}</p>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="avatar" className="">
                        Parking
                      </label>
                      <input
                        type="checkbox"
                        id="avatar"
                        placeholder="Enter a url for avatar"
                        {...register('avatar')}
                      />
                      <p>{errors.avatar?.message}</p>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="avatar" className="">
                        Breakfast
                      </label>
                      <input
                        type="checkbox"
                        id="avatar"
                        placeholder="Enter a url for avatar"
                        {...register('avatar')}
                      />
                      <p>{errors.avatar?.message}</p>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="avatar" className="">
                        Pets
                      </label>
                      <input
                        type="checkbox"
                        id="avatar"
                        placeholder="Enter a url for avatar"
                        {...register('avatar')}
                      />
                      <p>{errors.avatar?.message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border mt-2">
                Location, Address, City, Zip, Country, Continent
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="">
                    Title name:
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
                  <label htmlFor="firstName" className="">
                    Description
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
                  <label htmlFor="avatar" className="">
                    Media
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
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </div>
  );
}

function MyVenues({ data }) {
  console.log(data);

  /*   for (let i = 0; i < data.venues.length; i++) {

  } */

  if (0 < data.venues.length) {
    return (
      <>
        <div>
          <div className="flex p-1 gap-5">
            {data.venues.map((venue) => (
              <div key={venue.id} className="p-1">
                <img
                  src={houseImg}
                  className="object-cover rounded-xl h-32 sm:w-36 border border-1 border-gray-800 m-auto drop-shadow-xl hover:scale-110 hover:transition delay-50 duration-500 ease-in-out"
                />
                <div className="">
                  {venue.name.length > 15
                    ? `${venue.name.slice(0, 15)}...`
                    : venue.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <p>No Venues</p>
        </div>
      </>
    );
  }

  /*   return (
    <div className="w-20 h-20 rounded-xl bg-topaz text-center justify-center items-center">
      <p className="m-auto text-center justify-center items-center">Venue</p>
    </div>
  ); */
}
