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
exports.deleteCategory = exports.updateCategory = exports.getCategoryBySlug = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const category_services_1 = require("./category.services");
const sendRes_1 = require("../../../utilities/sendRes");
const tryCatch_1 = require("../../../utilities/tryCatch");
const http_status_1 = __importDefault(require("http-status"));
/**
 * Create Category Controller
 * Requires authentication (auth middleware)
 */
exports.createCategory = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, category_services_1.createCategoryService)(req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Category created successfully',
        result: result,
    });
}));
/**
 * Get All Categories Controller
 * Public endpoint - no authentication required
 * Supports pagination
 */
exports.getAllCategories = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const options = {
        page,
        limit,
    };
    const result = yield (0, category_services_1.getAllCategoriesService)(options);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Categories retrieved successfully',
        result: result,
    });
}));
/**
 * Get Category by ID Controller
 * Public endpoint
 */
exports.getCategoryById = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, category_services_1.getCategoryByIdService)(id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category retrieved successfully',
        result: result,
    });
}));
/**
 * Get Category by Slug Controller
 * Public endpoint
 */
exports.getCategoryBySlug = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield (0, category_services_1.getCategoryBySlugService)(slug);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category retrieved successfully',
        result: result,
    });
}));
/**
 * Update Category Controller
 * Requires authentication (admin role)
 */
exports.updateCategory = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, category_services_1.updateCategoryService)(id, req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category updated successfully',
        result: result,
    });
}));
/**
 * Delete Category Controller
 * Requires authentication (admin role)
 */
exports.deleteCategory = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, category_services_1.deleteCategoryService)(id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category deleted successfully',
        result: null,
    });
}));
