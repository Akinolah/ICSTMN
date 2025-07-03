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
exports.verifyPaymentAndRegister = void 0;
const axios_1 = __importDefault(require("axios"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
// Helper: Verify payment with Paystack
function verifyPaystack(reference) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.paystack.co/transaction/verify/${reference}`;
        const response = yield axios_1.default.get(url, {
            headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` }
        });
        return response.data;
    });
}
// POST /api/payments/verify
const verifyPaymentAndRegister = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reference, user } = request.body;
        // 1. Verify payment with Paystack
        const paystackRes = yield verifyPaystack(reference);
        if (paystackRes.data.status !== 'success') {
            return reply.status(400).send({ message: 'Payment not successful' });
        }
        // 2. Check if user already exists
        const existing = yield user_model_1.default.findOne({ email: user.email });
        if (existing) {
            return reply.status(400).send({ message: 'User already exists. Please login.' });
        }
        // 3. Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(user.password, 10);
        // 4. Create user
        const newUser = new user_model_1.default(Object.assign(Object.assign({}, user), { password: hashedPassword, isAdmin: false }));
        yield newUser.save();
        // 5. Respond success
        reply.send({ success: true, userId: newUser._id });
    }
    catch (err) {
        reply.status(500).send({ message: 'Payment verification or registration failed', error: err.message });
    }
});
exports.verifyPaymentAndRegister = verifyPaymentAndRegister;
