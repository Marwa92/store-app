import React, { Component } from 'react';
import axios from 'axios';

class TasksList extends Component{

state = {
   Tasks: [],
};

componentDidMount(){

  axios.get(`https://dl2.pushbulletusercontent.com/33jfNBk9drFlDw5CGwG4zLB3vorgLyYs/db.json`)
  .then (res => {
    this.setState({Tasks: res.data});
  })
}
render(){

  return

<ul>
{this.state.Tasks.map(Tasks=> <li key={Tasks.id}> {Tasks.title}</li>)}
</ul>;

}
}

export default TasksList;
