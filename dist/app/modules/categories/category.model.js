"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const categorySchema = new mongoose_1.Schema({
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    image: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
        trim: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});
// Index for better query performance
categorySchema.index({ slug: 1 });
categorySchema.index({ name: 1 });
// Pre-save hook to generate slug from name if slug is not provided
categorySchema.pre('save', function (next) {
    if (this.isModified('name') && !this.slug) {
        this.slug = (0, slugify_1.default)(this.name, {
            lower: true,
            strict: true,
            trim: true,
        });
    }
    // If slug is manually provided, ensure it's properly formatted
    if (this.isModified('slug') && this.slug) {
        this.slug = (0, slugify_1.default)(this.slug, {
            lower: true,
            strict: true,
            trim: true,
        });
    }
    next();
});
exports.Category = (0, mongoose_1.model)('Category', categorySchema);
