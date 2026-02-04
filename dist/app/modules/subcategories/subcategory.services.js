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
exports.deleteSubCategoryService = exports.updateSubCategoryService = exports.getSubCategoriesByCategoryIdService = exports.getSubCategoryBySlugService = exports.getSubCategoryByIdService = exports.getAllSubCategoriesService = exports.createSubCategoryService = void 0;
const mongoose_1 = require("mongoose");
const subcategory_model_1 = require("./subcategory.model");
const category_model_1 = require("../categories/category.model");
const apiError_1 = require("../../../errorFormating/apiError");
const http_status_1 = __importDefault(require("http-status"));
const slugify_1 = __importDefault(require("slugify"));
/**
 * Create SubCategory Service
 * Only logged-in users can create subcategories (admin only typically)
 */
const createSubCategoryService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Verify category exists
    const category = yield category_model_1.Category.findById(data.category_id);
    if (!category) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    // Generate slug from name if not provided
    const slug = data.slug || (0, slugify_1.default)(data.name, { lower: true, strict: true, trim: true });
    // Check if slug already exists for this category
    const existingSubCategory = yield subcategory_model_1.SubCategory.findOne({
        slug,
        category_id: data.category_id,
    });
    if (existingSubCategory) {
        throw new apiError_1.ApiError(http_status_1.default.CONFLICT, 'SubCategory with this slug already exists in this category');
    }
    const subCategoryData = Object.assign(Object.assign({}, data), { category_id: new mongoose_1.Types.ObjectId(data.category_id), slug, image: (_a = data.image) !== null && _a !== void 0 ? _a : null, description: (_b = data.description) !== null && _b !== void 0 ? _b : null });
    const result = yield subcategory_model_1.SubCategory.create(subCategoryData);
    yield result.populate('category_id', 'name slug _id');
    return result.toObject();
});
exports.createSubCategoryService = createSubCategoryService;
/**
 * Get All SubCategories Service
 * Supports pagination and filtering by category_id
 */
const getAllSubCategoriesService = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, category_id } = options;
    const skip = (page - 1) * limit;
    // Build filter
    const filter = {};
    if (category_id) {
        filter.category_id = new mongoose_1.Types.ObjectId(category_id);
    }
    const [subCategories, total] = yield Promise.all([
        subcategory_model_1.SubCategory.find(filter)
            .populate('category_id', 'name slug _id')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        subcategory_model_1.SubCategory.countDocuments(filter),
    ]);
    return {
        data: subCategories,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
});
exports.getAllSubCategoriesService = getAllSubCategoriesService;
/**
 * Get Single SubCategory by ID Service
 */
const getSubCategoryByIdService = (subCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const subCategory = yield subcategory_model_1.SubCategory.findById(subCategoryId)
        .populate('category_id', 'name slug _id')
        .lean();
    if (!subCategory) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'SubCategory not found');
    }
    return subCategory;
});
exports.getSubCategoryByIdService = getSubCategoryByIdService;
/**
 * Get SubCategory by Slug Service
 */
const getSubCategoryBySlugService = (slug, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { slug };
    if (categoryId) {
        filter.category_id = new mongoose_1.Types.ObjectId(categoryId);
    }
    const subCategory = yield subcategory_model_1.SubCategory.findOne(filter)
        .populate('category_id', 'name slug _id')
        .lean();
    if (!subCategory) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'SubCategory not found');
    }
    return subCategory;
});
exports.getSubCategoryBySlugService = getSubCategoryBySlugService;
/**
 * Get SubCategories by Category ID Service
 */
const getSubCategoriesByCategoryIdService = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = options;
    const skip = (page - 1) * limit;
    // Verify category exists
    const category = yield category_model_1.Category.findById(categoryId);
    if (!category) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    const [subCategories, total] = yield Promise.all([
        subcategory_model_1.SubCategory.find({ category_id: new mongoose_1.Types.ObjectId(categoryId) })
            .populate('category_id', 'name slug _id')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        subcategory_model_1.SubCategory.countDocuments({ category_id: new mongoose_1.Types.ObjectId(categoryId) }),
    ]);
    return {
        data: subCategories,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
});
exports.getSubCategoriesByCategoryIdService = getSubCategoriesByCategoryIdService;
/**
 * Update SubCategory Service
 * Admin can update
 */
const updateSubCategoryService = (subCategoryId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const subCategory = yield subcategory_model_1.SubCategory.findById(subCategoryId);
    if (!subCategory) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'SubCategory not found');
    }
    // If category_id is being updated, verify it exists
    if (updateData.category_id) {
        const category = yield category_model_1.Category.findById(updateData.category_id);
        if (!category) {
            throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Category not found');
        }
        updateData.category_id = new mongoose_1.Types.ObjectId(updateData.category_id);
    }
    // If name is updated and slug is not provided, regenerate slug
    if (updateData.name && !updateData.slug) {
        updateData.slug = (0, slugify_1.default)(updateData.name, { lower: true, strict: true, trim: true });
    }
    // If slug is provided, format it
    if (updateData.slug) {
        updateData.slug = (0, slugify_1.default)(updateData.slug, { lower: true, strict: true, trim: true });
    }
    // Check if new slug conflicts with existing subcategory in the same category
    const categoryIdToCheck = updateData.category_id || subCategory.category_id;
    if (updateData.slug && updateData.slug !== subCategory.slug) {
        const existingSubCategory = yield subcategory_model_1.SubCategory.findOne({
            slug: updateData.slug,
            category_id: categoryIdToCheck,
            _id: { $ne: subCategoryId },
        });
        if (existingSubCategory) {
            throw new apiError_1.ApiError(http_status_1.default.CONFLICT, 'SubCategory with this slug already exists in this category');
        }
    }
    // Update fields
    Object.assign(subCategory, updateData);
    // Save and populate
    yield subCategory.save();
    yield subCategory.populate('category_id', 'name slug _id');
    return subCategory.toObject();
});
exports.updateSubCategoryService = updateSubCategoryService;
/**
 * Delete SubCategory Service
 * Admin can delete
 */
const deleteSubCategoryService = (subCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const subCategory = yield subcategory_model_1.SubCategory.findById(subCategoryId);
    if (!subCategory) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'SubCategory not found');
    }
    // Hard delete
    yield subcategory_model_1.SubCategory.findByIdAndDelete(subCategoryId);
});
exports.deleteSubCategoryService = deleteSubCategoryService;
