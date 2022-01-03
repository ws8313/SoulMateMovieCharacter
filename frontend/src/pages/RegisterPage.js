import React, { useState } from "react";
import axios from "axios"
import * as auth from "../module/user";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/user/register", {
                "id": userId,
                "pw": password,
                "pw2": passwordCheck
            })
            .then((res) => {
                console.log(res)
                history.push("/LoginPage");
            })
            .catch((error) => {
                console.log(error);
            })
        }

    return (
        <div>
            <input value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} />
            <input value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
            <button onClick={onSubmit}>회원가입</button>
        </div>
    );
}

export default LoginPage;