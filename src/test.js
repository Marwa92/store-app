import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class UsersControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
    };
    this.addUser = this.addUser.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
    }

    async componentDidMount() {
    const { users } = this.props;
    // const options = collectionsList.map(({ id, name }) => ({ value: id, text: name }))
    const { usersList } = this.state;
    const userId = Number(this.props.match.params.userId) ?
      Number(this.props.match.params.userId) : 0;
    console.log('check userId route,', userId);
    console.log('users from usersList state:', users);
    this.setState({
      users: users.concat(usersList),
      currentValue: collectionId,
    });
    this.props.displayUsers(usersId);
    }

    async addUser(e, { value }) {
    const { collections } = this.state;
    console.log('CHECK value, ', value);
    console.log('collections:', collections);
    console.log('New collection value:', value);
    const addCollection = await BE.postCollection(value);
    console.log('addcolection id, ', addCollection);
    this.setState({
      // collections: [{ text: value, value: addCollection.id }, ...this.state.collections],
      collections: collections.concat(addCollection),
    });
    console.log('collections test, ', collections);
    e.preventDefault();
    }

    chooseCollection(e, { value }) {
    console.log('value ,', value);
    this.setState({ currentValue: value });
    this.props.displayTasks(value);
    }

    render() {
    const { currentValue } = this.state;
    console.log('users on usersList render:', this.props.users);
    const usersList = this.props.users;
    return (
      <div>
        <Dropdown
          options={collections}
          placeholder="Add new user"
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

export default UsersControl;
