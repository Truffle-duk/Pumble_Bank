import { StatusCodes } from "http-status-codes";

export const status = {
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 200, "message": "success!"},

    // common
    NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": 400, "message": "not found"},
    DB_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": 500, "message": "서버 에러\n관리자에게 문의하세요"},

    // connect
    CONNECT_INPUT_EMPTY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "Connect4001", "message": "연결에 필요한 입력값이 비었습니다."},
    OWNER_NOT_MATCH: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "Connect4002", "message": "예금주가 일치하지 않습니다."},
    ACCOUNT_NOT_FOUND: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "Connect4003", "message": "존재하지 않는 계좌입니다."},
    CONNECT_SOMETHING_WRONG: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "Connect4004", "message": "Pumble과의 연결 과정에서 문제가 발생했습니다."},
    ACCOUNT_ALREADY_MAPPED: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "Connect4005", "message": "이미 연동된 계좌입니다."},
}