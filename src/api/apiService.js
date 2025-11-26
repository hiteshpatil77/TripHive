import axios from 'axios';

const API_URL = 'https://trip-hive-ai-production-ab5c.up.railway.app/api/';
const TIMEOUT = 5000;
const endpoints = {
  login: {
    loginUser: `mobile/auth/login`,
    friendsUser: `https://triphive.world/api/mobile/friends`,
  },
  splittingModule: {
    group: `${API_URL}v1/expense/group`,
    friend: `${API_URL}v1/expense/friend`,
    expense: `${API_URL}v1/expense/expense`,
    balance: `${API_URL}v1/expense/balance`,
    activity: `${API_URL}v1/expense/activity`,
    settlement: `${API_URL}v1/expense/settlement`,
  },
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
});

const fetchData = async (
  endpoint,
  method = 'POST',
  payload = {},
  customHeaders = {},
) => {
  console.log('endpoint-=-=>', endpoint);
  console.log('method-=-=>', method);
  console.log('payload-=-=>', payload);
  console.log('payload-=-=>', customHeaders);

  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${customHeaders}`,
    };

    const headers = {
      ...defaultHeaders,
    };

    const response = await axiosInstance({
      url: endpoint,
      method,
      headers,
      data: method === 'GET' ? null : payload,
      params: method === 'GET' ? payload : null,
    });

    return response.data;
  } catch (error) {
    console.error('fetchData Error ===>', error);
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while processing your request.',
    );
  }
};

const validateApiResponse = response => {
  return response?.data || null;
};

export const loginUser = email =>
  fetchData(endpoints.login.loginUser, 'POST', {email});

// Group API //

export const getAllGroup = headers =>
  fetchData(endpoints.splittingModule.group, 'GET', null, headers);

export const getDetailsGroup = id =>
  fetchData(`${endpoints.splittingModule.group}${id}`, 'GET');

export const deleteGroup = () =>
  fetchData(endpoints.splittingModule.group, 'GET');

export const removeMember = () =>
  fetchData(`${endpoints.splittingModule.group}${id}/member/${id}`, 'DELETE');

export const addFriend = userId =>
  fetchData(`${endpoints.splittingModule.group}/member`, 'POST', {userId});

export const updateGroup = (name, description) =>
  fetchData(`${endpoints.splittingModule.group}${id}`, 'PATCH', {
    name,
    description,
  });

export const CreateGroup = (name, description, imageUrl, memberIds, headers) =>
  fetchData(
    endpoints.splittingModule.group,
    'POST',
    {name, description, imageUrl, memberIds},
    headers,
  );

// Freinds API //

export const getAllFriend = headers =>
  fetchData(endpoints.splittingModule.friend, 'GET', null, headers);

export const getPendingRequest = headers =>
  fetchData(
    `${endpoints.splittingModule.friend}/request`,
    'GET',
    null,
    headers,
  );

export const getAllUser = headers =>
  fetchData(
    `${endpoints.splittingModule.friend}/discover?query=`,
    'GET',
    {},
    headers,
  );

export const getRequest = () =>
  fetchData(`${endpoints.splittingModule.group}/reject`, 'POST', {requestId});

export const sendFriend = (friendId, token) =>
  fetchData(
    `${endpoints.splittingModule.friend}/request`,
    'POST',
    {friendId},
    token,
  );

export const acceptFriend = (requestId, token) =>
  fetchData(
    `${endpoints.splittingModule.friend}/request/accept`,
    'POST',
    {requestId},
    token,
  );

export const rejectFriend = (requestId, token) =>
  fetchData(
    `${endpoints.splittingModule.friend}/reject`,
    'POST',
    {requestId},
    token,
  );

export const friendEveryone = () => fetchData(endpoints.login.friendsUser);

export const getFriend = id => fetchData(endpoints.login.friendsUser, id);

// Expence API //

export const CreateExpense = (
  title,
  description,
  amount,
  currency,
  paidBy,
  splitType,
  splits,
  groupId,
  payers = [],
  token,
) =>
  fetchData(
    endpoints.splittingModule.expense,
    'POST',
    {
      title,
      description,
      amount,
      currency,
      paidBy,
      splitType,
      splits,
      groupId,
      payers,
    },
    token,
  );

export const getAllExpense = () =>
  fetchData(endpoints.splittingModule.expense, 'GET');

export const getExpense = () =>
  fetchData(`${endpoints.splittingModule.expense}${id}`, 'GET');

export const deleteExpense = () =>
  fetchData(`${endpoints.splittingModule.expense}${id}`, 'DELETE');

export const updateExpense = () =>
  fetchData(`${endpoints.splittingModule.expense}${id}`, 'PATCH');

// Balance API //

export const checkBalance = () =>
  fetchData(endpoints.splittingModule.balance, 'GET');

// activity API //

export const getactivity = () =>
  fetchData(endpoints.splittingModule.activity, 'GET');

// settlement API //

export const getsettlement = (toUserId, amount, currency, note, groupId) =>
  fetchData(endpoints.splittingModule.settlement, 'POST', {
    toUserId,
    amount,
    currency,
    note,
    groupId,
  });

export const getAllsettlement = () =>
  fetchData(endpoints.splittingModule.settlement, 'GET');

export const getDelete = () =>
  fetchData(`${endpoints.splittingModule.settlement}${id}`, 'DELETE');
