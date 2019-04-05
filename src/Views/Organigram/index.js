import React, { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import EmployeeNode from '../../Components/EmployeeNode'
import isSupervisor from '../../utilities/isSupervisor'
import moveEmployee from '../../utilities/moveEmployee'
import exportJson from '../../utilities/exportJson'
import { updateEmployeeData } from '../../globals/actions'
import './styles.css'

const DEFAULT_MESSAGE = 'You can drag and drop employees to re-arrange the structure'

class OrganigramView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: DEFAULT_MESSAGE,
    }
  }

  handleBackPress() {
    const { router } = this.props
    router.goBack()
  }

  handleMoveEmployee (
    draggedEmployeeId,
    dragSupervisorId,
    droppedEmployeeId
  ) {
    const {
      employeeData,
      updateEmployeeData
    } = this.props

    // check if the dragged employee is supervisor
    // or great-supervisor 😁 of the dropeed employee
    const supervisor = isSupervisor (
      draggedEmployeeId,
      droppedEmployeeId,
      employeeData
    )

    if (supervisor) {
      this.setState({
        message: `Sorry, ${draggedEmployeeId} cannot be on ${droppedEmployeeId}'s team.`
      })
    } else {
      // perfom move operation
      const newEmployeeData = moveEmployee (
        draggedEmployeeId,
        dragSupervisorId,
        droppedEmployeeId,
        employeeData
      )

      // save new data to store
      updateEmployeeData(newEmployeeData)

      // give user some insight
      this.setState({
        message:  `${draggedEmployeeId} successfully joined ${droppedEmployeeId}'s team`
      })
    }
  }

  renderTree (
    currentEmployeeId,
    employeeData,
    supervisorId
  ) {
    const {
      name,
      position,
    } = employeeData[currentEmployeeId]
    
    // get all subordinates for current employee to map over them
    const subordinates = Object.keys(
      employeeData[currentEmployeeId].employees
    )

    return (
      <EmployeeNode
        key={currentEmployeeId}
        name={name}
        position={position}
        supervisor={supervisorId}
        subordinates={
          subordinates.map(eachEmployeeId => {
            return this.renderTree (
              eachEmployeeId,
              employeeData,
              currentEmployeeId
            )
          })
        }
        moveEmployee={(
          draggedEmployeeId,
          draggedEmployeeSupervisorId,
          droppedEmployeeId
        ) => {
          this.handleMoveEmployee (
            draggedEmployeeId,
            draggedEmployeeSupervisorId,
            droppedEmployeeId
          )
        }}
      />
    )
  }

  render() {
    const { message } = this.state
    const { employeeData } = this.props
    const firstEmployeeId = Object.keys(employeeData)[0]

    return (
      <div className="organigramViewContainer">
        <div className="topBar">
          <div className="topBarLogo">organigram</div>
          <div className="navContainer">
            <div
              className="navButton"
              onClick={() => { this.handleBackPress() }}
            >
              Home
            </div>
            <div
              className="navButton"
              onClick={() => { exportJson(employeeData) }}
            >
              Export
            </div>
          </div>
        </div>

        <div className="treeContainerBox">
          <div className="messageBox">
            { message }
          </div>

          <div className="treeContainer">
            { !firstEmployeeId && (
              <span className="noData">
                No JSON data available, please go back to Home screen and upload a valid json file.
              </span>
            ) }

            { firstEmployeeId && this.renderTree (
              firstEmployeeId,
              employeeData
            ) }
          </div>
        </div>
      </div>
    )
  }
}

OrganigramView.propTypes = {
  employeeData: propTypes.object,
  updateEmployeeData: propTypes.func,
  router: propTypes.object,
}

// enable drag and drop for the current view
const enableDND = DragDropContext(HTML5Backend)(OrganigramView)

export default connect (
  (state) => ({
    employeeData: state.global.employeeData
  }),
  (dispatch) => ({
    updateEmployeeData: (data) => {
      dispatch(updateEmployeeData(data))
    }
  })
)(enableDND)