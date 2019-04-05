import React, { Component } from 'react'
import propTypes from 'prop-types'

import DragContainer from './DragContainer'
import DropContainer from './DropContainer'
import arrowIcon from './assets/arrow.svg'
import './styles.css'

class EmployeeNode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  renderCollapseIcon() {
    const { collapsed } = this.state
    const { subordinates } = this.props

    // check if the employee have any subordinates
    if (subordinates.length === 0) return null

    return (
      <div
        className={`collapseIconContainer ${ collapsed && 'collapsed'}`}
        onClick={() => { this.setState({ collapsed: !collapsed }) }}
      >
        <img className="collapseIcon" src={arrowIcon} />
      </div>
    )
  }

  render() {
    const {
      name,
      position,
      supervisor,
      moveEmployee,
      subordinates,
    } = this.props

    return (
      <div className="employeeNodeContainer">
        <div className="employeeNodeRow">
          { this.renderCollapseIcon() }

          <DropContainer
            className="dropContainer"
            employeeInfo={{ name }}
            dropAction={(
              draggedEmployeeId,
              supervisorId,
              droppedEmployeeId
            ) => {
              moveEmployee (
                draggedEmployeeId,
                supervisorId,
                droppedEmployeeId
              )
            }}
          >
            <DragContainer
              className="employeeInfoContainer"
              employeeInfo={{ name, supervisor }}
            >
              <div className="employeeName">{ name }</div>
              <div className="employeePosition">{ position }</div>
            </DragContainer>
          </DropContainer>
        </div>

        <div className="employeeSubordinatesContainer">
          { !this.state.collapsed && subordinates }
        </div>
      </div>
    )
  }
}

EmployeeNode.propTypes = {
  name: propTypes.string,
  position: propTypes.string,
  supervisor: propTypes.string,
  subordinates: propTypes.any,
  moveEmployee: propTypes.func,
  connectDragSource: propTypes.func
}

export default EmployeeNode