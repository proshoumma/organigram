import normalizeDataStructure from '../normalizeDataStructure'
import perfectTreeResult from '../mockData/perfectTreeResult'
import perfectTreeDeNormalized from '../mockData/perfectTreeDeNormalized'
import treeWithInvalidStructure from '../mockData/treeWithInvalidStructure'
import treeWithALoop from '../mockData/treeWithALoop'
import treeWithMultipleRoot from '../mockData/treeWithMultipleRoot'

describe('normalizeDataStructure function', () => {
  it('should exists and its a function', () => {
    expect(normalizeDataStructure).not.toBeFalsy()
    expect(normalizeDataStructure).toBeInstanceOf(Function)
  })

  it('should throw an error if nothing is passed', () => {
    expect(() => { normalizeDataStructure() }).toThrow()
  })

  it('should normalize a perfectly structured tree', () => {
    const result = normalizeDataStructure(perfectTreeDeNormalized)
    expect(result).toEqual(perfectTreeResult)
  })

  it('should throw an error for a tree with invalid structure', () => {
    expect(() => {
      normalizeDataStructure(treeWithInvalidStructure)
    }).toThrow()
  })

  it('should throw an error for a tree with a loop employee object', () => {
    expect(() => {
      normalizeDataStructure(treeWithALoop)
    }).toThrow()
  })

  it('should throw an error for a tree with multiple root employees', () => {
    expect(() => {
      normalizeDataStructure(treeWithMultipleRoot)
    }).toThrow()
  })
})