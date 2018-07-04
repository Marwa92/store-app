import React, { Component } from 'react';
import './App.css';
import { Table, Button } from 'semantic-ui-react';
import Header from './Header';
import FormBox from './FormBox';
import BE from './BE';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isToggleOff: true,
    };
    this.addTask = this.addTask.bind(this);
    this.doTask = this.doTask.bind(this);
    this.toDo = this.toDo.bind(this);
  }

  async componentDidMount() {
    const tasks = await BE.getTasks();
    console.log('tasks from db:', tasks);
    this.setState({ tasks });
    // ({tasks})=> ({tasks(defined in state as array): tasks(defined from DB)})
  }


  async addTask(newTask, e) {
    const { tasks } = this.state;
    const addTask = await BE.postTasks(newTask);
    this.setState({
      tasks: tasks.concat(addTask),
    });
    e.preventDefault();
  }

  doTask(index) {
    const { tasks } = this.state;

    tasks[index].completed = !tasks[index].completed;
    this.setState({
      tasks,
    });
  }

  toDo() {
    this.setState(prevState => ({
      isToggleOff: !prevState.isToggleOff,
    }));
  }

  render() {
    const { tasks, isToggleOff } = this.state;
    const TasksList = tasks.map((task, index) => (
      (isToggleOff || (!isToggleOff && !tasks[index].completed)) ? (
        // {'we shouldnot replace (index) with (tasks.id) '}
        <Table.Row key={task.id}>
          <Table.Cell>
            { task.title }
          </Table.Cell>
          <Table.Cell>
            <input type="checkbox" onClick={() => this.doTask(index)} style={{ backgroundColor: '#00ffbf' }} />
          </Table.Cell>
        </Table.Row>
) : null

    ));


    return (
      <div className="App" style={{ width: '75%', margin: 'auto' }}>
        <Header />
        <FormBox handleSubmit={this.addTask} />
        <Table className="table" textAlign="center" style={{ backgroundColor: 'white' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">
                <Button toggle onClick={this.toDo} active={!isToggleOff} style={{ fontSize: '1vw' }}>
                  {isToggleOff ? 'Tasks' : 'TODO'}
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body style={{ fontSize: '1vw', fontStyle: 'italic' }}>
            {TasksList}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default App;
