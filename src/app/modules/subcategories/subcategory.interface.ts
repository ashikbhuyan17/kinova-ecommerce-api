import { Types } from 'mongoose'

export interface ISubCategory {
  _id?: Types.ObjectId
  category: Types.ObjectId | string // Reference to Category
  slug: string
  name: string
  image?: string | null // Base64 encoded image
  description?: string | null
  createdAt?: Date
  updatedAt?: Date
}
