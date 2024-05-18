import express from "express";
import asyncHandler from "express-async-handler";
import {recordTransaction, retrieveTransactions} from "../controller/transactionController.js";

export const transactionRouter = express.Router();

transactionRouter.post('', asyncHandler(await recordTransaction))
transactionRouter.get('', asyncHandler(await retrieveTransactions))