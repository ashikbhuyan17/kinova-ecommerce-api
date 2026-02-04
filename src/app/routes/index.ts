import express from 'express'
const router = express.Router()
import userRoute from '../modules/users/user.route'
import blogRoute from '../modules/blogs/blog.route'
import categoryRoute from '../modules/categories/category.route'
import subCategoryRoute from '../modules/subcategories/subcategory.route'

const appRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/blog',
    route: blogRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/subcategory',
    route: subCategoryRoute,
  },
]

appRoutes.forEach(route => router.use(route.path, route.route))

export default router
