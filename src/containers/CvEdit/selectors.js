import { createSelector } from 'reselect'

/**
 * Direct selector to the cvEdit state domain
 */
const selectCvEditDomain = () => (state) => state.get('cvEdit')

/**
 * Other specific selectors
 */


/**
 * Default selector used by CvEdit
 */

const selectCvEdit = () => createSelector(
  selectCvEditDomain(),
  (substate) => substate.toJS()
)

export default selectCvEdit
export {
  selectCvEditDomain,
}
