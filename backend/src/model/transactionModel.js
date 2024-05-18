import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {findAccountByUUID, insertRecord, selectAllTransaction, selectBalance} from "./transactionSql.js";

export const selectAccountByUUID = async (data) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(findAccountByUUID, data.uuid);

        if(confirm[0].isExistAccount !== 1){
            conn.release();
            return -1;
        } else {
            return 0;
        }

    }catch (err) {
        throw new BaseError(status.DB_ERROR)
    }
}

export const getBalance = async (data) => {
    try {
        const conn = await pool.getConnection();
        const [getBalance] = await pool.query(selectBalance, data.uuid);

        conn.release()
        return getBalance[0].balance
    } catch (err) {
        throw new BaseError(status.DB_ERROR)
    }
}

export const postRecord = async (data) => {
    try {
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(insertRecord, [data.counterparty, data.amount, data.type, data.uuid]);

        if (confirm.affectedRows === 1) {
            conn.release();
            return 0;
        } else {
            return -1;
        }

    } catch (err) {
        throw new BaseError(status.DB_ERROR)
    }
}

export const getRecords = async (data) => {
    try {
        const conn = await pool.getConnection();
        const [getBalance] = await pool.query(selectBalance, data.uuid);
        const [getRecords] = await pool.query(selectAllTransaction, [data.uuid, data.startMonth, data.endMonth]);

        conn.release();
        return {balance: getBalance[0].balance, records: getRecords}
    } catch (err) {
        throw new BaseError(status.DB_ERROR)
    }
}