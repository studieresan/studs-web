import { createSelector } from 'reselect'

const selectEventsDomain = () => state => state.get('events')

const selectUser = () => state => state.getIn(['global', 'user'])

const selectEvents = () =>
  createSelector([selectEventsDomain(), selectUser()], (events, user) => ({
    events: events,
    user: user ? user.toJS() : null,
  }))

export default selectEvents
export { selectEventsDomain }
