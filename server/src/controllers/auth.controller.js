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
//Registration Controller for payment after registration
// export const register = async (req: Request, res: Response) => {
//   try {
//     const { email, password, ...rest } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already exists' });
//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashed, ...rest, isAdmin: false });
//     await user.save();
//     res.json({ success: true, userId: user._id });
//   } catch (err) {
//     res.status(500).json({ message: 'Registration failed', error: err });
//   }
// };
// Precheck Registration Controller
const precheckRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const existing = yield user_model_1.default.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'User already exists. Please login.' });
        }
        res.json({ ok: true });
    }
    catch (err) {
        res.status(500).json({ message: 'Precheck failed', error: err.message });
    }
});
exports.precheckRegistration = precheckRegistration;
// Login Controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // 1. Find user by email
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // 2. Compare password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // 3. Create JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // 4. Return token and user info (omit password)
        res.json({
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
        res.status(500).json({ message: 'Login failed', error: err });
    }
});
exports.login = login;
