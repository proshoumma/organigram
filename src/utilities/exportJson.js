import deNormalizeDataStructure from './deNormalizeDataStructure'

/**
 * convert and export the employee tree to user's local machine
 * @param {object} employeeObjList nomalized employee object list from redux-store
 */
const exportJson = (employeeObjList) => {
  // de-normalize the data first
  const deNormalizedData = deNormalizeDataStructure(employeeObjList)

  // perform download operation
  const a = document.createElement('a')
  const file = new Blob([JSON.stringify(deNormalizedData)], { type: 'application/json' })
  a.href = URL.createObjectURL(file)
  a.download = 'organigram'
  a.click()
}

export default exportJson