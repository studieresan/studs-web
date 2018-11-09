const EVENTS_PERMISSION = 'events_permission'
const ADMIN_PERMISSION = 'admin_permission'

export const hasEventPermission = user =>
  user &&
  user.permissions &&
  (user.permissions.includes(EVENTS_PERMISSION) || hasAdminPermission(user))

export const hasAdminPermission = user =>
  user && user.permissions && user.permissions.includes(ADMIN_PERMISSION)
