"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const payment_controller_1 = require("../controllers/payment.controller");
function default_1(fastify, opts, done) {
    fastify.post('/verify', payment_controller_1.verifyPaymentAndRegister);
    done();
}
