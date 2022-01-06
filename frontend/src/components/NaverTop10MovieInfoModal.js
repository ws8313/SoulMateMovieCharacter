import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./NaverTop10MovieInfoModal.module.css";
import closebtn from "../img/closebtn.png";
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}

const NaverTop10MovieInfoModal = ({ openModal, selectedMovie }) => {
    const [curValue, setCurValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [satisfactionList, setSatisfactionList] = useState([]);

    const [movieId, setMovieId] = useState("");
    const [rating, setRating] = useState("");

    const stars = Array(5).fill(0);

    const history = useHistory();

    const handleClick = (value) => {
        setCurValue(value)
        setMovieId(selectedMovie.id)
        setRating(value * 2)

        let list = [...satisfactionList]
        list = [[
            movieId,
            rating
            ]]
        setSatisfactionList(list)

        return satisfactionList;
    };

    useEffect(() => {
        let list = [...satisfactionList]
        list = [[
            movieId,
            rating
            ]]
        setSatisfactionList(list)
    }, [movieId, rating])

    const handleMouseOver = (value) => {
        setHoverValue(value)
    };
    
    const handleMouseLeave = () => {
        setHoverValue(undefined)
    };

    const sendReview = () => {
        axios
            .post("/character/movie_list", {
                "satisfaction_list": satisfactionList
            })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    console.log(selectedMovie)
    // console.log(curValue)
    // console.log(movieId)
    // console.log(rating)
    // console.log(satisfactionList)

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal}>
                <img src={closebtn} alt="closebtn" onClick={ openModal } className={styles.modal_button} />
                <img src={selectedMovie[3]} />
                <p>감독 : {selectedMovie[5]}</p>
                <p>장르 : {selectedMovie[9]}</p>
                <p>제목 : {selectedMovie[1]}</p>
                <p>개봉년도 : {selectedMovie[4]}년</p>
                <p>평점 : {selectedMovie[6]}점</p>
                <p>러닝타임 : {selectedMovie[8]}분</p>
                <p>소개 : {selectedMovie[7]}</p>
                <div className={styles.RatingContainer}>
                    <div className={styles.stars}>
                        {stars.map((_, index) => {
                            return (
                                <FaStar 
                                    key={index}
                                    size={24}
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer"
                                    }}
                                    color={ (hoverValue || curValue) > index ? colors.orange : colors.grey }
                                    onClick={ () => handleClick(index + 1) }
                                    onMouseOver={ () => handleMouseOver(index + 1) }
                                    onMouseLeave={ handleMouseLeave }
                                    
                                />
                            )
                        
                        })}
                        <button onClick={ sendReview }>평가하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NaverTop10MovieInfoModal;