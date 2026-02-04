"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
/**
 * Admin Middleware
 *
 * This middleware checks if the authenticated user has admin role
 * Must be used after auth middleware
 */
const admin = (req, res, next) => {
    // Check if user is authenticated (should be set by auth middleware)
    if (!req.user) {
        return next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!'));
    }
    // Check if user has admin role
    if (req.user.role !== 'admin') {
        return next(new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Access denied. Admin privileges required.'));
    }
    // User is admin, continue to next middleware/route handler
    next();
};
exports.admin = admin;
