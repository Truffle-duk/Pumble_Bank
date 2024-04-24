import express from "express";
import asyncHandler from 'express-async-handler';
import { connectPumble, checkOwner } from "../controller/connectController.js";

export const connectRouter = express.Router();

connectRouter.post('/checkOwner', asyncHandler(await checkOwner));
connectRouter.post('', asyncHandler(await connectPumble));