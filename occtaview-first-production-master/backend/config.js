import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT ;
export const DATABASE_URL = process.env.DATABASE_URL;

export const NODEMAILER_USER = process.env.NODEMAILER_USER;
export const NODEMAILER_PASS = process.env.NODEMAILER_PASS;
export const NODEMAILER_HOST = process.env.NODEMAILER_HOST;
export const NODEMAILER_PORT = process.env.NODEMAILER_PORT;