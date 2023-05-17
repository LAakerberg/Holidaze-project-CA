/* API Base urls */

// This is the base url for the API of holidaze project
const baseUrl = 'https://api.noroff.dev/api/v1/holidaze/';

const getAllVenues = 'venues/';

export const venueApiUrl = baseUrl + getAllVenues;

// Register auth

export const registerAuth = baseUrl + 'auth/register/';

// Login Auth

export const loginAuth = baseUrl + 'auth/login/';

// Profile

export const getProfileUrl = baseUrl + 'profiles/';

// Booking

const booking = 'bookings/';

export const bookingVenueUrl = baseUrl + booking;
