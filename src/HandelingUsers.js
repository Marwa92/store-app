import React from 'react';
import {
  Dropdown,
  Grid,
} from 'semantic-ui-react';
import ColorPicker from './ColorPicker';
import BE from './BE';

class UsersControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.addUser = this.addUser.bind(this);
  }

  async componentDidMount() {
    const { usersList } = this.props;
    console.log('users id in async,', usersList);
    const { users } = this.state;
    const userId = Number(this.props.match.params.userId) ?
      Number(this.props.match.params.userId) : 0;

    console.log('users from usersList state:', users);
    this.setState({
      users: users.concat(usersList),
      currentValue: userId,
    });
    this.props.displayUserTasks(userId);
  }

  async addUser(e, { value }) {
    const { users } = this.state;
    const { color } = this.props;
    console.log('CHECK user name, ', value);
    console.log('users color:', users);
    console.log('New user value:', value);
    const addUser = await BE.postUser(value, color);
    console.log('new user, id, name, ', addUser);
    this.setState({
      users: users.concat(addUser),
    });
    e.preventDefault();
    console.log('usersList in add user, ', addUser);
  }


  render() {
    const { color, selectedUser, userId } = this.props;
    console.log('selectedUser for user render:', selectedUser);
    console.log('color from props:', color);
    const { usersList } = this.props;
    console.log('users options:', usersList);
    return (
      <div>
        <Grid columns={2}>
          <Grid.Column>
            {selectedUser ? (
              <ColorPicker className="Element" color={this.props.color} selectedUser={this.props.selectedUser} handleChange={this.props.handleChange} />
            ) : (
              <ColorPicker className="Element" color={this.props.color} handleChange={this.props.handleChange} />
            )}
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              options={usersList}
              placeholder="Add new User"
              search
              selection
              fluid
              allowAdditions
              value={userId}
              onAddItem={this.addUser}
              onChange={this.props.chooseUser}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default UsersControl;
