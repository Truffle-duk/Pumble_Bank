export const selectAccountByOwnerSql = "SELECT EXISTS(SELECT * FROM account WHERE account = ? AND owner = ?) as isExistOwner;";
export const selectAccountSql = "SELECT EXISTS(SELECT * FROM account WHERE account = ?) as isExistAccount;";
export const insertMappingInfoSql = "INSERT INTO account_pumble_mapping (group_uuid, account_id) VALUES (?, (SELECT account_id FROM account WHERE account = ?));";
export const selectMappingByAccount = "SELECT EXISTS(select * from account_pumble_mapping as A JOIN account as B ON A.account_id = B.account_id WHERE account = ?) as isExistMappingInfo;";