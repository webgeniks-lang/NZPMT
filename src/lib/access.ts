import type { Access } from 'payload'

const isAdmin = (user: any) => user?.role === 'admin'
const isEditor = (user: any) => user?.role === 'editor' || user?.role === 'admin'

export const adminOnly: Access = ({ req: { user } }) => isAdmin(user)

export const editorOrAdmin: Access = ({ req: { user } }) => isEditor(user)

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isAdmin(user)) return true
  return { id: { equals: user.id } }
}
