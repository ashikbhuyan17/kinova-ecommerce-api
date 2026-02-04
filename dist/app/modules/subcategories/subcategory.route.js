"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subcategory_controller_1 = require("./subcategory.controller");
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const subcategory_validation_1 = require("./subcategory.validation");
const auth_1 = require("../../../middleware/auth");
const admin_1 = require("../../../middleware/admin");
const router = express_1.default.Router();
// Public routes (no authentication required)
router.get('/', (0, reqValidate_1.default)(subcategory_validation_1.paginationZod), subcategory_controller_1.getAllSubCategories); // Get all subcategories
router.get('/category/:categoryId', (0, reqValidate_1.default)(subcategory_validation_1.paginationZod), subcategory_controller_1.getSubCategoriesByCategoryId); // Get subcategories by category ID
router.get('/slug/:slug', subcategory_controller_1.getSubCategoryBySlug); // Get subcategory by slug
router.get('/:id', (0, reqValidate_1.default)(subcategory_validation_1.getSubCategoryByIdZod), subcategory_controller_1.getSubCategoryById); // Get single subcategory by ID
// Protected routes (require authentication and admin role)
router.post('/', auth_1.auth, admin_1.admin, (0, reqValidate_1.default)(subcategory_validation_1.createSubCategoryZod), subcategory_controller_1.createSubCategory); // Create subcategory
router.patch('/:id', auth_1.auth, admin_1.admin, (0, reqValidate_1.default)(subcategory_validation_1.updateSubCategoryZod), subcategory_controller_1.updateSubCategory); // Update subcategory
router.delete('/:id', auth_1.auth, admin_1.admin, (0, reqValidate_1.default)(subcategory_validation_1.getSubCategoryByIdZod), subcategory_controller_1.deleteSubCategory); // Delete subcategory
exports.default = router;
