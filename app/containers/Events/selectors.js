import { createSelector } from 'reselect'

const selectEventsDomain = () => state => state.get('events')

const selectUser = () => state => state.getIn(['global', 'user'])

const selectCompanyUsers = () => state =>
  state.getIn(['members', 'companyUsers'])

const selectEvents = () =>
  createSelector(
    [selectCompanyUsers(), selectEventsDomain(), selectUser()],
    (companyUsers, events, user) => ({
      events: events.toJS(),
      user: user ? user.toJS() : null,
      companyUsers: companyUsers.toJS(),
    })
  )

export default selectEvents
export { selectEventsDomain }
