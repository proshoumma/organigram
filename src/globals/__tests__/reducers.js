import { UPDATE_EMPLOYEE_DATA } from '../constants'
import globalReducer, { defaultState } from '../reducers'

describe('global reducers', () => {
  it('should return the initial state', () => {
    expect(
      globalReducer(undefined, {})
    ).toEqual(defaultState)
  })

  it(`should handle ${UPDATE_EMPLOYEE_DATA}`, () => {
    const payload = {
      'Nick': {
        name: 'Nick',
        position: 'Lead Engineer',
        employees: {}
      }
    }

    const expectedResult = {
      employeeData: payload
    }

    expect(
      globalReducer({}, {
        type: UPDATE_EMPLOYEE_DATA,
        payload,
      })
    ).toEqual(expectedResult)
  })
})