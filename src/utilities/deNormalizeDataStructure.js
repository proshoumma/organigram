/**
 * recursive call for denormazlising the data structure
 * @param {string} currentEmployeeId current id of the tree node
 * @param {object} employeeList list of normalized employee object
 * @param {object} supervisorRef reference to supervisor of current node
 */
const denormalize = (currentEmployeeId, employeeList, supervisorRef = {}) => {
  const position = employeeList[currentEmployeeId].position
  const subordinates = Object.keys(employeeList[currentEmployeeId].employees)
  
  // structure the employee object
  const employeeObj = {
    [currentEmployeeId]: {
      position,
      employees: subordinates.map((eachSubordinateId) => {
        // recursive call for denormalizing the subordinates
        return denormalize(
          eachSubordinateId,
          employeeList,
          employeeObj
        )
      })
    }
  }

  // supervisor refence to current node
  supervisorRef = employeeObj
  
  return supervisorRef
}

/**
 * de-normalize the data structure of employee list
 * for exporting or making api calls
 * @param {object} employeeListObj normalized employee list object from redux store
 */
const deNormalizeDataStructure = (employeeListObj) => {
  const treeRootId = Object.keys(employeeListObj)[0]
  const denormalizedData = denormalize(treeRootId,employeeListObj)

  return denormalizedData
}

export default deNormalizeDataStructure