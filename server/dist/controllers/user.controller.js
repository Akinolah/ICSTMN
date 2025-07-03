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
exports.deleteUser = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// Get all users
const getUsers = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        reply.send({ users });
    }
    catch (err) {
        reply.status(500).send({ message: 'Failed to fetch users' });
    }
});
exports.getUsers = getUsers;
// Delete a user
const deleteUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const user = yield user_model_1.default.findByIdAndDelete(id);
        if (!user) {
            return reply.status(404).send({ message: 'User not found' });
        }
        reply.status(200).send({ message: 'User deleted successfully' });
    }
    catch (err) {
        reply.status(500).send({ message: 'Failed to delete user' });
    }
});
exports.deleteUser = deleteUser;
