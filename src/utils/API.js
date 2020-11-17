const URL_PREFIX = "http://localhost:8080"
// const URL_PREFIX = "https://the-pantry-api.herokuapp.com/"

const API = {
    getEditOrder: function (token, info) {
        /*
        const [loginFormState, setLoginFormState] = useState({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpckBraXIua2lyIiwiaWQiOjMsImFkZHJlc3MiOiJzdHJlZXQiLCJwaG9uZSI6IjU1NTU1NTU1NTUiLCJpc093bmVyIjp0cnVlLCJpYXQiOjE2MDU2Mzc3MDMsImV4cCI6MTYwNTY0NDkwM30.RFIGKY8D8AisGXLz6VqNUISUPvgPh6PMvdrOSczyIfU",
            data: {sale: 15, ingredients: "stuff", deadline: "2020-11-17", status: "pending", description: "desc"s}
        });
        */
        console.log(token);
        //API.getEditOrder(loginFormState.token, loginFormState.data)
        console.log(JSON.stringify(info));
        return fetch(`${URL_PREFIX}/api/orders/1`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(res => res.json()).catch(err => null)
    },
    createOrder: function (token, info) {
        /*
        token2: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdEBrYXQua2F0IiwiaWQiOjIsImFkZHJlc3MiOiJzdHJlZXQiLCJwaG9uZSI6IjU1NTU1NTU1NTUiLCJpc093bmVyIjpmYWxzZSwiaWF0IjoxNjA1NjM4MDIyLCJleHAiOjE2MDU2NDUyMjJ9.lQrAbrVmcjclGWYOpZ0Fbo_MdV5Io4Ei5q-BnhIIds4",
        data2: {sale: 25, ingredients: "stuffz", deadline: "2020-11-17", status: "pending", description: "desc", baker_id: 1}
        */
        console.log(JSON.stringify(info));
        //API.getEditOrder(loginFormState.token, loginFormState.data)
        return fetch(`${URL_PREFIX}/api/orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(res => res.json()).catch(err => null)
    },
    getOneOrder: function (id) {
        return fetch(`${URL_PREFIX}/api/orders/${id}`, {
        }).then(res => res.json()).catch(err => null)
    },
    getAllOrders: function () {
        return fetch(`${URL_PREFIX}/api/orders/`, {
        }).then(res => res.json()).catch(err => null)
    },
    deleteOrder: function (token, orderId) {
        return fetch(`${URL_PREFIX}/api/orders/${orderId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).catch(err => null)
    }
}

module.exports = API;