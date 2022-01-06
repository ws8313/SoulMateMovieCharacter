import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import prevbtn from "../img/prevbtn.png";
import Modal from "../components/Modal";

const MainPage = () => {
    const [showModal, setShowModal] = useState(false);

    const history = useHistory();

    const openModal = () => {
        setShowModal(!showModal);
    }

    return (
        <div id="container">
            <div className="title">
                <div>일리스</div>
            </div>

            <div id="btnbox" onClick={ () => { history.goBack() }}>
                <img className="prevbtn" src={prevbtn} alt="prevbtn" />
            </div>

            <div id="divider"></div>

            <div id="img">
                <div className="mainimg">이미지</div>
            </div>

            <div>
                <div id="maintext1">코로나 시국에..</div>
                <div id="maintext2">이런게 나의 영화 인생캐 일리가...!!</div>
            </div>
            
            <div>
                <button id="leftbtn" onClick={ () => { history.push("/TestPage") }}>인생캐 알아보기</button>
            </div>

            <div>
                <button id="rightbtn" onClick={openModal}>바로 결과 보기</button>
                { showModal && <Modal openModal={openModal} />}
            </div>
        </div>
    )
}

export default MainPage;