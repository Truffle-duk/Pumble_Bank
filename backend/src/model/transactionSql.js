// 거래내역 입력
export const insertRecord = "INSERT INTO transaction (t_date, counterparty, amount, type, account_id) VALUES (now(), ?, ?, ?, (select account_id from account_pumble_mapping where group_uuid = ?));";
// 전체 잔액 조회
export const selectBalance = "SELECT SUM(amount) AS 'balance' FROM transaction WHERE account_id = (SELECT account_id FROM account_pumble_mapping WHERE group_uuid = ?);";
// 거래내역 목록 조회(범위 제한 없음)
export const selectAllTransaction = "SELECT * FROM transaction WHERE account_id = (SELECT account_id FROM account_pumble_mapping WHERE group_uuid = ?) order by t_date desc;";
// 계좌 존재 확인
export const findAccountByUUID = "SELECT EXISTS(SELECT * FROM account_pumble_mapping WHERE group_uuid = ?) as isExistAccount;";