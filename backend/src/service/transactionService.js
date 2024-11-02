import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {getBalance, getRecords, postRecord, selectAccountByUUID} from "../model/transactionModel.js";
import {recordWithdrawal, recordDeposit} from "../blockchain/blockchainFunction.js";

export const record = async (body) => {
    let amountVal = body.amount
    if(checkNullOrEmpty(body) === false) {
        throw new BaseError(status.TRANSACTION_INPUT_EMPTY);
    }

    // 1. 계좌 조회
    const findAccountByUUID = await selectAccountByUUID({
        'uuid': body.uuid
    })
    if (findAccountByUUID === -1) {
        throw new BaseError(status.ACCOUNT_NOT_FOUND);
    }

    // 2. 출금일 때 잔액 부족 여부 확인
    if (body.type === 'outcome') {
        const getBalanceData = await getBalance({
            'uuid': body.uuid
        })
        if (getBalanceData < body.amount) {
            throw new BaseError(status.LACK_OF_BALANCE)
        } else {
            amountVal = amountVal * -1
        }
    }

    // 3. 거래 내역 입력
    const postRecordData = await postRecord({
        'counterparty': body.counterparty,
        'amount': amountVal,
        'type': body.type,
        'description': body.description,
        'uuid': body.uuid
    })

    if (postRecordData === 0) {
        // 블록에 거래 내역 기록
        if (body.type === 'outcome') {
            await recordWithdrawal(body.uuid, body.amount, body.counterparty, body.description)
        } else if (body.type === 'income') {
            await recordDeposit(body.uuid, body.amount, body.counterparty, body.description)
        }
        return 0
    } else {
        throw new BaseError(status.RECORD_SOMETHING_WRONG)
    }
}

export const retrieve = async (body) => {
    if (checkNullOrEmpty(body) === false) {
        throw new BaseError(status.TRANSACTION_INPUT_EMPTY);
    }

    // 1. 계좌 조회
    const findAccountByUUID = await selectAccountByUUID({
        'uuid': body.uuid
    })
    if (findAccountByUUID === -1) {
        throw new BaseError(status.ACCOUNT_NOT_FOUND);
    }

    // 2. 거래 내역 조회
    const getRecordsData = await getRecords({
        'uuid': body.uuid,
        'startMonth': body.startMonth,
        'endMonth': body.endMonth
    })

    if (getRecordsData) {
        return getRecordsData
    } else {
        throw new BaseError(status.DB_ERROR);
    }
}

const checkNullOrEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)){
            if (obj[key] === null || obj[key] === "") {
                return false
            }
        }
    }
    return true
}