import firebase, { database } from "../../firebase"

export const registerUserFirebase = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            console.log('register sukses', user);
            dispatch({type: 'CHANGE_LOADING', value: false})
            resolve(true);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log('Register GAGAL', errorCode, errorMessage);
            dispatch({type: 'CHANGE_LOADING', value: false})
            reject(false);
        });
    })

}


export const loginUserFirebase = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        
        dispatch({type: 'CHANGE_LOADING', value: true})
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
                console.log('Login Sukses', user);
                const dataUser = {
                    email: user.multiFactor.user.email,
                    uid: user.multiFactor.user.uid,
                    emailVerified: user.multiFactor.user.emailVerified,
                }
                dispatch({type: 'CHANGE_LOADING', value: false})
                dispatch({type: 'CHANGE_ISLOGIN', value: true})
                dispatch({type: 'CHANGE_USER', value: dataUser})
                resolve(dataUser);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log('Login Tidak sukses', errorCode, errorMessage);
                dispatch({type: 'CHANGE_LOADING', value: false});
                dispatch({type: 'CHANGE_ISLOGIN', value: false});
                reject(false)
            })
    })
}


export const addDataToFirebase = (data) => (dispatch) => {
    database.ref('reimbursement/' + data.userId).push({
        transaction_date : data.transaction_date,
        reimbursement_cost : data.reimbursement_cost,
        reimbursement_status : "New",
        reimbursement_title : data.reimbursement_title,
        reimbursement_desc: data.reimbursement_desc,
        reimbursement_type : data.reimbursement_type,
        proof_transaction: data.proof_transaction,
        type_proof_transaction: data.type_proof_transaction,
        request_date: data.request_date,
        emplpoyee_id: data.userId,
        employee_name: data.employee_name
      })
}


export const getDataFromFirebase = (userId) => (dispatch) => {
    const url =  database.ref('reimbursement/' + userId);

    new Promise((resolve, reject) => {
        url.on('value', (snapshot) => {
            // const data = snapshot.val();
            // updateStarCount(postElement, data);
            console.log('getData ->', snapshot.val())
            const data = [];
            if(snapshot.val()){
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key]
                    })
                });
            } else {
                return data;
            }

            dispatch({type : 'SET_DATA', value: data})
            resolve(snapshot.val())
            })
    })
}


export const logOut  = () => (dispatch) => {
    return new Promise((resolve, reject) =>{
        dispatch({type: 'CHANGE_ISLOGIN', value: false})
        resolve(true)
    })
}

