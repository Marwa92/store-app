// import React from 'react';
// import { BlockPicker } from 'react-color';
//
// class ColorPicker extends React.Component {
//
//   render() {
//     return <BlockPicker />;
//   }
// }
//
// export default ColorPicker;

'use strict'

import React from 'react';
import { BlockPicker } from 'react-color';
import { Button } from 'semantic-ui-react';

class ColorPicker extends React.Component {

   state = {
    displayColorPicker: false,
  };


  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
   this.setState({ color: this.props.color })
 };

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    const{color} = this.props;
    // const{selectedUser} = this.props;
    console.log('color in color picker:', color);
    // console.log('selectedUser in ColorPicker:', selectedUser);
    return (
      <div>
        <div onClick={ this.handleClick } style={{ backgroundColor: {color} }} >choose user color</div>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <BlockPicker color={color} onChange={ this.handleChange }/>
        </div> : null }
      </div>
    )
  }
}

export default ColorPicker
