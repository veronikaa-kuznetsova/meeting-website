export interface IUser {
  _id: number
  name: string
  email: string
  password: string
  profession: object
  sex: string
  avatar: string
}

export interface IComment {
  _id: string
  content: string
  created_at: string
  updatedAt?: string
  userId: string
  pageId: string
}

export interface IOptions {
  name: string
  value: string
}
