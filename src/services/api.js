import Axios from 'axios';
import { getToken } from './UseToken';

const ApiConnect = Axios.create({
  baseURL: 'http://localhost:8000/api/',
  //baseURL: 'http://iestablero.duckdns.org:8000/api/',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

/**
 * Http Request to login.
 * @param {*} email the email for the query.
 * @param {*} password the password for the query.
 * @returns return the token for the request.
 */
export async function ApiLogin(email, password) {
  return await ApiConnect.post('login', {
    email,
    password,
    device: 'navigator',
  });
}

/**
 * Http Request to logout
 * @param {*} email the email for the query.
 * @param {*} password the password for the query.
 * @returns return response 200.
 */
export async function ApiLogout(email, password) {
  return await ApiConnect.get('logout', {
    email,
    password
  });
}

/**
 * Http Request to get stadistics from database
 * @returns list with all stadistics
 */
export const getStadistics = async () => {
  return await ApiConnect.get('client/stats', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

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
  return await ApiConnect.get(`client/id`, {
    params:{id: id},
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a client by data
 * @param {*} id to identify the client
 * @returns user data
 */
export const getClientByData = async (id) => {
  return await ApiConnect.get(`client/${id}`, {
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
export const updateClientBy = async (user) => {
  return await ApiConnect.put(
    `client`,user,
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
 * Http Request to add a new client
 * @returns response 200 if ok
 */
export const AddClient = async (user) => {
  return await ApiConnect.post(
    `client`,
    {...user },
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
  return await ApiConnect.delete(`client/id`, {
    params:{id: id},
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};



/* 
    Teacher
*/

export const getAllProfesorData = async () => {
  return await ApiConnect.get('/users/rol/1', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};



/* USERS */
/* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Http Request to get a user by the email.
 * @param {*} logineamil email to search the user.
 * @returns usuario con todos los datos.
 */
export const getAllUserData = async (logineamil) => {
  return await ApiConnect.get(`userbyemail`, {
    params: {email: logineamil},
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get all Users from database
 * @returns list with all users
 */
export async function ApiGetUser() {
  return await ApiConnect.get('users', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

/**
 * Http Request to get all Users from database
 * @returns list with all students
 */
export const getAllStudentsData = async () => {
  return await ApiConnect.get('/users/rol/2', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a Users by id
 * @param {*} id to identify the Users
 * @returns user data
 */
export const getUserById = async (id) => {
  return await ApiConnect.get(`user/id`, {
    params:{id: id},
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a student by DNI
 * @param {*} id to identify the client
 * @returns user data
 */
export const getUserByDNI= async (id) => {
  return await ApiConnect.get(`userByDni/id`, {
    params:{id: id},
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

 /* Http Request to update a user
 * @param {*} id to identify the user
 * @returns response 200 if ok
 */
export const updateUserBy = async (user) => {
  return await ApiConnect.put(
    `user`,user,
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
 * Http Request to add a new student
 * @returns response 200 if ok
 */
export const AddStudent = async (user) => {
  return await ApiConnect.post(
    `user/addstudent`,
    {
      dni: user.dni,
      rol: user.rol,
      course_year: user.course_year,
      cycle: user.cycle,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      others: ' ',
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
 * Http Request to add a new teacher
 * @returns response 200 if ok
 */
export const AddProfesor = async (user) => {
  return await ApiConnect.post(
    `user/addprofessor`,
    {
      dni: user.dni,
      rol: user.rol,
      course_year: user.course_year,
      cycle: user.cycle,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      others: ' ',
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
 * Http Request to delete a student by id
 * @param {*} id to identify the student
 * @returns response 200 for ok OR 401 for not found
 */
export const ApiDelUser = async (id) => {
  return await ApiConnect.delete(`user/id`, {
    params:{id: id},
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/* Appointments */
/* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Http Request to add a new appointment
 * @returns response 200 if ok
 */
export const AddAppointment = async (event) => {
  return await ApiConnect.post(
    `appointment`,
    {
      date: event.start,
      treatment: event.calendar,
      protocol: event.title,
      dni_client: event.dnicliente,
      dni_student: event.dnialumno,
      consultancy: event.desc,
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
 * Http Request to get all appointments
 * @returns appointments data
 */
export const getAllAppointments = async () => {
  return await ApiConnect.get('appointments', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a appointment by id
 * @param {*} id to identify the appointment
 * @returns appointment data
 */
export const getAppointmentPaged = async (params) => {
  return await ApiConnect.get(`appointments/paged`, {
    params:{...params},
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a appointment by id
 * @param {*} id to identify the appointment
 * @returns appointment data
 */
export const getAppointmentbyId = async (id) => {
  return await ApiConnect.get(`appointment/id`, {
    params:{id: id},
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get all appointments
 * @returns appointments data
 */
export const updateAppointment = async (event) => {
  return await ApiConnect.put(`appointment`, {
    id: event.id,
    date: event.start,
    treatment: event.calendar,
    protocol: event.title,
    dni_client: event.dnicliente,
    dni_student: event.dnialumno,
    consultancy: event.desc,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to delete a appointment by id
 * @param {*} id to identify the client
 * @returns response 200 for ok OR 401 for not found
 */
export const deleteAppointment = async (id) => {
  return await ApiConnect.delete(`appointment/id`, {
    params:{id: id},
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};