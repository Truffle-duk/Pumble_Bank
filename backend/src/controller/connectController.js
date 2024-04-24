import { response } from "../../config/response.js";
import { status } from "../../config/responseStatus.js";
import {validateUser, connectPumbleGroup} from "../service/connectService.js";

export const checkOwner = async (req, res, next) => {
    console.log("계좌에 대한 검증을 요청하였습니다.");

    res.send(response(status.SUCCESS, await validateUser(req.body)));
}

export const connectPumble = async (req, res, next) => {
    console.log("계좌와 Pumble을 연동합니다.")
    res.send(response(status.SUCCESS, await connectPumbleGroup(req.body)));
}