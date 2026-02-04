"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const category_validation_1 = require("./category.validation");
const auth_1 = require("../../../middleware/auth");
const admin_1 = require("../../../middleware/admin");
const router = express_1.default.Router();
// Public routes (no authentication required)
router.get('/', (0, reqValidate_1.default)(category_validation_1.paginationZod), category_controller_1.getAllCategories); // Get all categories
router.get('/slug/:slug', category_controller_1.getCategoryBySlug); // Get category by slug
router.get('/:id', (0, reqValidate_1.default)(category_validation_1.getCategoryByIdZod), category_controller_1.getCategoryById); // Get single category by ID
// Protected routes (require authentication and admin role)
router.post('/', auth_1.auth, admin_1.admin, (0, reqValidate_1.default)(category_validation_1.createCategoryZod), category_controller_1.createCategory); // Create category
router.patch('/:id', auth_1.auth, admin_1.admin, (0, reqValidate_1.default)(category_validation_1.updateCategoryZod), category_controller_1.updateCategory); // Update category
router.delete('/:id', auth_1.auth, admin_1.admin, (0, reqValidate_1.default)(category_validation_1.getCategoryByIdZod), category_controller_1.deleteCategory); // Delete category
exports.default = router;
