import { Component } from 'react';
import axios from 'axios';

const port = 'http://localhost:3001';
class TasksList extends Component {
  static async postTasks(newTask, collectionId, userId) {
    try {
      const response = await axios.post(`${port}/tasks`, {
        title: newTask,
        completed: false,
        collection: collectionId,
        user: userId,
      });
      console.log(response.data);
      return (response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }


  static async postCollection(newCollection) {
    try {
      const response = await axios.post(`${port}/collections`, {
        name: newCollection,
      });
      console.log(response.data);
      return (response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async postUser(newUser, color) {
    try {
      const response = await axios.post(`${port}/users`, {
        name: newUser,
        color,
      });
      console.log(response.data);
      return (response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async updateUserColor(id, color) {
    try {
      const response = await axios.patch(`${port}/users/${id}`, {
        color,
      });
      console.log(response.data);
      return (response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getTasks() {
    try {
      const response = await axios.get(`${port}/tasks`);
      console.log(response.data);
      return (response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getCollection() {
    try {
      const response = await axios.get(`${port}/collections`);
      console.log('Collections from db', response.data);
      return (response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getUsers() {
    try {
      const response = await axios.get(`${port}/users`);
      console.log('users from db', response.data);
      return (response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default TasksList;
