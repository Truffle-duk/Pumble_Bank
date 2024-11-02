import { BaseError } from "../../config/error.js";
import { status } from "../../config/responseStatus.js";
import {validateOwner, findAccount, insertConnectInfo, findMappingByAccount} from "../model/connectModel.js";
import {connectPumbleDTO, validateOwnerDTO} from "../dto/connectDTO.js";
import {createGroupF} from "../blockchain/blockchainFunction.js";

export const validateUser = async (body) => {
    if (body.owner === "" || body.owner === null || body.account === "" || body.account === null) {
        throw new BaseError(status.CONNECT_INPUT_EMPTY)
    }

    //1. 해당 계좌가 있는지 확인한다
    const findAccountData = await findAccount({
        'account': body.account
    })

    if (findAccountData === -1){
        throw new BaseError(status.ACCOUNT_NOT_FOUND)
    }

    //2. 해당 계좌의 예금주가 입력값과 동일한지 확인한다.
    const validateOwnerData = await validateOwner({
        'account': body.account,
        "owner": body.owner
    })

    if (validateOwnerData === -1){
        throw new BaseError(status.OWNER_NOT_MATCH)
    } else if (validateOwnerData === 0){
        return validateOwnerDTO()
    } else {
        console.error("Something wrong in connectService.validateUser");
    }
}

export const connectPumbleGroup = async (body) => {
    if (body.account === null || body.account === "" || body.connectUUID === null || body.connectUUID === "") {
        throw new BaseError(status.CONNECT_INPUT_EMPTY)
    }

    const checkMappingExist = await findMappingByAccount({
        account: body.account
    })

    if (checkMappingExist === -1) {
        throw new BaseError(status.ACCOUNT_ALREADY_MAPPED)
    }

    const connectPumbleData = await insertConnectInfo({
        account: body.account,
        uuid: body.connectUUID
    })

    console.log(connectPumbleData)

    if (connectPumbleData === 0) {
        await createGroupF(body.connectUUID, '')
        return connectPumbleDTO()
    } else {
        throw new BaseError(status.CONNECT_SOMETHING_WRONG)
    }
}