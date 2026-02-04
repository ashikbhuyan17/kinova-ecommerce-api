import { Request, Response } from 'express'
import {
  createSubCategoryService,
  getAllSubCategoriesService,
  getSubCategoryByIdService,
  getSubCategoryBySlugService,
  getSubCategoriesByCategoryIdService,
  updateSubCategoryService,
  deleteSubCategoryService,
  PaginationOptions,
} from './subcategory.services'
import { sendRes } from '../../../utilities/sendRes'
import { tryCatch } from '../../../utilities/tryCatch'
import status from 'http-status'

/**
 * Create SubCategory Controller
 * Requires authentication (auth middleware) and admin role
 */
export const createSubCategory = tryCatch(async (req: Request, res: Response) => {
  const result = await createSubCategoryService(req.body)

  sendRes(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'SubCategory created successfully',
    result: result,
  })
})

/**
 * Get All SubCategories Controller
 * Public endpoint - no authentication required
 * Supports pagination and filtering by category
 */
export const getAllSubCategories = tryCatch(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const category = req.query.category as string | undefined

  const options: PaginationOptions = {
    page,
    limit,
    category,
  }

  const result = await getAllSubCategoriesService(options)

  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'SubCategories retrieved successfully',
    result: result,
  })
})

/**
 * Get SubCategories by Category ID Controller
 * Public endpoint
 */
export const getSubCategoriesByCategoryId = tryCatch(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const options: PaginationOptions = {
      page,
      limit,
    }

    const result = await getSubCategoriesByCategoryIdService(categoryId, options)

    sendRes(res, {
      statusCode: status.OK,
      success: true,
      message: 'SubCategories retrieved successfully',
      result: result,
    })
  },
)

/**
 * Get SubCategory by ID Controller
 * Public endpoint
 */
export const getSubCategoryById = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await getSubCategoryByIdService(id)

  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'SubCategory retrieved successfully',
    result: result,
  })
})

/**
 * Get SubCategory by Slug Controller
 * Public endpoint
 */
export const getSubCategoryBySlug = tryCatch(async (req: Request, res: Response) => {
  const { slug } = req.params
  const categoryId = req.query.category as string | undefined

  const result = await getSubCategoryBySlugService(slug, categoryId)

  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'SubCategory retrieved successfully',
    result: result,
  })
})

/**
 * Update SubCategory Controller
 * Requires authentication (admin role)
 */
export const updateSubCategory = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await updateSubCategoryService(id, req.body)

  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'SubCategory updated successfully',
    result: result,
  })
})

/**
 * Delete SubCategory Controller
 * Requires authentication (admin role)
 */
export const deleteSubCategory = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params

  await deleteSubCategoryService(id)

  sendRes(res, {
    statusCode: status.OK,
    success: true,
    message: 'SubCategory deleted successfully',
    result: null,
  })
})
