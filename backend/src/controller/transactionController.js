import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {record, retrieve} from "../service/transactionService.js";

export const recordTransaction = async (req, res, next) => {
    console.log("금융 거래 기록을 요청하였습니다.");

    res.send(response(status.SUCCESS, await record(req.body)));
}

export const retrieveTransactions = async (req, res, next) => {
    console.log("금융 거래 내역 조회를 요청하였습니다.")

    res.send(response(status.SUCCESS, await retrieve(req.body)))
}