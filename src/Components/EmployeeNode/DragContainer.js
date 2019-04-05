import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import propTypes from 'prop-types'

class DragContainer extends Component {
  render() {
    const {
      children,
      className,
      connectDragSource
    } = this.props

    return connectDragSource (
      <div className={className}>
        { children }
      </div>
    )
  }
}

DragContainer.propTypes = {
  employeeInfo: propTypes.object,
  className: propTypes.string,
  children: propTypes.any,
  connectDragSource: propTypes.func
}

export default DragSource (
  // item type of the dragged item
  'EmployeeNode',
  {
    // return employeeInfo for drop target to
    // catch this data for any drop action
    beginDrag: (props) => ({
      ...props.employeeInfo
    })
  },
  // props to pass down to the component
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(DragContainer)
  