import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class UserTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.chooseUser = this.chooseUser.bind(this);
  }

  async componentDidMount() {
    const { usersList, users, userId } = this.props;
    console.log('users id in async,', usersList);

    console.log('users in sub:', users);
    this.setState({
    //  users: users.concat(usersList),
      currentValue: userId,
    });
  }


  chooseUser(e, { value }) {
    console.log('value ,', value);
    this.setState({ currentValue: value });
  }

  render() {
    const { currentValue } = this.state;
    console.log('current value check:', currentValue);
    const { usersList, users } = this.props;
    console.log('users assign options:', usersList);
    return (
      <div>
        <Dropdown
          options={users}
          placeholder="Choose user"
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
