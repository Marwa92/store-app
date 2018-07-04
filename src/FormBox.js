import React from 'react';
import { Form } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import BE from './BE';

class FormBox extends React.Component {

  constructor(props) {
  super(props);
  this.state = { value: '',
  collections: []
};

  this.handleChange = this.handleChange.bind(this);
  this.addCollection = this.addCollection.bind(this);
  this.chooseCollection = this.chooseCollection.bind(this);
}

async componentDidMount() {
  const collections = await BE.getCollection();
  console.log('collections from db:', collections);
  this.setState({ collections });
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

addCollection(e, { value }) {
  this.setState({
    collections: [{ text: value, value }, ...this.state.collections],
  });
}

chooseCollection(e, { value }){
   this.setState({ currentValue: value });
 };

  render(){
     const { currentValue, collections } = this.state;
     // const CollectionsList = collections.map((collection, index) => (
     // //   return(<option key={collection.id} value={collection.name}>{collection.name}</option>)
    return (
      <div>
        <Dropdown
          options={this.state.collections}
          placeholder='Add new list'
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
        <Form.Input  placeholder="Enter task" required value={this.state.value} onChange={this.handleChange} />
          <Form.Button primary content="Add"/>
          </Form.Group>
        </Form>
      </div>
    );
  }

}

export default FormBox;
