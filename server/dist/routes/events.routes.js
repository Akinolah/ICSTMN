"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const event_controller_1 = require("../controllers/event.controller");
function default_1(fastify, opts, done) {
    fastify.get('/', event_controller_1.getLatestEvents);
    done();
}
