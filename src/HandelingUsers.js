import React from 'react';
import {
  Dropdown,
  Button,
  Grid,
} from 'semantic-ui-react';
import ColorPicker from './ColorPicker';
import BE from './BE';

class UsersControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      users: [],
      selectedUser: null,
      // color: 'orange',
    };
    this.addUser = this.addUser.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
    // this.showColorPicker = this.showColorPicker.bind(this);
  }

  async componentDidMount() {
    const { usersList } = this.props;
    console.log('users id in async,', usersList);
    //  const options = collectionsList.map(({ id, name }) => ({ value: id, text: name }));
    const { users } = this.state;
    // const userId = Number(this.props.match.params.userId) ?
    //   Number(this.props.match.params.userId) : 0;====> handle user routing

    console.log('users from usersList state:', users);
    this.setState({
      users: users.concat(usersList),
      // currentValue: userId,====> handle user routing
    //  userId: userId,
    });
  }

  async addUser(e, { value }) {
    const { users } = this.state;
    console.log('CHECK user name, ', value);
    console.log('users color:', users);
    console.log('New user value:', value);
    const addUser = await BE.postUser(value);
    console.log('new user, id, name, ', addUser);
    this.setState({
    //  usersList: [{ text: value, value: addUser.id }, ...this.state.usersList],
      users: users.concat(addUser),
    });
    e.preventDefault();
    console.log('usersList in add user, ', addUser);
  }

  chooseUser(e, { value }) {
    // const color = this.state;
    const { usersList } = this.props;
    const { usersmenu } = this.props;
    console.log('users in choose usersList ,', usersList);
    console.log('users in choose usersmenu ,', usersmenu);
    console.log('id ,', value);

    let selectedUser = null;

    usersList.forEach((user) => {
      if (user.value === value) {
        selectedUser = user;
      }
    });

    this.setState({
      selectedUser,
    });

    console.log('currentvalue for user:', selectedUser);
    // console.log('color for user:', color);
    // this.props.displayUserTasks(value);====> handle user routing
  }

//   showColorPicker(e) {
//       return  <ColorPicker />;
// }

  render() {
    const { currentValue, selectedUser } = this.state;
    // console.log('users on usersList render:', this.props.users);
    const { color } = this.props;
    console.log('color from props:', color);
    const { usersList } = this.props;
    console.log('users options:', usersList);
    return (
      <div>
        <Grid columns={2}>
          <Grid.Column>
            {selectedUser ? (
              <ColorPicker className="Element" color={this.state.selectedUser.label.color} selectedUser={this.state.selectedUser} />
            ) : (
              <ColorPicker className="Element" color={color} />
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
              value={currentValue}
              onAddItem={this.addUser}
              onChange={this.chooseUser}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default UsersControl;
