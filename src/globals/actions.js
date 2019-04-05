import { UPDATE_EMPLOYEE_DATA } from './constants'

/**
 * update employee list action
 * @param {object} data employee list object (normalized)
 */
export const updateEmployeeData = (data) => ({
  type: UPDATE_EMPLOYEE_DATA,
  payload: data,
})