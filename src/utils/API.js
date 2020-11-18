const URL_PREFIX = "http://localhost:8080"
// const URL_PREFIX = "https://the-pantry-api.herokuapp.com/"

const API = {
    //////////////////////////// User Calls ////////////////////////////
    getAllUsers: function () {
        return fetch(`${URL_PREFIX}/api/users`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // requires: user id(integer)
    getOneUser: function (id) {
        return fetch(`${URL_PREFIX}/api/users/${id}`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: buyer to be logged in
    // requires: bearer token(string)
    getBuyer: function (token) {
        return fetch(`${URL_PREFIX}/api/users/buyer`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            },
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string)
    getBaker: function (token) {
        return fetch(`${URL_PREFIX}/api/users/baker`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            },
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // requires: email(string), username(string), password(string), address(string), phone(string), isOwner(bool)
    createUser: function (info) {
        return fetch(`${URL_PREFIX}/api/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // requires: email(string), password(string)
    loginUser: function (info) {
        return fetch(`${URL_PREFIX}/api/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    //////////////////////////// Order Calls ////////////////////////////
    getAllOrders: function () {
        return fetch(`${URL_PREFIX}/api/orders`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // requires: order id(integer)
    getOneOrder: function (id) {
        return fetch(`${URL_PREFIX}/api/orders/${id}`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: user to be logged in
    // requires: bearer token(string), sale(decimal), ingredients(string), deadline(date), status(string), description(string), baker_id(integer)
    createOrder: function (token, info) {
        return fetch(`${URL_PREFIX}/api/orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), order id(integer), sale(decimal), ingredients(string), deadline(date), status(string), description(string)
    editOrder: function (token, id, info) {
        return fetch(`${URL_PREFIX}/api/orders/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), order id(integer)
    deleteOrder: function (token, id) {
        return fetch(`${URL_PREFIX}/api/orders/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },

    //////////////////////////// InvChanges Calls ////////////////////////////
    getAllInvChanges: function () {
        return fetch(`${URL_PREFIX}/api/invchanges`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // requires: invchanges id(integer)
    getOneInvChanges: function (id) {
        return fetch(`${URL_PREFIX}/api/invchanges/${id}`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },

    // expects: baker to be logged in
    // requires: bearer token(string), ingredients(string), handled(boolean), origin(string)
    createInvChanges: function (token, info) {
        return fetch(`${URL_PREFIX}/api/invchanges`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },

    // expects: baker to be logged in
    // requires: bearer token(string), invchanges id(integer), ingredients(string), handled(boolean), origin(string)
    editInvChanges: function (token, id, info) {
        return fetch(`${URL_PREFIX}/api/invchanges/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },

    // expects: baker to be logged in
    // requires: bearer token(string), invchanges id(integer)
    deleteInvChanges: function (token, id) {
        return fetch(`${URL_PREFIX}/api/invchanges/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },

    //////////////////////////// Inventory Calls ////////////////////////////
    getAllInventory: function () {
        return fetch(`${URL_PREFIX}/api/inventory`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // requires: inventory id(integer)
    getOneInventory: function (id) {
        return fetch(`${URL_PREFIX}/api/inventory/${id}`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), name(string), quantity(integer), metric(string), expires(date)
    createInventory: function (token, info) {
        return fetch(`${URL_PREFIX}/api/inventory`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), inventory id(integer), name(string), quantity(integer), metric(string), expires(date)
    editInventory: function (token, info, id) {
        return fetch(`${URL_PREFIX}/api/inventory/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), inventory id(integer)
    deleteInventory: function (token, id) {
        return fetch(`${URL_PREFIX}/api/inventory/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },

    //////////////////////////// PreMade Calls ////////////////////////////
    getAllPreMade: function () {
        return fetch(`${URL_PREFIX}/api/premade`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // requires: premade id(integer)
    getOnePreMade: function (id) {
        return fetch(`${URL_PREFIX}/api/premade/${id}`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), name(string), price(decimal), ingredients(string), description(string), img(string)
    createPreMade: function (token, info) {
        return fetch(`${URL_PREFIX}/api/premade`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), premade id(integer), name(string), price(decimal), ingredients(string), description(string), img(string)
    editPreMade: function (token, id, info) {
        return fetch(`${URL_PREFIX}/api/premade/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), premade id(integer)
    deletePreMade: function (token, id) {
        return fetch(`${URL_PREFIX}/api/premade/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },

    //////////////////////////// Pricing Calls ////////////////////////////
    getAllPricing: function () {
        return fetch(`${URL_PREFIX}/api/pricing`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // requires: pricing id(integer)
    getOnePricing: function (id) {
        return fetch(`${URL_PREFIX}/api/pricing/${id}`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), name(string), price(decimal), type(string)
    createPricing: function (token, info) {
        return fetch(`${URL_PREFIX}/api/pricing`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), pricing id(integer), name(string), price(decimal), type(string)
    editPricing: function (token, info, id) {
        return fetch(`${URL_PREFIX}/api/pricing/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), pricing id(integer)
    deletePricing: function (token, id) {
        return fetch(`${URL_PREFIX}/api/pricing/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },

    //////////////////////////// Revenue Calls ////////////////////////////
    getAllRevenue: function () {
        return fetch(`${URL_PREFIX}/api/revenue`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // requires: revenue id(integer)
    getOneRevenue: function (id) {
        return fetch(`${URL_PREFIX}/api/revenue/${id}`, {
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), ingredients(decimal), sales(decimal), month(string)
    createRevenue: function (token, info) {
        return fetch(`${URL_PREFIX}/api/revenue`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), revenue id(integer), ingredients(decimal), sales(decimal), month(string)
    editRevenue: function (token, info, id) {
        return fetch(`${URL_PREFIX}/api/revenue/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info)
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    },
    // expects: baker to be logged in
    // requires: bearer token(string), revenue id(integer)
    deleteRevenue: function (token, id) {
        return fetch(`${URL_PREFIX}/api/revenue/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(function (res) {
            return res.json();
        }).catch(function (err) {
            return null;
        });
    }
}

module.exports = API;