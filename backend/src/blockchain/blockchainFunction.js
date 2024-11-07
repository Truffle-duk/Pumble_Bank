import dotenv from "dotenv";
import {ethers} from "ethers";
dotenv.config()

const endpoint = process.env.INFURA_ENDPOINT
const privateKey = process.env.SEPOLIA_PRIVATE_KEY
const ledgerContractAddress = process.env.LEDGER_CONTRACT_ADDRESS
console.log(`${endpoint} ${privateKey} ${ledgerContractAddress}`)

//Blockchain
const provider = new ethers.JsonRpcProvider(endpoint);
const wallet = new ethers.Wallet(privateKey, provider)

const transactionContractAddress = ledgerContractAddress
const transactionContractABI = [
    "event TransactionCreated(string indexed hGroupId, string indexed category, string groupId, uint256 transactionIndex, bool isDeposit, uint256 amount, string counterparty, string description, uint256 timestamp, string receiptDetails)",
    "event RetrieveBalance(string indexed hGroupId, string groupId, uint256 balance)",
    "function createGroup(string memory _groupId, string memory _name)",
    "function recordDeposit(string memory _groupId, uint256 _amount, string memory _counterparty, string memory _description)",
    "function recordWithdrawal(string memory _groupId, uint256 _amount, string memory _counterparty, string memory _description)",
    "function updateReceiptDetails(string memory _groupId, uint256 _transactionIndex, string memory _receiptDetails)"
];
const t_Contract = new ethers.Contract(transactionContractAddress, transactionContractABI, wallet)

t_Contract.on("TransactionCreated", (groupId, category, transactionIndex, isDeposit, amount, counterparty, description, timestamp, receiptDetails, event) => {
    console.log("TransactionCreated event detected:");
    console.log("Group ID:", groupId);
    console.log("Group ID2:", event.args.groupId);
    console.log("Transaction Index:", transactionIndex);
    console.log("Is Deposit:", isDeposit);
    console.log("Amount:", amount);
    console.log("Counterparty:", counterparty);
    console.log("Description:", description);
    console.log("Timestamp:", timestamp);
    console.log("Receipt Details:", receiptDetails);
    console.log("Event:", event);
});

export const createGroupF = async (groupId, groupName) => {
    try {
        const txResponse = await t_Contract.createGroup(groupId, groupName)
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)
    } catch (e) {
        console.log(e)
        console.log('error here')
    }
}

export const recordDeposit = async (groupId, amount, counterparty, description) => {
    try {
        const txResponse = await t_Contract.recordDeposit(groupId, amount, counterparty, description)
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt.logs)
    } catch (e) {
        console.log(e)
        console.log('error here')
    }
}

export const recordWithdrawal = async (groupId, amount, counterparty, description) => {
    try {
        const txResponse = await t_Contract.recordWithdrawal(groupId, amount, counterparty, description)
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)
    } catch (e) {
        console.log(e)
        console.log('error here')
    }
}