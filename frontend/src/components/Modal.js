import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./Modal.module.css";
import closebtn from "../img/closebtn.png";

const Modal = ({ openModal }) => {
    const [selected, setSelected] = useState("ISTJ");

    const history = useHistory();

    const changeSelectOptionHandler = (e) => {
        setSelected(e.target.value);
    }

    const clickHandler = () => {
        axios
            .post("/result/", {
                "user_mbti": selected
            })
            .then((res) => {
                console.log(res)
                history.push("/TestCompletedPage")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    console.log(selected)

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal}>
                <img src={closebtn} alt="closebtn" onClick={ openModal } className={styles.modal_button} />
                <select onChange={ changeSelectOptionHandler }>
                    <option value="ISTJ">ISTJ</option>
                    <option value="ISTP">ISTP</option>
                    <option value="ISFJ">ISFJ</option>
                    <option value="ISFP">ISFP</option>
                    <option value="INTJ">INTJ</option>
                    <option value="INTP">INTP</option>
                    <option value="INFJ">INFJ</option>
                    <option value="INFP">INFP</option>
                    <option value="ESTJ">ESTJ</option>
                    <option value="ESTP">ESTP</option>
                    <option value="ESFJ">ESFJ</option>
                    <option value="ESFP">ESFP</option>
                    <option value="ENTJ">ENTJ</option>
                    <option value="ENTP">ENTP</option>
                    <option value="ENFJ">ENFJ</option>
                    <option value="ENFP">ENFP</option>
                </select>
                <button onClick={ clickHandler }>확인</button>
            </div>
        </div>
    )
}

export default Modal;