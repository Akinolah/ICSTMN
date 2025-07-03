"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const resourceSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['PDF', 'Video', 'Link'], required: true },
    url: { type: String, required: true },
    uploadedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
const Resource = mongoose_1.default.model('Resource', resourceSchema);
exports.default = Resource;
