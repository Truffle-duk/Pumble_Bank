// models/user.dao.js

import { pool } from "../../config/database.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/responseStatus.js";
import {insertMappingInfoSql, selectAccountByOwnerSql, selectAccountSql, selectMappingByAccount} from "./connectSql.js";

export const findAccount = async (data) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(selectAccountSql, data.account);

        if(confirm[0].isExistAccount === 0){
            conn.release();
            return -1;
        } else {
            return 0;
        }

    }catch (err) {
        console.log(err);
        throw new BaseError(status.DB_ERROR);
    }
}

export const validateOwner = async (data) => {
    try{
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(selectAccountByOwnerSql, [data.account, data.owner]);

        if(confirm[0].isExistOwner === 0){
            conn.release();
            return -1;
        } else {
            return 0;
        }

    }catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const insertConnectInfo = async (data) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(insertMappingInfoSql, [data.uuid, data.account]);

        if (confirm[0].affectedRows === 1) {
            conn.release();
            return 0;
        } else {
            return -1;
        }

    } catch (err) {
        throw new BaseError(status.DB_ERROR)
    }
}

export const findMappingByAccount = async (data) => {
    try{
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(selectMappingByAccount, data.account);

        if(confirm[0].isExistMappingInfo === 1){
            conn.release();
            return -1;
        } else {
            return 0;
        }
    } catch (e) {
        throw new BaseError(status.DB_ERROR)
    }
}