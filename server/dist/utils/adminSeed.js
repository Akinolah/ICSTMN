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
exports.seedAdmins = void 0;
exports.adminSeedPlugin = adminSeedPlugin;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admins = [
    { email: 'admin1@ictng.org', password: 'Admin@1234', name: 'Admin One', adminIndex: 0 },
    { email: 'admin2@ictng.org', password: 'Admin@1234', name: 'Admin Two', adminIndex: 1 },
    { email: 'admin3@ictng.org', password: 'Admin@1234', name: 'Admin Three', adminIndex: 2 },
    { email: 'admin4@ictng.org', password: 'Admin@1234', name: 'Admin Four', adminIndex: 3 },
    { email: 'admin5@ictng.org', password: 'Admin@1234', name: 'Admin Five', adminIndex: 4 },
];
// Fastify plugin for seeding admins
function adminSeedPlugin(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const admin of admins) {
            const exists = yield user_model_1.default.findOne({ email: admin.email });
            if (!exists) {
                const hashed = yield bcryptjs_1.default.hash(admin.password, 10);
                yield user_model_1.default.create(Object.assign(Object.assign({}, admin), { password: hashed, isAdmin: true }));
                fastify.log.info(`Seeded admin: ${admin.email}`);
            }
        }
    });
}
// Optionally, keep the original function for manual use
const seedAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const admin of admins) {
        const exists = yield user_model_1.default.findOne({ email: admin.email });
        if (!exists) {
            const hashed = yield bcryptjs_1.default.hash(admin.password, 10);
            yield user_model_1.default.create(Object.assign(Object.assign({}, admin), { password: hashed, isAdmin: true }));
            console.log(`Seeded admin: ${admin.email}`);
        }
    }
});
exports.seedAdmins = seedAdmins;
