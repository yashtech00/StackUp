"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpayInstance = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
exports.razorpayInstance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID, // Use environment variables for security
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
