import * as dotenv from 'dotenv';
const TelegramBot = require('node-telegram-bot-api');
dotenv.config()

const token = "7664969374:AAGLNuSuwQT85ACiMKTY6IU06gTsbU4WvGk";
export const TelegramBotInstance = new TelegramBot(token, { polling: true });
