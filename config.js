import { config } from "dotenv";

export const TOKEN_SECRET = 'some secret key'

config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://johnmarin:Sdh4nLOxBdQ9WrOk@cluster0.gtln7mq.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
export const PORT = process.env.PORT || 5000;
export const FRONTED_URL = process.env.FRONTED_URL || 'http://localhost:5173'