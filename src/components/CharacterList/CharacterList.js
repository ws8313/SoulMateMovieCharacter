import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./CharacterList.module.css"

const CharacterList = ({ characterList, compatibleMBTI }) => {
  const history = useHistory();

  const clickHandler = (idx) => {
    history.push({
      pathname: compatibleMBTI ? "/MbtiCharacterMovieListPage" : "/MbtiCompatibleMovieListPage",
      state: {
        idx: idx,
        charList: characterList,
      },
    });
  };

  return (
    <div className={styles.character_list}>
        {characterList &&
          characterList.map((item, idx) => {
            return (
              <div key={idx}>
                <img
                  className={styles.character_img}
                  src={item[2]}
                  alt={item[1] + " 사진"}
                  onClick={() => clickHandler(idx)}
                />
                <div className={styles.character_name}>{item[1]}</div>
              </div>
            );
          })}
      </div>
  )
}

export default CharacterList;