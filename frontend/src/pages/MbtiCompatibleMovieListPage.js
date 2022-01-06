import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import prevbtn from "../img/prevbtn.png";
import MovieInfoModal from "../components/MovieInfoModal";


const MbtiCompatibleMovieListPage = () => {
    const [userMBTI, setUserMBTI] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const compatibleMBTI = location.state.compatibleMBTI;

    const openModal = () => {
        setShowModal(!showModal);
    }

    // useEffect(() => {
    //     async function getMbti() {
    //         try {
    //             const mbti = await axios.get("/result/")
    //             setUserMBTI(mbti.data.user_mbti)
    //             console.log(mbti.data.user_mbti)
    //             console.log(userMBTI)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getMbti();
    // }, [userMBTI]);

    // 해당 유형의 MBTI get해서 가져와서 다 보여주던 예전 방식으로 복구 해야 할 듯

    useEffect(() => {
        async function getMbtiCharacterMovieList() {
            try {
                const res = await axios.get(`/character/movie_list/${compatibleMBTI}`)
                setMovieList(res.data.total_character_N_movies)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getMbtiCharacterMovieList();
    }, [userMBTI]);

    console.log(movieList)


    const clickHandler = (item) => {
        setSelectedMovie(item);
        console.log(item);
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
                { movieList && movieList.map((item, idx) => {
                    return (
                        <div>
                            <p key={ idx }>{ item.character_name }</p>
                            { item.movies.map((item, idx) => {
                                return (
                                    <div>
                                        <img key={ idx } src={ item.image_link } alt={ item.kor_title + "포스터" } onClick={ () => clickHandler(item) } />
                                        { showModal && <MovieInfoModal openModal={openModal} movieList={movieList} selectedMovie={selectedMovie} />}
                                        <p>{ item.kor_title }</p>
                                    </div>
                                )
                            }) }
                        </div>
                    )
                }) }
                <div>
                    <button onClick={ logout }>처음으로</button>
                </div>
            </div>

        </div>
    )
}

export default MbtiCompatibleMovieListPage;