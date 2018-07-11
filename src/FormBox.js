import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import BE from './BE';

class FormBox extends React.Component {

  constructor(props) {
  super(props);
  this.state = { value: '',
  collections: [{value: 0, text: "All"}],
  currentValue: 0,
};

  this.handleChange = this.handleChange.bind(this);
  this.addCollection = this.addCollection.bind(this);
  this.chooseCollection = this.chooseCollection.bind(this);
}

async componentDidMount() {
  const collectionsList = await BE.getCollection();
  const options= collectionsList.map(({id, name}) => ({value:id , text:name
 }));
 const { collections }=this.state;
  console.log('collections from db:', collections);
  this.setState({ collections: collections.concat(options) });
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

async addCollection(e, { value }) {

  const { collections } = this.state;
  console.log('collections:', collections);
  console.log('New collection value:', value);
  const addCollection = await BE.postCollection(value);
  console.log('addcolection id, ' , addCollection);
  this.setState({
    // collections: [{ text: value, value: addCollection.id }, ...this.state.collections],
    collections: collections.concat(addCollection),
  });
  console.log ("collections test, ", collections );
  e.preventDefault();
}

chooseCollection(e, { value }){
  console.log('value ,', value);
   this.setState({ currentValue: value });
   this.props.displayTasks(value);
 };

  render(){
     const { currentValue, collections } = this.state;


    return (
      <div>

        <Dropdown
          options={collections}
          placeholder='Add new collection'
          search
          selection
          fluid
          allowAdditions
          value={currentValue}
          onAddItem={this.addCollection}
          onChange={this.chooseCollection}
        />



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

export default FormBox;
