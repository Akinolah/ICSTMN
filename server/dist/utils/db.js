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
exports.connectDB = void 0;
exports.dbPlugin = dbPlugin;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Ensure MONGODB_URI exists
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
    throw new Error("MONGODB_URI is missing in environment variables (.env file)");
}
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the app if connection fails
    }
});
exports.connectDB = connectDB;
// Fastify plugin to connect to MongoDB
function dbPlugin(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, exports.connectDB)();
        fastify.decorate('mongoose', mongoose_1.default);
    });
}
