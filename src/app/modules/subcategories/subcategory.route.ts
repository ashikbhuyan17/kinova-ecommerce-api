import express from 'express'
import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoryBySlug,
  getSubCategoriesByCategoryId,
  updateSubCategory,
  deleteSubCategory,
} from './subcategory.controller'
import reqValidate from '../../../middleware/reqValidate'
import {
  createSubCategoryZod,
  updateSubCategoryZod,
  getSubCategoryByIdZod,
  paginationZod,
} from './subcategory.validation'
import { auth } from '../../../middleware/auth'
import { admin } from '../../../middleware/admin'

const router = express.Router()

// Public routes (no authentication required)
router.get('/', reqValidate(paginationZod), getAllSubCategories) // Get all subcategories
router.get('/category/:categoryId', reqValidate(paginationZod), getSubCategoriesByCategoryId) // Get subcategories by category ID
router.get('/slug/:slug', getSubCategoryBySlug) // Get subcategory by slug
router.get('/:id', reqValidate(getSubCategoryByIdZod), getSubCategoryById) // Get single subcategory by ID

// Protected routes (require authentication and admin role)
router.post('/', auth, admin, reqValidate(createSubCategoryZod), createSubCategory) // Create subcategory
router.patch('/:id', auth, admin, reqValidate(updateSubCategoryZod), updateSubCategory) // Update subcategory
router.delete('/:id', auth, admin, reqValidate(getSubCategoryByIdZod), deleteSubCategory) // Delete subcategory

export default router
