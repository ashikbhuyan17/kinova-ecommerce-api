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
exports.deleteSubCategory = exports.updateSubCategory = exports.getSubCategoryBySlug = exports.getSubCategoryById = exports.getSubCategoriesByCategoryId = exports.getAllSubCategories = exports.createSubCategory = void 0;
const subcategory_services_1 = require("./subcategory.services");
const sendRes_1 = require("../../../utilities/sendRes");
const tryCatch_1 = require("../../../utilities/tryCatch");
const http_status_1 = __importDefault(require("http-status"));
/**
 * Create SubCategory Controller
 * Requires authentication (auth middleware) and admin role
 */
exports.createSubCategory = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, subcategory_services_1.createSubCategoryService)(req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'SubCategory created successfully',
        result: result,
    });
}));
/**
 * Get All SubCategories Controller
 * Public endpoint - no authentication required
 * Supports pagination and filtering by category
 */
exports.getAllSubCategories = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const category = req.query.category;
    const options = {
        page,
        limit,
        category,
    };
    const result = yield (0, subcategory_services_1.getAllSubCategoriesService)(options);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubCategories retrieved successfully',
        result: result,
    });
}));
/**
 * Get SubCategories by Category ID Controller
 * Public endpoint
 */
exports.getSubCategoriesByCategoryId = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const options = {
        page,
        limit,
    };
    const result = yield (0, subcategory_services_1.getSubCategoriesByCategoryIdService)(categoryId, options);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubCategories retrieved successfully',
        result: result,
    });
}));
/**
 * Get SubCategory by ID Controller
 * Public endpoint
 */
exports.getSubCategoryById = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, subcategory_services_1.getSubCategoryByIdService)(id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubCategory retrieved successfully',
        result: result,
    });
}));
/**
 * Get SubCategory by Slug Controller
 * Public endpoint
 */
exports.getSubCategoryBySlug = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const categoryId = req.query.category;
    const result = yield (0, subcategory_services_1.getSubCategoryBySlugService)(slug, categoryId);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubCategory retrieved successfully',
        result: result,
    });
}));
/**
 * Update SubCategory Controller
 * Requires authentication (admin role)
 */
exports.updateSubCategory = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, subcategory_services_1.updateSubCategoryService)(id, req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubCategory updated successfully',
        result: result,
    });
}));
/**
 * Delete SubCategory Controller
 * Requires authentication (admin role)
 */
exports.deleteSubCategory = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, subcategory_services_1.deleteSubCategoryService)(id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubCategory deleted successfully',
        result: null,
    });
}));
