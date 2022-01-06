// import React, { useState, useEffect } from "react";
// import { FaStar } from "react-icons/fa";
// import styles from "./Rating.module.css";

// const colors = {
//     orange: "#FFBA5A",
//     grey: "#a9a9a9"
// }

// const Rating = () => {
//     const [curValue, setCurValue] = useState(0);
//     const [hoverValue, setHoverValue] = useState(undefined);

//     const stars = Array(5).fill(0);

//     const handleClick = (value) => {
//         setCurValue(value)
//     };

//     const handleMouseOver = (value) => {
//         setHoverValue(value)
//     };
    
//     const handleMouseLeave = () => {
//         setHoverValue(undefined)
//     };

//     console.log(curValue)

//     return (
//         <div className={styles.RatingContainer}>
//             <p>평가하기</p>
//             <div className={styles.stars}>
//                 {stars.map((_, index) => {
//                     return (
//                         <FaStar 
//                             key={index}
//                             size={24}
//                             style={{
//                                 marginRight: 10,
//                                 cursor: "pointer"
//                             }}
//                             color={ (hoverValue || curValue) > index ? colors.orange : colors.grey }
//                             onClick={ () => handleClick(index + 1) }
//                             onMouseOver={ () => handleMouseOver(index + 1) }
//                             onMouseLeave={ handleMouseLeave }
//                         />
//                     )
//                 })}
//             </div>
//         </div>
//     );
// }

// export default Rating;