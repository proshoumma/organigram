import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import normalizeDataStructure from '../../utilities/normalizeDataStructure'
import { updateEmployeeData } from '../../globals/actions'
import './styles.css'

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  hanldleFileInput(rawData) {
    const { updateEmployeeData } = this.props

    // using FileReader to read the raw data
    const fileReader = new FileReader()
    
    fileReader.onload = (event) => {
      try {
        // parse the json data
        const employeeData = JSON.parse(event.target.result)

        // normalize the data for better performance and data validation
        const normalizedData = normalizeDataStructure(employeeData)

        // update redux state with the employee data
        updateEmployeeData(normalizedData)

        // push to organigram screen
        this.props.router.push('organigram_view')
      } catch(error) {
        this.setState({ error: error.message })
      }
    }

    fileReader.readAsText(rawData)
  }

  handleFileDrop(files) {
    // first item in the files array is the file
    // since we defined multiple to false
    if (files[0]) this.hanldleFileInput(files[0])
  }

  render() {
    const { error } = this.state

    return (
      <div className="homeContainer">
        <Dropzone
          className="contentBox"
          activeClassName="activeFileType"
          rejectClassName="rejectFileType"
          accept="application/json"
          disableClick={true}
          multiple={false}
          onDrop={this.handleFileDrop.bind(this)}
        >
          <div className="info">
            <span>Hi <b>Personia</b>, drop a JSON file here</span><br />
            <span>To view the organigram</span>
          </div>

          <div className="logo">
            organigram
          </div>

          <input
            type="file"
            accept=".json"
            id="file"
            name="file"
            className="fileInput"
            onChange={(event) => {
              event.preventDefault()
              this.hanldleFileInput(event.target.files[0])
            }}
          />
          <label
            htmlFor="file"
            className="inputLabel"
          >
            or, browse a file from computer
          </label>
        </Dropzone>

        <div className="errorMessage">
          { error }
        </div>
      </div>
    )
  }
}

HomeView.propTypes = {
  updateEmployeeData: propTypes.func,
  router: propTypes.object,
}

export default connect(
  null,
  (dispatch) => ({
    updateEmployeeData: (data) => {
      dispatch(updateEmployeeData(data))
    }
  })
)(HomeView)
