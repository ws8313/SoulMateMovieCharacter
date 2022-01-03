import React, { useState } from "react";
import axios from "axios"
import * as auth from "../module/user";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const onSubmit = () => {
        axios
            .post("/user/login", {
                "id": userId,
                "pw": password,
            },)
            .then((res) => {
                console.log(res)
                history.push("/MainPage");
            })
            .catch((error) => {
                console.log(error);
            })
        }

    const signUp = () => {
        history.push("/RegisterPage")
        }
    console.log(userId, password)

    return (
        <div>
            <input value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={onSubmit}>로그인</button>
            <button onClick={signUp}>회원가입</button>
        </div>
    );
}

export default LoginPage;