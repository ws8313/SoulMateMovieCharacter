import React from "react";

const TestCompletedPage = ({ history }) => {
    const ans = []
            for (let i = 0; i <= localStorage.length - 1; i++) {
                ans[i] = localStorage.getItem(i);
                console.log(ans)
            }
            if(ans && ans.length > 0) {
                console.log(ans)
            }

    return (
        <div>
            <div>
                <button onClick={ () => { history.goBack() }}>뒤로가기</button>
            </div>

            <div>
                <p>일리스</p>
            </div>

            <div>
                <div>테스트가 완료되었습니다</div>
            </div>
            
            <div>
                <button>나와 같은 유형인 캐릭터 확인하기</button>
            </div>

            <div>
                <button>나와 궁합이 잘 맞는 캐릭터 확인하기</button>
            </div>

            <div>
                <button>같은 유형에게 인기있는 영화 확인하기</button>
            </div>
        </div>
    )
}

export default TestCompletedPage;