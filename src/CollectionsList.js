import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import BE from './BE';

class CollectionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      collections: [],
      currentValue: 0,
    };
    this.addCollection = this.addCollection.bind(this);
    this.chooseCollection = this.chooseCollection.bind(this);
  }

  async componentDidMount() {
    const { collectionsList } = this.props;
    console.log('collectionList in async,', collectionsList);
    // const options = collectionsList.map(({ id, name }) => ({ value: id, text: name }));
    const { collections } = this.state;
    const collectionId = Number(this.props.match.params.collectionId) ?
      Number(this.props.match.params.collectionId) : 0;
    console.log('check collectionId route,', collectionId);
    console.log('collections from collectionList state:', collectionsList);
    this.setState({
      collections: collections.concat(collectionsList),
      currentValue: collectionId,
    });
    this.props.displayTasks(collectionId);
  }

  async addCollection(e, { value }) {
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
    console.log('collection on collectionList render:', this.props.collectionsList);
    const collections = this.props.collectionsList;
    console.log('options:', collections);
    return (
      <div>
        <Dropdown
          options={collections}
          placeholder="Add new collection"
          search
          selection
          fluid
          allowAdditions
          value={currentValue}
          onAddItem={this.addCollection}
          onChange={this.chooseCollection}
        />
      </div>
    );
  }
}

export default CollectionsList;
