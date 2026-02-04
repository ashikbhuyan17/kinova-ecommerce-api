/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: |
 *       Register a new user account. UserType must be "reserveit" to register.
 *       Password will be automatically hashed using bcrypt.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserRequest'
 *           example:
 *             name: "John Doe"
 *             phone: "01234567890"
 *             password: "password123"
 *             role: "admin"
 *             userType: "reserveit"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/User'
 *             example:
 *               statusCode: 201
 *               success: true
 *               message: "User registered successfully"
 *               result:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 id: "00001"
 *                 name: "John Doe"
 *                 phone: "01234567890"
 *                 role: "admin"
 *                 userType: "reserveit"
 *                 createdAt: "2026-01-14T10:00:00.000Z"
 *                 updatedAt: "2026-01-14T10:00:00.000Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: UserType must be "reserveit"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: User already exists with this phone number
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: |
 *       Authenticate user and receive JWT token.
 *       Only users with userType "reserveit" can login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             phone: "01234567890"
 *             password: "password123"
 *             userType: "reserveit"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               statusCode: 200
 *               success: true
 *               message: "User logged in successfully"
 *               result:
 *                 accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   _id: "507f1f77bcf86cd799439011"
 *                   id: "00001"
 *                   name: "John Doe"
 *                   phone: "01234567890"
 *                   role: "admin"
 *                   userType: "reserveit"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Access denied. Only users with userType "reserveit" can login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get current user profile
 *     description: Get the authenticated user's profile information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /user/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all users (Admin only)
 *     description: |
 *       Retrieve a paginated list of all users.
 *       Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/PaginatedUsers'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin privileges required
 */

/**
 * @swagger
 * /user/admin/users/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get user by ID (Admin only)
 *     description: Retrieve a specific user by their ID. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User MongoDB ObjectId
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin privileges required
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /user/admin/users/{id}:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Update user (Admin only)
 *     description: |
 *       Update a user's information (name, phone, role).
 *       Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *           example:
 *             name: "Updated Name"
 *             role: "admin"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin privileges required
 *       404:
 *         description: User not found
 *       409:
 *         description: Phone number already exists for another user
 */

/**
 * @swagger
 * /user/admin/users/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete user (Admin only)
 *     description: Delete a user account. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User MongoDB ObjectId
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       type: null
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin privileges required
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /blog:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Create a new blog
 *     description: |
 *       Create a new blog post. Requires authentication.
 *       Only the authenticated user can create blogs.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBlogRequest'
 *           example:
 *             title: "My First Blog Post"
 *             description: "This is the content of my blog post..."
 *             status: "draft"
 *             category: "News"
 *             image: "data:image/png;base64,iVBORw0KGgoAAAANS..."
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Must be logged in
 */

/**
 * @swagger
 * /blog:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get all published blogs
 *     description: |
 *       Retrieve a paginated list of published blogs.
 *       Public endpoint - no authentication required.
 *       Can filter by status and category.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published]
 *           default: published
 *         description: Filter by blog status
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Featured, Announcement, Event, Reminder, News, Alert, Notification]
 *         description: Filter by blog category
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/PaginatedBlogs'
 *             example:
 *               statusCode: 200
 *               success: true
 *               message: "Published blogs retrieved successfully"
 *               result:
 *                 data:
 *                   - _id: "507f1f77bcf86cd799439011"
 *                     title: "My First Blog Post"
 *                     description: "This is the content..."
 *                     status: "published"
 *                     category: "News"
 *                     author:
 *                       _id: "507f191e810c19729de860ea"
 *                       id: "00001"
 *                       name: "John Doe"
 *                       phone: "01234567890"
 *                     publishedAt: "2026-01-14T10:00:00.000Z"
 *                     createdAt: "2026-01-14T10:00:00.000Z"
 *                     updatedAt: "2026-01-14T10:00:00.000Z"
 *                 total: 25
 *                 page: 1
 *                 limit: 10
 *                 totalPages: 3
 */

/**
 * @swagger
 * /blog/my/blogs:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get my blogs
 *     description: |
 *       Retrieve all blogs created by the authenticated user.
 *       Supports pagination and filtering by status and category.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published]
 *         description: Filter by blog status
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Featured, Announcement, Event, Reminder, News, Alert, Notification]
 *         description: Filter by blog category
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/PaginatedBlogs'
 *       401:
 *         description: Unauthorized - Must be logged in
 */

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get blog by ID
 *     description: |
 *       Retrieve a single blog by its ID.
 *       Published blogs are publicly accessible.
 *       Draft blogs can only be viewed by their author (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog MongoDB ObjectId
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/Blog'
 *       403:
 *         description: Forbidden - You do not have permission to view this blog
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /blog/{id}:
 *   patch:
 *     tags:
 *       - Blog
 *     summary: Update blog
 *     description: |
 *       Update a blog post. Only the blog owner or admin can update.
 *       Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBlogRequest'
 *           example:
 *             title: "Updated Blog Title"
 *             status: "published"
 *             category: "Featured"
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Must be logged in
 *       403:
 *         description: Forbidden - You do not have permission to update this blog
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     tags:
 *       - Blog
 *     summary: Delete blog
 *     description: |
 *       Delete a blog post. Only the blog owner or admin can delete.
 *       Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       type: null
 *       401:
 *         description: Unauthorized - Must be logged in
 *       403:
 *         description: Forbidden - You do not have permission to delete this blog
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create a new category
 *     description: |
 *       Create a new category. Requires authentication and admin role.
 *       Slug is auto-generated from name if not provided.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *           example:
 *             {
 *               "name": "Electronics",
 *               "slug": "electronics",
 *               "description": "Electronic products and gadgets",
 *               "image": "data:image/png;base64,iVBORw0KGgoAAAANS..."
 *             }
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Must be logged in
 *       403:
 *         description: Forbidden - Admin privileges required
 *       409:
 *         description: Category with this slug already exists
 */

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories
 *     description: |
 *       Retrieve a paginated list of all categories.
 *       Public endpoint - no authentication required.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/PaginatedCategories'
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by ID
 *     description: Retrieve a single category by its ID. Public endpoint.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /category/slug/{slug}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by slug
 *     description: Retrieve a single category by its slug. Public endpoint.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Category slug
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     tags:
 *       - Category
 *     summary: Update category
 *     description: |
 *       Update a category. Requires authentication and admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryRequest'
 *           example:
 *             {
 *               "name": "Updated Electronics",
 *               "slug": "updated-electronics",
 *               "description": "Updated description",
 *               "image": null
 *             }
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin privileges required
 *       404:
 *         description: Category not found
 *       409:
 *         description: Category with this slug already exists
 */

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Delete category
 *     description: |
 *       Delete a category. Requires authentication and admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       type: null
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin privileges required
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /subcategory:
 *   post:
 *     tags:
 *       - SubCategory
 *     summary: Create a new subcategory
 *     description: |
 *       Create a new subcategory. Requires authentication and admin role.
 *       Slug is auto-generated from name if not provided.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubCategoryRequest'
 *           example:
 *             {
 *               "category": "507f1f77bcf86cd799439011",
 *               "name": "Smartphones",
 *               "slug": "smartphones",
 *               "description": "Smartphones and mobile devices",
 *               "image": "data:image/png;base64,iVBORw0KGgoAAAANS..."
 *             }
 *     responses:
 *       201:
 *         description: SubCategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Must be logged in
 *       403:
 *         description: Forbidden - Admin privileges required
 *       404:
 *         description: Category not found
 *       409:
 *         description: SubCategory with this slug already exists in this category
 */

/**
 * @swagger
 * /subcategory:
 *   get:
 *     tags:
 *       - SubCategory
 *     summary: Get all subcategories
 *     description: |
 *       Retrieve a paginated list of all subcategories.
 *       Public endpoint - no authentication required.
 *       Can filter by category.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *     responses:
 *       200:
 *         description: SubCategories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/PaginatedSubCategories'
 */

/**
 * @swagger
 * /subcategory/category/{categoryId}:
 *   get:
 *     tags:
 *       - SubCategory
 *     summary: Get subcategories by category ID
 *     description: Retrieve all subcategories for a specific category. Public endpoint.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category MongoDB ObjectId
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: SubCategories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/PaginatedSubCategories'
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /subcategory/{id}:
 *   get:
 *     tags:
 *       - SubCategory
 *     summary: Get subcategory by ID
 *     description: Retrieve a single subcategory by its ID. Public endpoint.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: SubCategory MongoDB ObjectId
 *     responses:
 *       200:
 *         description: SubCategory retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: SubCategory not found
 */

/**
 * @swagger
 * /subcategory/slug/{slug}:
 *   get:
 *     tags:
 *       - SubCategory
 *     summary: Get subcategory by slug
 *     description: Retrieve a single subcategory by its slug. Public endpoint. Optionally filter by category.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: SubCategory slug
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Optional category ID filter
 *     responses:
 *       200:
 *         description: SubCategory retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: SubCategory not found
 */

/**
 * @swagger
 * /subcategory/{id}:
 *   patch:
 *     tags:
 *       - SubCategory
 *     summary: Update subcategory
 *     description: |
 *       Update a subcategory. Requires authentication and admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: SubCategory MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSubCategoryRequest'
 *           example:
 *             {
 *               "category": "507f1f77bcf86cd799439011",
 *               "name": "Updated Smartphones",
 *               "slug": "updated-smartphones",
 *               "description": "Updated description",
 *               "image": null
 *             }
 *     responses:
 *       200:
 *         description: SubCategory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin privileges required
 *       404:
 *         description: SubCategory or Category not found
 *       409:
 *         description: SubCategory with this slug already exists in this category
 */

/**
 * @swagger
 * /subcategory/{id}:
 *   delete:
 *     tags:
 *       - SubCategory
 *     summary: Delete subcategory
 *     description: |
 *       Delete a subcategory. Requires authentication and admin role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: SubCategory MongoDB ObjectId
 *     responses:
 *       200:
 *         description: SubCategory deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     result:
 *                       type: null
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin privileges required
 *       404:
 *         description: SubCategory not found
 */
