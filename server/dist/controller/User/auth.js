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
exports.Signin = exports.Signup = void 0;
const generateToken_1 = require("../../lib/generateToken");
const user_1 = __importDefault(require("../../model/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (user) {
            return res.json({ message: "User already register go for login" }, { status: 401 });
        }
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield user_1.default.create({
            username,
            email,
            password: hashPassword
        });
        (0, generateToken_1.generateToken)(newUser._id, res);
        return res.json({ message: "User created successfully" }, { status: 200 }, { data: newUser });
    }
    catch (e) {
        console.error(e.message);
        return res.json({ message: "Internal server error while Signup" }, { status: 500 });
    }
});
exports.Signup = Signup;
const Signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.json({ message: "User not found go for Signup" }, { status: 401 });
        }
        const isPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPassword) {
            return res.json({ message: "Invalid Password" }, { status: 401 });
        }
        (0, generateToken_1.generateToken)(user._id, res);
        return res.json({ message: "User created successfully" }, { status: 200 }, { data: user });
    }
    catch (e) {
        console.error(e.message);
        return res.json({ message: "Internal server error while SignIn" }, { status: 500 });
    }
});
exports.Signin = Signin;
