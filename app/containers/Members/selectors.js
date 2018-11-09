import { createSelector } from 'reselect'

/**
 * Direct selector to the members state domain
 */
const selectMembersDomain = () => state => state.get('members')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Members
 */

const selectMembers = () =>
  createSelector(selectMembersDomain(), substate => substate.toJS())

export default selectMembers
export { selectMembersDomain }
