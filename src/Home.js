import React, { Component } from 'react';
import './App.css';
import { Table, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import BE from './BE';
import UsersRoute from './UsersRouting'
import UserTask from './UserTask'
import CollectionsRoute from './Routing';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isToggleOff: true,
      collectionId: 0,
      color: 'rgb(230, 184, 0)',
      userId: 0,
      collections: [],
      usersList: [],
      selectedUser: null,
      value: '',
    };
    this.addTask = this.addTask.bind(this);
    this.doTask = this.doTask.bind(this);
    this.toDo = this.toDo.bind(this);
    this.displayTasks = this.displayTasks.bind(this);
    this.accessUser = this.accessUser.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
    this.rgbColor = this.rgbColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeUserColor = this.changeUserColor.bind(this);
    this.displayUserTasks = this.displayUserTasks.bind(this);
  }

  // collectionsList = response
  async componentDidMount() {
    const tasks = await BE.getTasks();
    console.log('tasks from db:', tasks);
    // ({tasks})=> ({tasks(defined in state as array): tasks(defined from DB)})
    const collectionsList = await BE.getCollection();
    console.log('collectionsList, ', collectionsList);
    const users = await BE.getUsers();
    console.log('users from db:', users)
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
        label: { style: { backgroundColor: color } },
        as: Link,
      },
    ];
    users.forEach((user) => {
      const usr = {
        text: user.name,
        value: user.id,
        label: { style: { backgroundColor: user.color } },
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

  displayUserTasks(userId) {
    console.log('check for display,', userId);
    this.setState({ userId });
  }

  accessUser(tasks, users) {
    const tasksUser = tasks;
    for (let j = 0; j < tasksUser.length; j += 1) {
      if (tasksUser[j].user) {
        for (let i = 0; i < users.length; i += 1) {
          console.log('users id before if condition:', users[i]);
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

  chooseUser(e, { value }) {
    const { usersList } = this.state;
    const { users } = this.state;
    const { color } = this.state;
    console.log('users in choose usersList ,', usersList);
    console.log('users in choose ,', users);
    console.log('id ,', value);

    let selectedUser = null;

    usersList.forEach((user) => {
      if (user.value === value) {
        selectedUser = user;
        console.log('check value: ', value);
      }
    });

    this.setState({
      selectedUser,
    });
    { selectedUser ?
      this.changeUserColor(selectedUser.label.style.backgroundColor)
      : this.changeUserColor(color)
    }
// console.log('selectedUser color for user susersListetState:', selectedUser.label.style.backgroundColor);
    console.log('selectedUser for user setState:', selectedUser);
   this.displayUserTasks(value);
  }

  rgbColor(color) {
    const { r, g, b } = color;
    this.setState({ color });
    return `rgb(${r},${g},${b})`;
}

  async handleChange(color, event) {
    const { selectedUser, users } = this.state;
    if (selectedUser) {
      selectedUser.label.style.backgroundColor = this.rgbColor(color.rgb);
      await BE.updateUserColor(selectedUser.value, selectedUser.label.style.backgroundColor);
    }
    users.forEach((user, index) => {
      if (users[index].id === selectedUser.value) {
        users[index].color = color.rgb;
      }

      console.log('selectedUser id in parent :', selectedUser);
      console.log('Users in parent :', users);
      console.log('users id in loop :', user.id);
      console.log('users color in loop :', user.color);
      console.log('selectedUser color:', selectedUser.label.style.backgroundColor);
      console.log('users color:', color);
    });


    console.log('users on handleChange:', users.id);
    console.log('On handleChange color:', color);
    console.log('handleChange event:', event);
    this.setState({
      color: color.rgb,
      users,
    });
    console.log('user after loop:', users);
    console.log('color after loop:', this.rgbColor(color.rgb));
  }

  changeUserColor(color) {
    this.setState({ color });
  }


  render() {
    const {
      tasks,
      isToggleOff,
      collectionId,
      userId,
      collections,
      usersList,
      users,
    } = this.state;

    console.log('collectionscheck, ', collections);
    console.log('tasks, ', tasks);
    console.log('users from parent,', users);
    console.log('users from parent,', usersList);
    const TasksList = tasks.map((task, index) => (
      (((collectionId === task.collection || collectionId === 0)
      && (userId === task.user || userId === 0))
      && (isToggleOff || (!isToggleOff && !tasks[index].completed))) ? (
        // {'we shouldnot replace (indecolor: colorx) with (tasks.id) '}
        <Table.Row key={task.id}>
          <Table.Cell>
            { task.title }
          </Table.Cell>
          <Table.Cell>
            <Label style={{ backgroundColor: task.userColor }} horizontal>
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
                <UsersRoute
                  className="Element"
                  usersList={this.state.usersList}
                  color={this.state.color}
                  userId={this.state.userId}
                  selectedUser={this.state.selectedUser}
                  chooseUser={this.chooseUser}
                  handleChange={this.handleChange}
                  changeUserColor={this.changeUserColor}
                  displayUserTasks={this.displayUserTasks}
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
