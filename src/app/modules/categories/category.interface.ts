import { Types } from 'mongoose'

export interface ICategory {
  _id?: Types.ObjectId
  slug: string
  name: string
  image?: string | null // Base64 encoded image
  description?: string | null
  createdAt?: Date
  updatedAt?: Date
}
