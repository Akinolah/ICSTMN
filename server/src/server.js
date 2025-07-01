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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./utils/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const adminSeed_1 = require("./utils/adminSeed");
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const events_routes_1 = __importDefault(require("./routes/events.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/payments', payment_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/events', events_routes_1.default);
// Serve static files from the React app
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/build', 'index.html'));
});
const PORT = process.env.PORT || 5000;
(0, db_1.connectDB)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, adminSeed_1.seedAdmins)();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}));
