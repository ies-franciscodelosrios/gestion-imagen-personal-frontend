import Axios from 'axios';
import { getToken } from './UseToken';

const ApiConnect = Axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export async function ApiLogin(email, password) {
  return await ApiConnect.post('login', {
    email,
    password,
    device: 'navigator',
  });
}

export const getAllUserData = async (loginEmail) => {
  return await ApiConnect.get(`userByCorreo/${loginEmail}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
export async function ApiGetUser() {
  return await ApiConnect.get('users', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

/* Clients */
/* ----------------------------------------------------------------------------------------------------------------------------------------- */
/**
 * Http Request to get all clients from database
 * @returns list with all clients
 */
export const getAllClientsData = async () => {
  return await ApiConnect.get('clients', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a client by id
 * @param {*} id to identify the client
 * @returns user data
 */
export const getClientById = async (id) => {
  return await ApiConnect.get(`client/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to add a new client
 * @returns response 200 if ok
 */
export const AddClient = async (user) => {
  return await ApiConnect.post(
    `client`,
    {
      DNI: user.DNI,
      Name: user.Name,
      Surname: user.Surname,
      Birth_Date: user.BirthDate,
      Phone: user.Phone,
      Email: user.Email,
      More_Info: ' ',
      Life_Style: ' ',
      Background_Health: ' ',
      Background_Aesthetic: ' ',
      Asthetic_Routine: ' ',
      Hairdressing_Routine: ' '
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

/**
 * Http Request to delete a client by id
 * @param {*} id to identify the client
 * @returns response 200 for ok OR 401 for not found
 */
export const ApiDelClient = async (id) => {
  return await ApiConnect.delete(`client/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export async function ApiGetFaq() {
  return await ApiConnect.get('questions', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
