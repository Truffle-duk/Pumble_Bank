import './App.css';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {useState} from "react";

function App() {
    const [counterparty, setCounterparty] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const api = 'http://localhost:9090/transaction'

    const CustomTextField = {
        '& label.Mui-focused': {
            color: '#6378EB',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#6378EB',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#E0E3E7',
            },
            '&:hover fieldset': {
                borderColor: '#6378EB',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#6378EB',
            },
        },
    };

    const submitHandler = () => {
        if (counterparty === "" || amount === "" || description === "") {
            alert("모든 값을 입력해주세요.")
        } else {
            const request = {
                uuid: "67523c5a-2187-4715-ad13-45e133a8aaa3",
                counterparty: counterparty,
                amount: parseInt(amount),
                type: "outcome",
                description: description
            }

            fetch(api, {
                headers: {
                    'Content-Type': 'application/json' // Content-Type 설정 추가
                },
                method: 'POST',
                body: JSON.stringify(request)
            }).then( response => {
                console.log(response.status)
                if (response.status === 200) {
                    alert("거래 내역이 성공적으로 기록되었어요!")
                    setCounterparty('')
                    setAmount('')
                    setDescription('')
                }
            }).catch(err => {
                alert("거래 내역 기록 과정에서 문제가 발생헀어요...")
                console.log(err)
            })
        }
    }

    return (
        <div className="App">
            <div className="app-container">
                <div className="header">
                    <img className="header-image" src={require("./Title.png")} alt="header"/>
                    <div className="spacer"/>
                </div>
                <div className="form-container">
                    <TextField
                        sx={CustomTextField}
                        label="사용처"
                        required={true}
                        className="inputField"
                        value={counterparty}
                        onChange={(e) => {setCounterparty(e.target.value)}}
                    />
                    <TextField
                        sx={CustomTextField}
                        label="금액"
                        required={true}
                        className="inputField"
                        value={amount}
                        onChange={(e) => {setAmount(e.target.value)}}
                    />
                    <TextField
                        sx={CustomTextField}
                        label="상세 내용"
                        required={true}
                        className="inputField"
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                    />
                    <Button variant="contained"
                            sx={{ backgroundColor: '#6378EB', '&:hover': { backgroundColor: '#546FFF' }}}
                            onClick={() => submitHandler()}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default App;
