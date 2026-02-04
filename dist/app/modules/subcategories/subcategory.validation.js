"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationZod = exports.getSubCategoryByIdZod = exports.updateSubCategoryZod = exports.createSubCategoryZod = void 0;
const zod_1 = require("zod");
const slugify_1 = __importDefault(require("slugify"));
// Base64 image validation helper
const base64ImageRegex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
// Create subcategory validation schema
exports.createSubCategoryZod = zod_1.z.object({
    body: zod_1.z.object({
        category: zod_1.z.string({
            required_error: 'Category is required',
        }),
        name: zod_1.z
            .string({
            required_error: 'Name is required',
        })
            .min(1, 'Name cannot be empty')
            .max(200, 'Name cannot exceed 200 characters')
            .trim(),
        slug: zod_1.z
            .string()
            .min(1, 'Slug cannot be empty')
            .max(200, 'Slug cannot exceed 200 characters')
            .trim()
            .optional()
            .transform(val => {
            if (!val)
                return undefined;
            return (0, slugify_1.default)(val, { lower: true, strict: true, trim: true });
        }),
        image: zod_1.z
            .string()
            .optional()
            .nullable()
            .refine(val => {
            if (!val)
                return true;
            if (!base64ImageRegex.test(val)) {
                return false;
            }
            const maxBase64Size = 1.4 * 1024 * 1024;
            if (val.length > maxBase64Size) {
                return false;
            }
            return true;
        }, {
            message: 'Image must be a valid base64 encoded image (data:image/...;base64,...) and must not exceed 1MB',
        }),
        description: zod_1.z.string().trim().optional().nullable(),
    }),
});
// Update subcategory validation schema
exports.updateSubCategoryZod = zod_1.z.object({
    body: zod_1.z.object({
        category_id: zod_1.z.string().optional(),
        name: zod_1.z
            .string()
            .min(1, 'Name cannot be empty')
            .max(200, 'Name cannot exceed 200 characters')
            .trim()
            .optional(),
        slug: zod_1.z
            .string()
            .min(1, 'Slug cannot be empty')
            .max(200, 'Slug cannot exceed 200 characters')
            .trim()
            .optional()
            .transform(val => {
            if (!val)
                return undefined;
            return (0, slugify_1.default)(val, { lower: true, strict: true, trim: true });
        }),
        image: zod_1.z
            .string()
            .optional()
            .nullable()
            .refine(val => {
            if (!val)
                return true;
            if (!base64ImageRegex.test(val)) {
                return false;
            }
            const maxBase64Size = 1.4 * 1024 * 1024;
            if (val.length > maxBase64Size) {
                return false;
            }
            return true;
        }, {
            message: 'Image must be a valid base64 encoded image (data:image/...;base64,...) and must not exceed 1MB',
        }),
        description: zod_1.z.string().trim().optional().nullable(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'SubCategory ID is required',
        }),
    }),
});
// Get subcategory by ID validation
exports.getSubCategoryByIdZod = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: 'SubCategory ID is required',
        }),
    }),
});
// Pagination query validation
exports.paginationZod = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z
            .string()
            .optional()
            .transform(val => (val ? parseInt(val, 10) : 1))
            .refine(val => val > 0, { message: 'Page must be greater than 0' }),
        limit: zod_1.z
            .string()
            .optional()
            .transform(val => (val ? parseInt(val, 10) : 10))
            .refine(val => val > 0 && val <= 100, {
            message: 'Limit must be between 1 and 100',
        }),
        category: zod_1.z.string().optional(), // Filter by category
    }),
});
