import React, { Component } from 'react';
import './App.css';
import { Table, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import BE from './BE';
import UsersControl from './HandelingUsers'
import UserTask from './UserTask'
import CollectionsRoute from './Routing';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isToggleOff: true,
      collectionId: 0,
      color: 'yellow',
      userId: 0,
      collections: [],
      usersList: [],
    };
    this.addTask = this.addTask.bind(this);
    this.doTask = this.doTask.bind(this);
    this.toDo = this.toDo.bind(this);
    this.displayTasks = this.displayTasks.bind(this);
    this.accessUser = this.accessUser.bind(this);
  //  this.displayUserTasks = this.displayUserTasks.bind(this);====> handle user routing
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
    const { color } = this.state;

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
    });

    const uitems = [
      {
        text: 'All',
        value: 0,
        to: '/',
        label: { color },
        as: Link,
      },
    ];
    users.forEach((user) => {
      const usr = {
        text: user.name,
        value: user.id,
        label: { color: user.color },
        to: `/u/${user.id}`,
        as: Link,
      };
      uitems.push(usr);
    });
    this.setState({
      usersList: uitems,
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
    this.setState({
      tasks,
    });
  }

  toDo() {
    this.setState(prevState => ({
      isToggleOff: !prevState.isToggleOff,
    }));
  }

  displayTasks(collectionId) {
  //  console.log('check,', collectionId);
    this.setState({ collectionId });
  }

  // displayUserTasks(userId) {
  //   console.log('check for display,', userId);====> handle user routing
  //   this.setState({ userId });
  // }

  accessUser(tasks, users) {
    const tasksUser = tasks;
    for (let j = 0; j < tasksUser.length; j += 1) {
      if (tasksUser[j].user) {
        for (let i = 0; i < users.length; i += 1) {
          console.log('users before if condition:', users);
          console.log('task before if condition:', tasksUser[j]);
          if (tasksUser[j].user === users[i].id) {
            console.log('user on users loop:', users[i]);
            console.log('task on users loop:', tasksUser[j]);
            tasksUser[j].username = users[i].name;
            tasksUser[j].userColor = users[i].color;
            break;
          }
        }
      }
    }
    console.log('tasks after adding user details:', tasksUser);

    this.setState({
      tasks: tasksUser,
      users,
    });
    console.log('user on users test:', users);
  }


  render() {
    const {
      tasks,
      isToggleOff,
      collectionId,
      collections,
      usersList,
      users,
    } = this.state;

    console.log('collectionscheck, ', collections);
    console.log('tasks, ', tasks);
    console.log('users from parent,', users);
    console.log('users from parent,', usersList);
    const TasksList = tasks.map((task, index) => (
      ((collectionId === task.collection || collectionId === 0)
      && (isToggleOff || (!isToggleOff && !tasks[index].completed))) ? (
        // {'we shouldnot replace (index) with (tasks.id) '}
        <Table.Row key={task.id}>
          <Table.Cell>
            { task.title }
          </Table.Cell>
          <Table.Cell>
            <Label color={task.userColor} horizontal>
              {task.username}
            </Label>
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
              <Table.HeaderCell colSpan="1">
                <UsersControl
                  className="Element"
                  usersList={this.state.usersList}
                  usersmenu={this.state.users}
                  color={this.state.color}
                  userId={this.state.usersId}
                  // displayUserTasks={this.displayUserTasks}====> handle user routing
                  // userId={this.state.userId}====> handle user routing
                />
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
