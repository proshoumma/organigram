import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import propTypes from 'prop-types'

class DropContainer extends Component {
  render() {
    const {
      children,
      className,
      isOver,
      connectDropTarget
    } = this.props

    return connectDropTarget (
      <div className={`${className} ${isOver && 'dropBackground'}`}>
        { children }
      </div>
    )
  }
}

DropContainer.propTypes = {
  employeeInfo: propTypes.object,
  className: propTypes.string,
  children: propTypes.any,
  isOver: propTypes.bool,
  dropAction: propTypes.func,
  connectDropTarget: propTypes.func
}

export default DropTarget (
  // type of item that can be dropped
  'EmployeeNode',
  {
    // when item is dropped on a target
    drop: (props, monitor) => {
      // get what is dropped
      const item = monitor.getItem()
      
      // call the drop action
      props.dropAction(
        item.name,
        item.supervisor,
        props.employeeInfo.name
      )
    }
  },
  // props to include in the component
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
)(DropContainer)
  