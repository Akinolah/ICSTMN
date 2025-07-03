"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const auth_controller_1 = require("../controllers/auth.controller");
function default_1(fastify, opts, done) {
    fastify.post('/precheck', auth_controller_1.precheckRegistration);
    fastify.post('/login', auth_controller_1.login);
    done();
}
