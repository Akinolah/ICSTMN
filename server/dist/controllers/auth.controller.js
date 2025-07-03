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
exports.login = exports.precheckRegistration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Precheck Registration Controller
const precheckRegistration = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.body;
        const existing = yield user_model_1.default.findOne({ email });
        if (existing) {
            return reply.status(400).send({ message: 'User already exists. Please login.' });
        }
        reply.send({ ok: true });
    }
    catch (err) {
        reply.status(500).send({ message: 'Precheck failed', error: err.message });
    }
});
exports.precheckRegistration = precheckRegistration;
// Login Controller
const login = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        // 1. Find user by email
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return reply.status(400).send({ message: 'Invalid credentials' });
        }
        // 2. Compare password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return reply.status(400).send({ message: 'Invalid credentials' });
        }
        // 3. Create JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // 4. Return token and user info (omit password)
        reply.send({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
                membershipType: user.membershipType,
                // add other fields as needed
            }
        });
    }
    catch (err) {
        reply.status(500).send({ message: 'Login failed', error: err.message });
    }
});
exports.login = login;
