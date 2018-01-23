export const hasEventPermission = user =>
  user && user.permissions && user.permissions.includes('events_permission')
