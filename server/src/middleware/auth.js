"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminOnly = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth)
        return res.status(401).json({ message: 'No token' });
    const token = auth.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (_a) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
const superAdminOnly = (req, res, next) => {
    // Only allow adminIndex 0 (Admin 1)
    const user = req.user;
    if (user && user.isAdmin && user.adminIndex === 0) {
        next();
    }
    else {
        res.status(403).json({ message: 'Forbidden' });
    }
};
exports.superAdminOnly = superAdminOnly;
