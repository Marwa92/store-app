import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import UsersControl from './HandelingUsers'

const UsersRoute = props => (
  <div>
    <Route
      exact
      path="/"
      render={routeProps => (
        <UsersControl
          {...routeProps}
          usersList={props.usersList}
          color={props.color}
          userId={props.userId}
          selectedUser={props.selectedUser}
          chooseUser={props.chooseUser}
          handleChange={props.handleChange}
          changeUserColor={props.changeUserColor}
          displayUserTasks={props.displayUserTasks}
        />
      )}
    />

    <Route
      path="/u/:userId"
      render={routeProps => (
        <UsersControl
          {...routeProps}
          usersList={props.usersList}
          color={props.color}
          userId={props.userId}
          selectedUser={props.selectedUser}
          chooseUser={props.chooseUser}
          handleChange={props.handleChange}
          changeUserColor={props.changeUserColor}
          displayUserTasks={props.displayUserTasks}
        />
      )}
    />
  </div>
)


export default UsersRoute;
