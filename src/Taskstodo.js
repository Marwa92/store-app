import React from 'react';
import { Form } from 'semantic-ui-react';

class TasksTodo extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
  value: '',
};

  this.handleChange = this.handleChange.bind(this);
}



handleChange(event) {
    this.setState({ value: event.target.value });
    // handle change in Add button
  }

resetValue(e) {
  const { value } = this.state;
  this.setState({
    value: '',
  });
  this.props.handleSubmit(value, e); // handle submit for add button
}


  render(){
     const currentValue=this.props.currentValue;
     console.log('check collectionid,', currentValue);

    return (
      <div>
        <Form onSubmit={(e) => this.resetValue(e)} style={{paddingBottom:"20px 0px 0px 0px", margin:"auto", width:"22%"}}>
        <Form.Group>
        <Form.Input  placeholder="Enter task" required value={this.state.value} onChange={this.handleChange} disabled={currentValue === 0}/>
          <Form.Button primary content="Add" disabled={currentValue === 0}/>
          </Form.Group>
        </Form>
      </div>
    );
  }

}

export default TasksTodo;
