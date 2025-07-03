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
console.log('Starting Fastify server...');
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./utils/db");
const adminSeed_1 = require("./utils/adminSeed");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const events_routes_1 = __importDefault(require("./routes/events.routes"));
dotenv_1.default.config();
const fastify = (0, fastify_1.default)({ logger: true });
// Register CORS
fastify.register(cors_1.default);
// Register API routes
fastify.register(auth_routes_1.default, { prefix: '/api/auth' });
fastify.register(payment_routes_1.default, { prefix: '/api/payments' });
fastify.register(admin_routes_1.default, { prefix: '/api/admin' });
fastify.register(events_routes_1.default, { prefix: '/api/events' });
// Serve static files
fastify.register(static_1.default, {
    root: path_1.default.join(__dirname, '../../client/dist'),
    prefix: '/',
});
// Wildcard route for SPA (serves index.html for all unmatched routes)
fastify.setNotFoundHandler((req, reply) => {
    reply.sendFile('index.html');
});
const PORT = Number(process.env.PORT) || 5000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        yield (0, adminSeed_1.seedAdmins)();
        yield fastify.listen({ port: PORT, host: '0.0.0.0' });
        fastify.log.info(`Server running at http://localhost:${PORT}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
start();
