import React, { useState } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const history = useHistory();

    const onSubmit = () => {
        axios
            .post("/user/register", {
                "id": userId,
                "pw": password,
                "pw2": passwordCheck
            })
            .then((res) => {
                if (res.status && res.status === 202) {
                    alert("이미 사용 중인 아이디입니다.")
                    console.log(res.data.result)
                } else {
                    console.log(res)
                    history.push("/")
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    console.log(userId, password, passwordCheck)

    return (
        <div>
            <input value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
            <button onClick={onSubmit}>회원가입</button>
        </div>
    );
}

export default LoginPage;