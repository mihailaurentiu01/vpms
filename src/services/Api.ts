import axios from 'axios';
import Category from '../models/Category';
import User from '../models/User';
import Vehicle from '../models/Vehicle';

export const BASE_URL: string =
  'https://vpms-c7968-default-rtdb.europe-west1.firebasedatabase.app/';

export default {
  registerUser(userData: User) {
    return axios.post(BASE_URL + '/users.json', userData);
  },
  getUsers() {
    return axios.get(BASE_URL + '/users.json');
  },
  createCategory(categoryData: Category) {
    return axios.post(BASE_URL + 'categories.json', categoryData);
  },
  getCategories() {
    return axios.get(BASE_URL + 'categories.json');
  },
  updateCategory(category: Category) {
    return axios.put(
      BASE_URL + 'categories/' + category.id + '.json',
      category
    );
  },
  deleteCategory(id: string) {
    return axios.delete(BASE_URL + 'categories/' + id + '.json');
  },
  createVehicle(vehicle: Vehicle) {
    return axios.post(BASE_URL + 'vehicles.json', vehicle);
  },
};
