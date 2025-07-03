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
exports.getAdminReports = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// Get admin reports
const getAdminReports = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield user_model_1.default.find({ isAdmin: true });
        const reports = admins.map((admin) => ({
            adminIndex: typeof admin.adminIndex === 'number' ? admin.adminIndex : null,
            name: admin.name,
            email: admin.email,
            eventsManaged: admin.eventsManaged || 0,
            contentsUploaded: admin.contentsUploaded || 0,
            lastActive: admin.lastActive || new Date().toLocaleString(),
        }));
        reply.send({ reports });
    }
    catch (err) {
        reply.status(500).send({ message: 'Failed to fetch admin reports' });
    }
});
exports.getAdminReports = getAdminReports;
