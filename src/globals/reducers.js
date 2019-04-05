import { UPDATE_EMPLOYEE_DATA } from './constants'

export const defaultState = {
  employeeData: {}
}

/**
 * global reducer for handling any global state requirement
 * @param {object} state current state of the global reducer
 * @param {object} action performed action object
 */
const globalAppReducer = (state = defaultState, action) => {
  switch(action.type) {
    case UPDATE_EMPLOYEE_DATA: {
      return {
        ...state,
        employeeData: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export default globalAppReducer