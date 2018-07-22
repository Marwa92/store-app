import React from 'react';
import reactCSS from 'reactcss';
// import { BlockPicker } from 'react-color';
import { SketchPicker } from 'react-color';
import { Button } from 'semantic-ui-react';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    // const{color}= this.props;
    this.state = {
      displayColorPicker: false,
      color: props.color,
      //  color: {
      //   r: '241',
      //   g: '112',
      //   b: '19',
      //   a: '1',
      // },

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    const { displayColorPicker } = this.state;
    this.setState({ displayColorPicker: !displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color, event) {
    console.log('On handleChange color:', color);
    console.log('handleChange event:', event);
    this.setState({ color: color.rgb });
    // console.log('rgb colors in state:', this.state.color);
  }


  render() {
    // const popover = {
    //   position: 'absolute',
    //   zIndex: '2',
    // }
    // const cover = {
    //   position: 'fixed',
    //   top: '0px',
    //   right: '0px',
    //   bottom: '0px',
    //   left: '0px',
    // }

    const { selectedUser } = this.props;
    const { color, displayColorPicker } = this.state;
    const styles = reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    console.log('color in color picker props:', color);
    console.log('selectedUser in ColorPicker:', selectedUser);
    return (
      <div>
        <Button onClick={this.handleClick} color={color}>
          choose user color
        </Button>
        { displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker color={color} onChange={this.handleChange} />
          </div>
        ) : null }
      </div>
    );
  }
}

export default ColorPicker;
