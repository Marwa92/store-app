import React, { Component } from 'react';
import './App.css';
import { Table, Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './Header';
import FormBox from './FormBox';
import BE from './BE';

const Routing = props => (
 <div>
   <CollectionsList
     collections
     chooseCollection={props.chooseCollection}
     addCollection={props.addCollection}
   />
   <Route
     path="/c/:collectionId"
     render={routeProps => (

       <App
         {...routeProps}
         todoList={props.tasks}
         collectionsList={props.collections}

       />
     )}
     />
 </div>

)
