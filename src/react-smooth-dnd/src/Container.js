import React, { Component } from 'react';
import PropTypes from 'prop-types';
import container from 'smooth-dnd';
import { dropHandlers } from 'smooth-dnd';
import Draggable from './Draggable';

class Container extends Component {
  constructor(props) {
    super(props);
    this.getContainerOptions = this.getContainerOptions.bind(this);
    this.dropHandler = dropHandlers.reactDropHandler();
  }

  componentDidMount() {
    this.container = container(this.containerDiv, this.getContainerOptions(this.props));
  }

  componentWillUnmount() {
    this.container.dispose();
    this.container = null;
  }

  getChildContext() {
    return {
      orientation: this.props.orientation
    }
  }

  render() {
    return (
      <div style={this.props.style} ref={element => { this.containerDiv = element; }}>
        {this.props.children}
      </div>
    );
  }

  getContainerOptions(props) {
    return Object.assign({}, props, {
      dropHandler: this.dropHandler.handler
    });
  }
}

Container.propTypes = {
  behaviour: PropTypes.oneOf(['move', 'copy']),
  groupName: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  //children: PropTypes.arrayOf(PropTypes.oneOfType([Draggable, Container])),
  style: PropTypes.object,
  dragHandleSelector: PropTypes.string,
  dragBeginDelay: PropTypes.number,
  animationDuration: PropTypes.number,
  getChildPayload: PropTypes.func,
  dragClass: PropTypes.string
};

Container.defaultProps = {
  behaviour: 'move',
  orientation: 'vertical'
}

Container.childContextTypes = {
  orientation: PropTypes.string
};

export default Container;