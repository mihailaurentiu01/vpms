import axios from 'axios';
import User from '../models/User';

export const BASE_URL: string =
  'https://vpms-c7968-default-rtdb.europe-west1.firebasedatabase.app/';

export default {
  registerUser(userData: User) {
    return axios.post(BASE_URL + '/users.json', userData);
  },
  getUsers() {
    return axios.get(BASE_URL + '/users.json');
  },
};
