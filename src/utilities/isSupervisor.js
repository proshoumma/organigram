/**
 * recursive function to check if currect node match with target employee
 * if its matched, it means that the source employee is a supervisor or
 * a great-supervisor of the target employee 
 * 
 * @param {string} sourceId employee id
 * @param {string} targetId id of the employee where the moved employee will included
 * @param {object} employeeList nomalized employee object
 * @param {Array} matchArray array saving the result of the check
 */
const checkSupervisor = (
  sourceId,
  targetId,
  employeeList,
  matchArray = []
) => {
  // check if current node id matches target id
  if (sourceId === targetId) matchArray.push(true)
  else matchArray.push(false)

  // map over the subordinates
  const subordinates = Object.keys(employeeList[sourceId].employees)
  subordinates.map(each => {
    checkSupervisor(each, targetId, employeeList, matchArray)
  })

  return matchArray
}

/**
 * check if the source/dragged employee is a supervisor or
 * great supervisor of the targed/dropeed employee
 * 
 * @param {string} sourceId id of the employee that is dragged
 * @param {string} targetId id of the employee where the source will get included
 * @param {object} employeeList nomalized employee list object
 */
const isSupervisor = (sourceId, targetId, employeeList) => {
  let result = false
  
  const checkArray = checkSupervisor(sourceId, targetId, employeeList)
  checkArray.map((eachCheck) => {
    if (eachCheck === true) result = true
  })

  return result
}

export default isSupervisor