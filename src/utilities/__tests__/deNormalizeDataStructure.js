import deNormalizeDataStructure from '../deNormalizeDataStructure'
import perfectTreeResult from '../mockData/perfectTreeResult'
import perfectTreeDeNormalized from '../mockData/perfectTreeDeNormalized'

describe('deNormalizeDataStructure function', () => {
  it('should exists and its a function', () => {
    expect(deNormalizeDataStructure).not.toBeFalsy()
    expect(deNormalizeDataStructure).toBeInstanceOf(Function)
  })

  it('should throw an error when no parameter is passed', () => {
    expect(() => { deNormalizeDataStructure() }).toThrow()
  })

  it('should denomalize a normalized employee structrue', () => {
    const result = deNormalizeDataStructure(perfectTreeResult)
    expect(result).toEqual(perfectTreeDeNormalized)
  })
})