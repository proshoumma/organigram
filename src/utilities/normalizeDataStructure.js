/**
 * recursive function to nomalize the data structure
 * @param {object} dataTree current node of the data tree
 * @param {object} newStructure new data structure
 */
const normalizeData = (dataTree, newStructure) => {
  const currentTreeRootId = Object.keys(dataTree)[0]
  const currentTreeRoot = dataTree[currentTreeRootId]

  // validate the object structure
  if (
    !currentTreeRootId ||
    !dataTree[currentTreeRootId].position
  ) {
    throw Error(
      'Sorry, the structure of the JSON file is not valid.'
    )
  }

  // check if the employee already in the list
  if (newStructure[currentTreeRootId]) {
    throw Error(
      `Sorry, employee ${currentTreeRootId} is in multiple places in the JSON file.`
    )
  }
  
  // new structure for each employee
  newStructure[currentTreeRootId] = {
    name: currentTreeRootId,
    position: currentTreeRoot.position,
    employees: {}
  }

  // check if current employee have any subordinate
  if (currentTreeRoot.employees) {
    currentTreeRoot.employees.map(eachEmployee => {
      const employeeId = Object.keys(eachEmployee)[0]
      newStructure[currentTreeRootId].employees[employeeId] = true

      // recursive call with the new node of the tree
      normalizeData(eachEmployee, newStructure)
    })
  }

  return newStructure
}

/**
 * normalize the employee structure for better managing organigram
 * and better performance with O(1) complexity when drag and dropped
 * @param {object} employeeRawObject raw parsed json employee object
 */
const normalizeDataStructure = (employeeRawObject = {}) => {
  const rootLenght = Object.keys(employeeRawObject).length
  
  // check if the there is multiple root element in the tree
  if (rootLenght > 1) {
    throw Error(
      'Sorry, the JSON contains multiple core supervisors.'
    )
  }

  return normalizeData(employeeRawObject, {})
}

export default normalizeDataStructure