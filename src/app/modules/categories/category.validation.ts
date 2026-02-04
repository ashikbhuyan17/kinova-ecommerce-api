import { z } from 'zod'
import slugify from 'slugify'

// Base64 image validation helper
const base64ImageRegex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/

// Create category validation schema
export const createCategoryZod = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, 'Name cannot be empty')
      .max(200, 'Name cannot exceed 200 characters')
      .trim(),
    slug: z
      .string()
      .min(1, 'Slug cannot be empty')
      .max(200, 'Slug cannot exceed 200 characters')
      .trim()
      .optional()
      .transform(val => {
        // Auto-generate slug from name if not provided
        if (!val) return undefined
        return slugify(val, { lower: true, strict: true, trim: true })
      }),
    image: z
      .string()
      .optional()
      .nullable()
      .refine(
        val => {
          if (!val) return true // Optional field
          if (!base64ImageRegex.test(val)) {
            return false
          }
          const maxBase64Size = 1.4 * 1024 * 1024 // ~1.4MB
          if (val.length > maxBase64Size) {
            return false
          }
          return true
        },
        {
          message:
            'Image must be a valid base64 encoded image (data:image/...;base64,...) and must not exceed 1MB',
        },
      ),
    description: z.string().trim().optional().nullable(),
  }),
})

// Update category validation schema
export const updateCategoryZod = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name cannot be empty')
      .max(200, 'Name cannot exceed 200 characters')
      .trim()
      .optional(),
    slug: z
      .string()
      .min(1, 'Slug cannot be empty')
      .max(200, 'Slug cannot exceed 200 characters')
      .trim()
      .optional()
      .transform(val => {
        if (!val) return undefined
        return slugify(val, { lower: true, strict: true, trim: true })
      }),
    image: z
      .string()
      .optional()
      .nullable()
      .refine(
        val => {
          if (!val) return true
          if (!base64ImageRegex.test(val)) {
            return false
          }
          const maxBase64Size = 1.4 * 1024 * 1024
          if (val.length > maxBase64Size) {
            return false
          }
          return true
        },
        {
          message:
            'Image must be a valid base64 encoded image (data:image/...;base64,...) and must not exceed 1MB',
        },
      ),
    description: z.string().trim().optional().nullable(),
  }),
  params: z.object({
    id: z.string({
      required_error: 'Category ID is required',
    }),
  }),
})

// Get category by ID validation
export const getCategoryByIdZod = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Category ID is required',
    }),
  }),
})

// Pagination query validation
export const paginationZod = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 1))
      .refine(val => val > 0, { message: 'Page must be greater than 0' }),
    limit: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 10))
      .refine(val => val > 0 && val <= 100, {
        message: 'Limit must be between 1 and 100',
      }),
  }),
})
