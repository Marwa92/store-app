import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer.js';

import 'semantic-ui-css/semantic.min.css';

//import { Table } from 'semantic-ui-react'
import {
    TableProps,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHeaderCell,
    TableRow,
    TableHeader,
    Menu,
    Icon,
    MenuItem
} from 'semantic-ui-react';


class App extends Component {
  constructor(props){
    super(props);
     this.state= {
       tasks: [{
         desc:'Marwa',
         status: false,
       },{
         desc: 'Emad',
         status: false,
       }],
      //  checkboxState: false,
     };

  this.addTask = this.addTask.bind(this);
  this.doTask=this.doTask.bind(this);
  }

  addTask(newTask, e) {
    //console.log('new task:', newTask);
    const tasks=this.state.tasks;

    this.setState({
      tasks: tasks.concat({desc:newTask, status: false})
    });
    e.preventDefault();
  }

  doTask(index){
    const tasks = this.state.tasks;
    //console.log('tasks before done:', tasks);
    tasks[index].status = !tasks[index].status;
    //console.log('tasks after done:', tasks);
    this.setState({
       tasks: tasks,
       });
    }


  render() {
    const tasks = this.state.tasks;

    const TasksList= tasks.map((task, index) => (
      <TableRow key={index} >
        <td>{task.desc}</td>
        <td><input type="checkbox" onClick={() => this.doTask(index)}/> </td>
      </TableRow>
    )
  );


    return (
      <div className="App">
      <Header/>
      <Footer handleSubmit={this.addTask}/>
      <Table className="table" class="ui teal table">
        <TableHeader>
          <TableRow>
            <th>Task title</th>
            <th>Doability</th>
          </TableRow>
        </TableHeader>
        <tbody>
          {TasksList}
        </tbody>
      </Table >

      </div>
    );
  }
};

export default App;
