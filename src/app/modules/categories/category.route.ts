import express from 'express'
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
} from './category.controller'
import reqValidate from '../../../middleware/reqValidate'
import {
  createCategoryZod,
  updateCategoryZod,
  getCategoryByIdZod,
  paginationZod,
} from './category.validation'
import { auth } from '../../../middleware/auth'
import { admin } from '../../../middleware/admin'

const router = express.Router()

// Public routes (no authentication required)
router.get('/', reqValidate(paginationZod), getAllCategories) // Get all categories
router.get('/slug/:slug', getCategoryBySlug) // Get category by slug
router.get('/:id', reqValidate(getCategoryByIdZod), getCategoryById) // Get single category by ID

// Protected routes (require authentication and admin role)
router.post('/', auth, admin, reqValidate(createCategoryZod), createCategory) // Create category
router.patch('/:id', auth, admin, reqValidate(updateCategoryZod), updateCategory) // Update category
router.delete('/:id', auth, admin, reqValidate(getCategoryByIdZod), deleteCategory) // Delete category

export default router
