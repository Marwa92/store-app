import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class UserTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      users: [],
      currentValue: 0,
    };

    this.chooseUser = this.chooseUser.bind(this);
  }

  async componentDidMount() {
    const { usersList } = this.props;
    console.log('users id in async,', usersList);
    const { users } = this.state;

    console.log('users from usersList state:', users);
    this.setState({
      users: users.concat(usersList),

    });
  }


  chooseUser(e, { value }) {
    console.log('value ,', value);
    this.setState({ currentValue: value });
  }

  render() {
    const { currentValue } = this.state;
    console.log('current value check:', currentValue);
    const { usersList } = this.props;
    console.log('users assign options:', usersList);
    return (
      <div>
        <Dropdown
          options={usersList}
          placeholder="Assign to user"
          search
          selection
          fluid
          value={currentValue}
          onChange={this.chooseUser}
        />

      </div>
    );
  }
}

export default UserTask;
