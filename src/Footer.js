import React from 'react';
class Footer extends React.Component {
  constructor(props) {
  super(props);
  this.state = {value: ''};

  this.handleChange = this.handleChange.bind(this);

}

handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.handleSubmit(this.state.value, e)}>
          <input placeholder="Enter task" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Add" className='Button'/>
      </form>
    );
  }
}


export default Footer;
