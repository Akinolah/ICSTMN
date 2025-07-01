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
exports.deleteResource = exports.createResource = exports.getResources = void 0;
const resource_model_1 = __importDefault(require("../models/resource.model"));
// Get all resources
const getResources = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resources = yield resource_model_1.default.find();
        res.json({ resources });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch resources' });
    }
});
exports.getResources = getResources;
// Create a new resource
const createResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = new resource_model_1.default(req.body);
        yield resource.save();
        res.json({ resource });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create resource' });
    }
});
exports.createResource = createResource;
// Delete a resource
const deleteResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield resource_model_1.default.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete resource' });
    }
});
exports.deleteResource = deleteResource;
