"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.getCategoryBySlugService = exports.getCategoryByIdService = exports.getAllCategoriesService = exports.createCategoryService = void 0;
const category_model_1 = require("./category.model");
const http_status_1 = __importDefault(require("http-status"));
const slugify_1 = __importDefault(require("slugify"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
/**
 * Create Category Service
 * Only logged-in users can create categories (admin only typically)
 */
const createCategoryService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Generate slug from name if not provided
    const slug = data.slug || (0, slugify_1.default)(data.name, { lower: true, strict: true, trim: true });
    // Check if slug already exists
    const existingCategory = yield category_model_1.Category.findOne({ slug });
    if (existingCategory) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Category with this slug already exists');
    }
    const categoryData = Object.assign(Object.assign({}, data), { slug, image: (_a = data.image) !== null && _a !== void 0 ? _a : null, description: (_b = data.description) !== null && _b !== void 0 ? _b : null });
    const result = yield category_model_1.Category.create(categoryData);
    return result.toObject();
});
exports.createCategoryService = createCategoryService;
/**
 * Get All Categories Service
 * Supports pagination
 */
const getAllCategoriesService = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = options;
    const skip = (page - 1) * limit;
    const [categories, total] = yield Promise.all([
        category_model_1.Category.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        category_model_1.Category.countDocuments({}),
    ]);
    return {
        data: categories,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
});
exports.getAllCategoriesService = getAllCategoriesService;
/**
 * Get Single Category by ID Service
 */
const getCategoryByIdService = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.Category.findById(categoryId).lean();
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    return category;
});
exports.getCategoryByIdService = getCategoryByIdService;
/**
 * Get Category by Slug Service
 */
const getCategoryBySlugService = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.Category.findOne({ slug }).lean();
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    return category;
});
exports.getCategoryBySlugService = getCategoryBySlugService;
/**
 * Update Category Service
 * Admin can update
 */
const updateCategoryService = (categoryId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.Category.findById(categoryId);
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    // If name is updated and slug is not provided, regenerate slug
    if (updateData.name && !updateData.slug) {
        updateData.slug = (0, slugify_1.default)(updateData.name, { lower: true, strict: true, trim: true });
    }
    // If slug is provided, format it
    if (updateData.slug) {
        updateData.slug = (0, slugify_1.default)(updateData.slug, { lower: true, strict: true, trim: true });
    }
    // Check if new slug conflicts with existing category
    if (updateData.slug && updateData.slug !== category.slug) {
        const existingCategory = yield category_model_1.Category.findOne({ slug: updateData.slug });
        if (existingCategory) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Category with this slug already exists');
        }
    }
    // Update fields
    Object.assign(category, updateData);
    // Save
    yield category.save();
    return category.toObject();
});
exports.updateCategoryService = updateCategoryService;
/**
 * Delete Category Service
 * Admin can delete
 */
const deleteCategoryService = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.Category.findById(categoryId);
    if (!category) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    // Hard delete
    yield category_model_1.Category.findByIdAndDelete(categoryId);
});
exports.deleteCategoryService = deleteCategoryService;
