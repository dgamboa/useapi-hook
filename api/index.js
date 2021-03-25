import axios from "axios";
import axiosWithAuth from "./../axiosWithAuth";

const baseURL = 'https://cloud-schoolz.herokuapp.com/api';

// Handles GET Requests
// Resource can be: admin, students, volunteers, tasks
export const fetchResource = async (resource) => {
  try {
    const response = (resource === "tasks")
      ? await axiosWithAuth().get(`${baseURL}/${resource}`)
      : await axios.get(`${baseURL}/${resource}`);
    return await response.data;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
};

// Handles POST Requests for register and login
// Resource can be: admin, students, volunteers
// Action can be: register, login
export const postResource = async (resource, action, credentials) => {
  try {
    const response = await axios.post(`${baseURL}/${resource}/${action}`, credentials);
    return response.data;
  } catch (err) {
    console.log(`${err}`);
    throw err;
  }
};

// Handles GET Requests for a specific volunteer (admin and volunteers have access)
export const fetchVolunteer = async (id) => {
  try {
    const response = await axiosWithAuth().get(`${baseURL}/volunteers/${id}`);
    return await response.data;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

// Handles GET Requests for a volunteer's tasks (admin and volunteers have access)
export const fetchTasks = async (id) => {
  try {
    const response = await axiosWithAuth().get(`${baseURL}/volunteers/tasks/${id}`);
    return await response.data;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

// Handles POST Requests for tasks (only admins have access)
export const postTask = async (task) => {
  try {
    const response = await axiosWithAuth().post(`${baseURL}/tasks`, task);
    return await response.data;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

// Handles PUT Requests for tasks (only admins have access)
export const putTask = async (task, id) => {
  try {
    const response = await axiosWithAuth().put(`${baseURL}/tasks/${id}`, task);
    return await response.data;
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    throw err;
  }
}

