import isSupervisor from '../isSupervisor'
import normalizedTree from '../mockData/perfectTreeResult'

describe('isSupervisor function', () => {
  it('should exists and its a function', () => {
    expect(isSupervisor).not.toBeFalsy()
    expect(isSupervisor).toBeInstanceOf(Function)
  })
  
  it('should throw error if no parameter is passed', () => {
    expect(() => {
      isSupervisor()
    }).toThrow()
  })

  it('should return true if a dragged employee is supervisor of dropped employee', () => {
    const result = isSupervisor(
      'Jonas',
      'Sophie',
      normalizedTree
    )

    expect(result).toBe(true)
  })

  it('should return false if a dragged employee is not a supervisor of dropped employee', () => {
    const result = isSupervisor(
      'Nick',
      'Jonas',
      normalizedTree
    )

    expect(result).toBe(false)
  })

  it('should return true if a dragged employee is a great-supervisor of dropped employee', () => {
    const result = isSupervisor(
      'Jonas',
      'Barbara',
      normalizedTree
    )

    expect(result).toBe(true)
  })
})