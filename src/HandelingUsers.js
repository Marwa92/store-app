import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import BE from './BE';

class UsersControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      users: [],
      currentValue: 0,
    };
    this.addUser = this.addUser.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
  }

  async componentDidMount() {
    const { usersList } = this.props;
    console.log('users id in async,', usersList);
    //  const options = collectionsList.map(({ id, name }) => ({ value: id, text: name }));
    const { users } = this.state;

    console.log('users from usersList state:', users);
    this.setState({
      users: users.concat(usersList),
    //  userId: userId,
    });
  }

  async addUser(e, { value }) {
    const { users } = this.state;
    console.log('CHECK user id, ', value);
    console.log('users in component:', users);
    console.log('New user value:', value);
    const addUser = await BE.postUser(value);
    console.log('addUser id, ', addUser);
    this.setState({
    //  usersList: [{ text: value, value: addUser.id }, ...this.state.usersList],
      users: users.concat(addUser),
    });
    console.log('usersList in add user, ', users);
    e.preventDefault();
  }

  chooseUser(e, { value }) {
    console.log('value ,', value);
    this.setState({ currentValue: value });
  // this.props.displayTasks(value);
  }

  render() {
    const { currentValue } = this.state;
    // console.log('users on usersList render:', this.props.users);
    console.log('current value check:', currentValue);
    const { usersList } = this.props;
    console.log('users options:', usersList);
    return (
      <div>
        <Dropdown
          options={usersList}
          placeholder="Add new User"
          search
          selection
          fluid
          allowAdditions
          value={currentValue}
          onAddItem={this.addUser}
          onChange={this.chooseUser}
        />
      </div>
    );
  }
}
export default UsersControl;
