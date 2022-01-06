import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import prevbtn from "../img/prevbtn.png";
import Top10MovieInfoModal from "../components/Top10MovieInfoModal";
import NaverTop10MovieInfoModal from "../components/NaverTop10MovieInfoModal";


const MbtiTop10Page = () => {
    const [top10, setTop10] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const history = useHistory();

    const openModal = () => {
        setShowModal(!showModal);
    }

    useEffect(() => {
        async function getTop10() {
            try {
                const res = await axios.get("/result/top10")
                setTop10(res.data)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getTop10();
    }, []);

    // useEffect(() => {
    //     async function getMbtiCharacter() {
    //         try {
    //             const res = await axios.get(`/character/0/${userMBTI}`)
    //             setCharList(res.data.character_info)
    //             console.log(res)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getMbtiCharacter();
    // }, [userMBTI, selectedChar]);

    console.log(top10)


    const mouseOverHandler = (e) => {
    }

    const clickHandler = (item) => {
        setSelectedMovie(item);
        console.log(item)
        openModal();
    }

    const logout = () => {
        axios
            .get("/user/logout")
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
        history.push("/")
    }
    
    const prevClick = () => {
    }
    
    return (
        <div id="container">
            <div id="btnbox" onClick={  () => { history.goBack() } }>
                <img className="prevbtn" src={ prevbtn } alt="prevbtn" />
            </div>

            <div className="title">
                <p>일리스</p>
            </div>

            <div id="divider"></div>

            <div>
                <p>나와 같은 유형의 영화 속 캐릭터</p>
            </div>

            <div>
                <p>같은 유형에게 인기있는 영화 TOP 10</p>
                { top10.top10_for_same_mbti_users && top10.top10_for_same_mbti_users.map((item, idx) => {
                    return (
                        <div key={ idx }>
                            <img src={ item[2] } alt={ item[0] + " 포스터" }  onClick={ () => clickHandler(item) } />
                            { showModal && <Top10MovieInfoModal openModal={openModal} selectedMovie={selectedMovie} />}
                            <p>{ item[0] }</p>
                        </div>
                    )
                }) }
            </div>

            <div>
                <p>네이버 인기있는 영화 TOP 10</p>
                { top10.top10_in_naver && top10.top10_in_naver.map((item, idx) => {
                    return (
                        <div key={ idx }>
                            <img src={ item[3] } alt={ item[1] + "포스터" }  onClick={ () => clickHandler(item) } />
                            { showModal && <NaverTop10MovieInfoModal openModal={openModal} selectedMovie={selectedMovie} />}
                            <p>{ item[1] }</p>
                        </div>
                    )
                }) }
            </div>

            <div>
                <p>워드클라우드 {top10.word_cloud_src}</p>
            </div>

            <div>
                <button onClick={ logout }>처음으로</button>
            </div>
        </div>
    )
}

export default MbtiTop10Page;