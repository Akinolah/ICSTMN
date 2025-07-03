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
exports.authMiddleware = authMiddleware;
exports.superAdminOnly = superAdminOnly;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Auth middleware for Fastify
function authMiddleware(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = request.headers.authorization;
        if (!auth) {
            reply.status(401).send({ message: 'No token' });
            return;
        }
        const token = auth.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            request.user = decoded;
        }
        catch (_a) {
            reply.status(401).send({ message: 'Invalid token' });
            return;
        }
    });
}
// Super admin only middleware for Fastify
function superAdminOnly(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = request.user;
        if (user && user.isAdmin && user.adminIndex === 0) {
            // allowed
            return;
        }
        else {
            reply.status(403).send({ message: 'Forbidden' });
            return;
        }
    });
}
