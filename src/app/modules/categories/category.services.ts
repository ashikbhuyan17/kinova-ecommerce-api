import { Types } from 'mongoose'
import { ICategory } from './category.interface'
import { Category } from './category.model'
import status from 'http-status'
import slugify from 'slugify'
import ApiError from '../../../errors/ApiError'

// Pagination interface
export interface PaginationOptions {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Create Category Service
 * Only logged-in users can create categories (admin only typically)
 */
export const createCategoryService = async (
  data: Omit<ICategory, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<ICategory> => {
  // Generate slug from name if not provided
  const slug =
    data.slug || slugify(data.name, { lower: true, strict: true, trim: true })

  // Check if slug already exists
  const existingCategory = await Category.findOne({ slug })
  if (existingCategory) {
    throw new ApiError(
      status.CONFLICT,
      'Category with this slug already exists',
    )
  }

  const categoryData: ICategory = {
    ...data,
    slug,
    image: data.image ?? null,
    description: data.description ?? null,
  }

  const result = await Category.create(categoryData)
  return result.toObject()
}

/**
 * Get All Categories Service
 * Supports pagination
 */
export const getAllCategoriesService = async (
  options: PaginationOptions,
): Promise<PaginatedResult<ICategory>> => {
  const { page, limit } = options
  const skip = (page - 1) * limit

  const [categories, total] = await Promise.all([
    Category.find({}).sort({ createdAt: 1 }).skip(skip).limit(limit).lean(),
    Category.countDocuments({}),
  ])

  return {
    data: categories,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

/**
 * Get Single Category by ID Service
 */
export const getCategoryByIdService = async (
  categoryId: string,
): Promise<ICategory | null> => {
  const category = await Category.findById(categoryId).lean()

  if (!category) {
    throw new ApiError(status.NOT_FOUND, 'Category not found')
  }

  return category
}

/**
 * Get Category by Slug Service
 */
export const getCategoryBySlugService = async (
  slug: string,
): Promise<ICategory | null> => {
  const category = await Category.findOne({ slug }).lean()

  if (!category) {
    throw new ApiError(status.NOT_FOUND, 'Category not found')
  }

  return category
}

/**
 * Update Category Service
 * Admin can update
 */
export const updateCategoryService = async (
  categoryId: string,
  updateData: Partial<Omit<ICategory, '_id' | 'createdAt'>>,
): Promise<ICategory> => {
  const category = await Category.findById(categoryId)

  if (!category) {
    throw new ApiError(status.NOT_FOUND, 'Category not found')
  }

  // If name is updated and slug is not provided, regenerate slug
  if (updateData.name && !updateData.slug) {
    updateData.slug = slugify(updateData.name, {
      lower: true,
      strict: true,
      trim: true,
    })
  }

  // If slug is provided, format it
  if (updateData.slug) {
    updateData.slug = slugify(updateData.slug, {
      lower: true,
      strict: true,
      trim: true,
    })
  }

  // Check if new slug conflicts with existing category
  if (updateData.slug && updateData.slug !== category.slug) {
    const existingCategory = await Category.findOne({ slug: updateData.slug })
    if (existingCategory) {
      throw new ApiError(
        status.CONFLICT,
        'Category with this slug already exists',
      )
    }
  }

  // Update fields
  Object.assign(category, updateData)

  // Save
  await category.save()

  return category.toObject()
}

/**
 * Delete Category Service
 * Admin can delete
 */
export const deleteCategoryService = async (
  categoryId: string,
): Promise<void> => {
  const category = await Category.findById(categoryId)

  if (!category) {
    throw new ApiError(status.NOT_FOUND, 'Category not found')
  }

  // Hard delete
  await Category.findByIdAndDelete(categoryId)
}
