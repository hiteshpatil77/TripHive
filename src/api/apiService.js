import axios from 'axios';

const API_URL = 'https://triphive.world/api/mobile/';

const endpoints = {
  login: {
    loginUser: `${API_URL}login`,
    friendsUser: `${API_URL}friends`,
  },
};

const validateApiResponse = response => {
  console.log('response=-=-', response);
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (typeof data === 'object' && data !== null) return [data];
  return [];
};

const handleApiError = error => {
  console.log('error=-=-', error);
  const errorMessage =
    error?.response?.data?.message ||
    error.message ||
    'An unknown error occurred';
  console.error('API Error:', errorMessage);
  throw new Error(errorMessage);
};

const fetchPostData = async (url, payload) => {
  console.log('urlAPi-=>', url);
  console.log('payloadAPi-=>', payload);

  try {
    const response = await axios.post(url, payload);
    console.log('fetchPostData=-=-', response);
    return validateApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

const fetchGetData = async url => {
  try {
    const response = await axios.get(url);
    return validateApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const loginUser = (email, password) =>
  fetchPostData(endpoints.login.loginUser, {email, password});

export const friendEveryone = () => fetchGetData(endpoints.login.friendsUser);

export const myFreind = id => fetchPostData(endpoints.login.friendsUser, id);
