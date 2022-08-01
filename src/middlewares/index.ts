import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express';
import rateLimit, { MemoryStore } from 'express-rate-limit';
import { config } from 'dotenv';
config();
const env = process.env
const limitRequest = ()  => {
  
}

export default {
    limitRequest,
}