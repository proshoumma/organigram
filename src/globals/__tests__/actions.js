import { UPDATE_EMPLOYEE_DATA } from '../constants'
import * as actionTypes from '../actions'

describe('global actions', () => {
  it('should provide an action to update employee data', () => {
    const expectedAction = {
      type: UPDATE_EMPLOYEE_DATA,
      payload: {}
    }

    expect(actionTypes.updateEmployeeData({})).toEqual(expectedAction)
  })
})