import moveEmployee from '../moveEmployee'
import normalizedTree from '../mockData/perfectTreeResult'
import moveResult from '../mockData/treeMoveResult'

describe('moveEmployee function', () => {
  it('should exists and its a function', () => {
    expect(moveEmployee).not.toBeFalsy()
    expect(moveEmployee).toBeInstanceOf(Function)
  })

  it('should throw an error if no parameter is passed', () => {
    expect(() => {
      moveEmployee()
    }).toThrow()
  })

  it('should move an employee from its supervisor to new supervisor', () => {
    const result = moveEmployee(
      'Nick',
      'Sophie',
      'Jonas',
      normalizedTree
    )

    expect(result).toEqual(moveResult)
  })
})