import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import CollectionsList from './CollectionsList';
import TasksTodo from './Taskstodo';


const CollectionsRoute = props => (
  <div>
    <CollectionsList
      collections
      chooseCollection={this.props.chooseCollection}
      addCollection={props.addCollection}
    />

    <Route
      exact
      path="/"
      render={routeProps => (
        <TasksTodo
          {...routeProps}
          tasks={props.tasks}
          collections={props.collections}
          addTask={props.addTask}
          doTask={props.doTask}
          toDo={props.toDo}
          displayTasks={props.displayTasks}
          addCollection={props.addCollection}
          chooseCollection={props.chooseCollection}
        />
      )}
    />

    <Route
      path="/c/:collectionId"
      render={routeProps => (
        <TasksTodo
          {...routeProps}
          tasks={props.tasks}
          collections={props.collections}
          addTask={props.addTask}
          doTask={props.doTask}
          toDo={props.toDo}
          displayTasks={props.displayTasks}
          addCollection={props.addCollection}
          chooseCollection={props.chooseCollection}
        />
      )}
    />

  </div>
)


export default CollectionsRoute;
