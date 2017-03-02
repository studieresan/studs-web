import { createSelector } from 'reselect';

/**
 * Direct selector to the events state domain
 */
const selectEventsDomain = () => (state) => state.get('events');

const selectUser = () => (state) => state.getIn(['global', 'user']);

/**
 * Other specific selectors
 */


/**
 * Default selector used by Events
 */

const selectEvents = () => createSelector(
  [selectEventsDomain(), selectUser()],
  (events, user) => ({
    events: events.toJS(),
    user: user ? user.toJS() : null,
  })
);

export default selectEvents;
export {
  selectEventsDomain,
};
