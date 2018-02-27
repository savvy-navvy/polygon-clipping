/* eslint-env jest */

jest.mock('../src/clean-input')
const cleanInput = require('../src/clean-input')
const operation = require('../src/operation')
const doIt = require('../src')

afterEach(() => {
  cleanInput.closeAllRings.mockClear()
  cleanInput.errorOnSelfIntersectingRings.mockClear()
  cleanInput.forceMultiPoly.mockClear()
})

describe('doIt calls the right stuff', () => {
  test('closeAllRings() called correctly', () => {
    const mp1 = [[[[0, 0], [2, 0], [0, 2], [0, 0]]]]
    const mp2 = [[[[0, 0], [1, 0], [0, 1], [0, 0]]]]
    const mp3 = [[[[0, 0], [1, 0], [0, 1], [0, 0]]]]

    doIt(operation.types.UNION, mp1, mp2, mp3)
    expect(cleanInput.closeAllRings).toHaveBeenCalledTimes(3)
    expect(cleanInput.closeAllRings).toHaveBeenCalledWith(mp1)
    expect(cleanInput.closeAllRings).toHaveBeenCalledWith(mp2)
    expect(cleanInput.closeAllRings).toHaveBeenCalledWith(mp3)
  })

  test('forceMultiPoly() called correctly', () => {
    const mp1 = [[[[0, 0], [2, 0], [0, 2], [0, 0]]]]
    const mp2 = [[[[0, 0], [1, 0], [0, 1], [0, 0]]]]
    const mp3 = [[[[0, 0], [1, 0], [0, 1], [0, 0]]]]

    doIt(operation.types.UNION, mp1, mp2, mp3)
    expect(cleanInput.forceMultiPoly).toHaveBeenCalledTimes(3)
    expect(cleanInput.forceMultiPoly).toHaveBeenCalledWith(mp1)
    expect(cleanInput.forceMultiPoly).toHaveBeenCalledWith(mp2)
    expect(cleanInput.forceMultiPoly).toHaveBeenCalledWith(mp3)
  })

  test('errorOnSelfIntersectingRings() called', () => {
    const mp1 = [[[[0, 0], [2, 0], [0, 2], [0, 0]]]]
    const mp2 = [[[[0, 0], [1, 0], [0, 1], [0, 0]]]]
    const mp3 = [[[[0, 0], [1, 0], [0, 1], [0, 0]]]]

    doIt(operation.types.UNION, mp1, mp2, mp3)
    expect(cleanInput.errorOnSelfIntersectingRings).toHaveBeenCalledTimes(1)
  })
})
