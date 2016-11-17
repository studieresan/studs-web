import { createSelector } from 'reselect';

/**
 * Direct selector to the user state domain
 */
const selectUserDomain = () => (state) => state.get('user');

/**
 * Other specific selectors
 */


/**
 * Default selector used by User
 */

const selectUser = () => createSelector(
  selectUserDomain(),
  (substate) => substate.toJS()
);

export default selectUser;
export {
  selectUserDomain,
};
