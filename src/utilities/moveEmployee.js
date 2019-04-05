/**
 * move operation for drag and dropped employee objects
 * @param {string} sourceId source/dragged employee id
 * @param {string} sourceSupervisorId source/dragged employee's supervisor id
 * @param {string} destinationId destination/dropped employee id
 * @param {object} employeeListObj normalized employee list object from redux-store
 */
const moveEmployee = (
  sourceId,
  sourceSupervisorId,
  destinationId,
  employeeListObj
) => {
  // define a new employee list object
  const newEmployeeList = employeeListObj
  
  // remove the employee from its current supervisor
  delete newEmployeeList[sourceSupervisorId].employees[sourceId]

  // add the employee to its new supervisor
  newEmployeeList[destinationId].employees[sourceId] = true

  // return the new list
  return newEmployeeList
}

export default moveEmployee