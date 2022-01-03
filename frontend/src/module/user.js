// const login = () => {
//     return function (dispatch, getState, { history }) {
//         axios({
//             method: "post",
//             url: "http://http://127.0.0.1:5000/user/login",
//             data: {
//                 "id": "id",
//                 "pw": "pw",
//             },
//         })
//             .then((res) => {
//                 console.log(res);
//                 dispatch(
//                     setUser({
                        
//                     })
//                 )
//             })
//     }
// }

// const register = (id, pw, pw2) => {
//     return function (dispatch, getState, { history }) {
//         axios({
//             method: "post",
//             url: "http://localhost:5000/user/register",
//             data: {
//                 "id": "id",
//                 "pw": "pw",
//                 "pw2" : "pw2",
//             },
//         })
//         .then((res) => {
//             window.alert(res.data.result);
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     }
// }