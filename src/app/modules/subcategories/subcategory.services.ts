import { Types } from 'mongoose'
import { ISubCategory } from './subcategory.interface'
import { SubCategory } from './subcategory.model'
import { Category } from '../categories/category.model'
import { ApiError } from '../../../errorFormating/apiError'
import status from 'http-status'
import slugify from 'slugify'

// Pagination interface
export interface PaginationOptions {
  page: number
  limit: number
  category_id?: string
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Create SubCategory Service
 * Only logged-in users can create subcategories (admin only typically)
 */
export const createSubCategoryService = async (
  data: Omit<ISubCategory, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<ISubCategory> => {
  // Verify category exists
  const category = await Category.findById(data.category_id)
  if (!category) {
    throw new ApiError(status.NOT_FOUND, 'Category not found')
  }

  // Generate slug from name if not provided
  const slug = data.slug || slugify(data.name, { lower: true, strict: true, trim: true })

  // Check if slug already exists for this category
  const existingSubCategory = await SubCategory.findOne({
    slug,
    category_id: data.category_id,
  })
  if (existingSubCategory) {
    throw new ApiError(
      status.CONFLICT,
      'SubCategory with this slug already exists in this category',
    )
  }

  const subCategoryData: ISubCategory = {
    ...data,
    category_id: new Types.ObjectId(data.category_id as string),
    slug,
    image: data.image ?? null,
    description: data.description ?? null,
  }

  const result = await SubCategory.create(subCategoryData)
  await result.populate('category_id', 'name slug _id')
  return result.toObject()
}

/**
 * Get All SubCategories Service
 * Supports pagination and filtering by category_id
 */
export const getAllSubCategoriesService = async (
  options: PaginationOptions,
): Promise<PaginatedResult<ISubCategory>> => {
  const { page, limit, category_id } = options
  const skip = (page - 1) * limit

  // Build filter
  const filter: { category_id?: Types.ObjectId } = {}
  if (category_id) {
    filter.category_id = new Types.ObjectId(category_id)
  }

  const [subCategories, total] = await Promise.all([
    SubCategory.find(filter)
      .populate('category_id', 'name slug _id')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    SubCategory.countDocuments(filter),
  ])

  return {
    data: subCategories,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

/**
 * Get Single SubCategory by ID Service
 */
export const getSubCategoryByIdService = async (
  subCategoryId: string,
): Promise<ISubCategory | null> => {
  const subCategory = await SubCategory.findById(subCategoryId)
    .populate('category_id', 'name slug _id')
    .lean()

  if (!subCategory) {
    throw new ApiError(status.NOT_FOUND, 'SubCategory not found')
  }

  return subCategory
}

/**
 * Get SubCategory by Slug Service
 */
export const getSubCategoryBySlugService = async (
  slug: string,
  categoryId?: string,
): Promise<ISubCategory | null> => {
  const filter: { slug: string; category_id?: Types.ObjectId } = { slug }
  if (categoryId) {
    filter.category_id = new Types.ObjectId(categoryId)
  }

  const subCategory = await SubCategory.findOne(filter)
    .populate('category_id', 'name slug _id')
    .lean()

  if (!subCategory) {
    throw new ApiError(status.NOT_FOUND, 'SubCategory not found')
  }

  return subCategory
}

/**
 * Get SubCategories by Category ID Service
 */
export const getSubCategoriesByCategoryIdService = async (
  categoryId: string,
  options: PaginationOptions,
): Promise<PaginatedResult<ISubCategory>> => {
  const { page, limit } = options
  const skip = (page - 1) * limit

  // Verify category exists
  const category = await Category.findById(categoryId)
  if (!category) {
    throw new ApiError(status.NOT_FOUND, 'Category not found')
  }

  const [subCategories, total] = await Promise.all([
    SubCategory.find({ category_id: new Types.ObjectId(categoryId) })
      .populate('category_id', 'name slug _id')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    SubCategory.countDocuments({ category_id: new Types.ObjectId(categoryId) }),
  ])

  return {
    data: subCategories,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

/**
 * Update SubCategory Service
 * Admin can update
 */
export const updateSubCategoryService = async (
  subCategoryId: string,
  updateData: Partial<Omit<ISubCategory, '_id' | 'createdAt'>>,
): Promise<ISubCategory> => {
  const subCategory = await SubCategory.findById(subCategoryId)

  if (!subCategory) {
    throw new ApiError(status.NOT_FOUND, 'SubCategory not found')
  }

  // If category_id is being updated, verify it exists
  if (updateData.category_id) {
    const category = await Category.findById(updateData.category_id)
    if (!category) {
      throw new ApiError(status.NOT_FOUND, 'Category not found')
    }
    updateData.category_id = new Types.ObjectId(updateData.category_id as string)
  }

  // If name is updated and slug is not provided, regenerate slug
  if (updateData.name && !updateData.slug) {
    updateData.slug = slugify(updateData.name, { lower: true, strict: true, trim: true })
  }

  // If slug is provided, format it
  if (updateData.slug) {
    updateData.slug = slugify(updateData.slug, { lower: true, strict: true, trim: true })
  }

  // Check if new slug conflicts with existing subcategory in the same category
  const categoryIdToCheck = updateData.category_id || subCategory.category_id
  if (updateData.slug && updateData.slug !== subCategory.slug) {
    const existingSubCategory = await SubCategory.findOne({
      slug: updateData.slug,
      category_id: categoryIdToCheck,
      _id: { $ne: subCategoryId },
    })
    if (existingSubCategory) {
      throw new ApiError(
        status.CONFLICT,
        'SubCategory with this slug already exists in this category',
      )
    }
  }

  // Update fields
  Object.assign(subCategory, updateData)

  // Save and populate
  await subCategory.save()
  await subCategory.populate('category_id', 'name slug _id')

  return subCategory.toObject()
}

/**
 * Delete SubCategory Service
 * Admin can delete
 */
export const deleteSubCategoryService = async (subCategoryId: string): Promise<void> => {
  const subCategory = await SubCategory.findById(subCategoryId)

  if (!subCategory) {
    throw new ApiError(status.NOT_FOUND, 'SubCategory not found')
  }

  // Hard delete
  await SubCategory.findByIdAndDelete(subCategoryId)
}
