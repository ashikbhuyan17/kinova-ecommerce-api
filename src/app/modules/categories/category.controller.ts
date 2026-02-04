import { Request, Response } from 'express'
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  getCategoryBySlugService,
  updateCategoryService,
  deleteCategoryService,
  PaginationOptions,
} from './category.services'
import { sendRes } from '../../../utilities/sendRes'
import { tryCatch } from '../../../utilities/tryCatch'
import status from 'http-status'

/**
 * Create Category Controller
 * Requires authentication (auth middleware)
 */
export const createCategory = tryCatch(async (req: Request, res: Response) => {
  const result = await createCategoryService(req.body)

  sendRes(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Category created successfully',
    result: result,
  })
})

/**
 * Get All Categories Controller
 * Public endpoint - no authentication required
 * Supports pagination
 */
export const getAllCategories = tryCatch(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const options: PaginationOptions = {
    page,
    limit,
  }

  const result = await getAllCategoriesService(options)

  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'Categories retrieved successfully',
    result: result,
  })
})

/**
 * Get Category by ID Controller
 * Public endpoint
 */
export const getCategoryById = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await getCategoryByIdService(id)

  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category retrieved successfully',
    result: result,
  })
})

/**
 * Get Category by Slug Controller
 * Public endpoint
 */
export const getCategoryBySlug = tryCatch(async (req: Request, res: Response) => {
  const { slug } = req.params

  const result = await getCategoryBySlugService(slug)

  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category retrieved successfully',
    result: result,
  })
})

/**
 * Update Category Controller
 * Requires authentication (admin role)
 */
export const updateCategory = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await updateCategoryService(id, req.body)

  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category updated successfully',
    result: result,
  })
})

/**
 * Delete Category Controller
 * Requires authentication (admin role)
 */
export const deleteCategory = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params

  await deleteCategoryService(id)

  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category deleted successfully',
    result: null,
  })
})
