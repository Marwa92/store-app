import React, { Component } from 'react';
import './App.css';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import BE from './BE';
import CollectionsRoute from './Routing';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isToggleOff: true,
      collectionId: 0,
      collections: [],
      users: [],
    };
    this.addTask = this.addTask.bind(this);
    this.doTask = this.doTask.bind(this);
    this.toDo = this.toDo.bind(this);
    this.displayTasks = this.displayTasks.bind(this);
    this.accessUser = this.accessUser.bind(this);
  }

  // collectionsList = response
  async componentDidMount() {
    const tasks = await BE.getTasks();
    console.log('tasks from db:', tasks);
    // ({tasks})=> ({tasks(defined in state as array): tasks(defined from DB)})
    const collectionsList = await BE.getCollection();
    console.log('collectionsList, ', collectionsList);
    const users = await BE.getUsers();
    console.log('users from db:', users);
    await this.accessUser(tasks, users);

    const items = [
      {
        text: 'All',
        value: 0,
        to: '/',
        as: Link,
      },
    ];
    collectionsList.forEach((collection) => {
      const coll = {
        text: collection.name,
        value: collection.id,
        to: `/c/${collection.id}`,
        as: Link,
      };
      items.push(coll);
    });
    this.setState({
      collections: items,
      users,
    });
  }

  async addTask(newTask, e) {
    const { tasks, collectionId } = this.state;
    const addTask = await BE.postTasks(newTask, collectionId);
    this.setState({
      tasks: tasks.concat(addTask),
    });
    e.preventDefault();
  }

  doTask(index) {
    const { tasks } = this.state;
    tasks[index].completed = !tasks[index].completed;
    this.setScollectionsListtate({
      tasks,
    });
  }

  toDo() {
    this.setState(prevState => ({
      isToggleOff: !prevState.isToggleOff,
    }));
  }

  displayTasks(collectionId) {
    console.log('check,', collectionId);
    this.setState({ collectionId });
  }

  accessUser(tasks, users) {
    const tasksUser = tasks;
    tasks.forEach((task) => {
      if (task.user) {
        for (let i = 0; i < users.length; i += 1) {
          if (task.user === users[i].id) {
            tasksUser[i].username = users[i].name;
            tasksUser[i].username = users[i].color;
          }
        }
      }
    });
    this.setState({
      tasks: tasksUser,
    });
  }


  render() {
    const {
      tasks,
      isToggleOff,
      collectionId,
      collections,
      users,
    } = this.state;

    console.log('collectionscheck, ', collections);
    console.log('users, ', users);
    const TasksList = tasks.map((task, index) => (
      ((collectionId === task.collection || collectionId === 0)
      && (isToggleOff || (!isToggleOff && !tasks[index].completed))) ? (
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
      <div className="Home" style={{ width: '75%', margin: 'auto' }}>
        <Header />
        <CollectionsRoute
          collectionsList={this.state.collections}
          displayTasks={this.displayTasks}
          addTask={this.addTask}
          collectionId={this.state.collectionId}
        />
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

export default Home;
