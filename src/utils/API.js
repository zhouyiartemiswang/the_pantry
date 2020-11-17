const URL_PREFIX = "http://localhost:8080"
// const URL_PREFIX = "https://the-pantry-api.herokuapp.com/"

const API = {
    //////////////////////////// User Calls ////////////////////////////
    getAllUsers:function(){
        return fetch(`${URL_PREFIX}/api/users`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getOneUser:function(id){
        return fetch(`${URL_PREFIX}/api/users/${id}`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getBuyer:function(token){
        return fetch(`${URL_PREFIX}/api/users/buyer`,{
            method:"GET",
            headers: {
                "authorization": `Bearer ${token}`
              },
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getBaker:function(token){
        return fetch(`${URL_PREFIX}/api/users/baker`,{
            method:"GET",
            headers: {
                "authorization": `Bearer ${token}`
              },
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    createUser:function(info){
        return fetch(`${URL_PREFIX}/api/users`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    loginUser:function(info){
        return fetch(`${URL_PREFIX}/api/users/login`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    //////////////////////////// Order Calls ////////////////////////////
    getAllOrders:function(){
        return fetch(`${URL_PREFIX}/api/orders`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getOneOrder:function(id){
        return fetch(`${URL_PREFIX}/api/orders/${id}`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    createOrder:function(token, info){
        return fetch(`${URL_PREFIX}/api/orders`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getEditOrder:function(token, info, id){
        return fetch(`${URL_PREFIX}/api/orders/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    deleteOrder:function(token, id){
        return fetch(`${URL_PREFIX}/api/orders/${id}`,{
            method:"DELETE",
            headers: {
                "authorization": `Bearer ${token}`
              }
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },

    //////////////////////////// InvChanges Calls ////////////////////////////
    getAllInvChanges:function(){
        return fetch(`${URL_PREFIX}/api/invchanges`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getOneInvChanges:function(id){
        return fetch(`${URL_PREFIX}/api/invchanges/${id}`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    createInvChanges:function(token, info){
        return fetch(`${URL_PREFIX}/api/invchanges`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getEditInvChanges:function(token, info, id){
        return fetch(`${URL_PREFIX}/api/invchanges/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    deleteInvChanges:function(token, id){
        return fetch(`${URL_PREFIX}/api/invchanges/${id}`,{
            method:"DELETE",
            headers: {
                "authorization": `Bearer ${token}`
              }
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },

    //////////////////////////// Inventory Calls ////////////////////////////
    getAllInventory:function(){
        return fetch(`${URL_PREFIX}/api/inventory`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getOneInventory:function(id){
        return fetch(`${URL_PREFIX}/api/inventory/${id}`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    createInventory:function(token, info){
        return fetch(`${URL_PREFIX}/api/inventory`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getEditInventory:function(token, info, id){
        return fetch(`${URL_PREFIX}/api/inventory/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    deleteInventory:function(token, id){
        return fetch(`${URL_PREFIX}/api/inventory/${id}`,{
            method:"DELETE",
            headers: {
                "authorization": `Bearer ${token}`
              }
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },

    //////////////////////////// PreMade Calls ////////////////////////////
    getAllPreMade:function(){
        return fetch(`${URL_PREFIX}/api/premade`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getOnePreMade:function(id){
        return fetch(`${URL_PREFIX}/api/premade/${id}`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    createPreMade:function(token, info){
        return fetch(`${URL_PREFIX}/api/premade`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getEditPreMade:function(token, info, id){
        return fetch(`${URL_PREFIX}/api/premade/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    deletePreMade:function(token, id){
        return fetch(`${URL_PREFIX}/api/premade/${id}`,{
            method:"DELETE",
            headers: {
                "authorization": `Bearer ${token}`
              }
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },

    //////////////////////////// Pricing Calls ////////////////////////////
    getAllPricing:function(){
        return fetch(`${URL_PREFIX}/api/pricing`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getOnePricing:function(id){
        return fetch(`${URL_PREFIX}/api/pricing/${id}`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    createPricing:function(token, info){
        return fetch(`${URL_PREFIX}/api/pricing`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getEditPricing:function(token, info, id){
        return fetch(`${URL_PREFIX}/api/pricing/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    deletePricing:function(token, id){
        return fetch(`${URL_PREFIX}/api/pricing/${id}`,{
            method:"DELETE",
            headers: {
                "authorization": `Bearer ${token}`
              }
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },

    //////////////////////////// Revenue Calls ////////////////////////////
    getAllRevenue:function(){
        return fetch(`${URL_PREFIX}/api/revenue`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getOneRevenue:function(id){
        return fetch(`${URL_PREFIX}/api/revenue/${id}`,{
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    createRevenue:function(token, info){
        return fetch(`${URL_PREFIX}/api/revenue`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    getEditRevenue:function(token, info, id){
        return fetch(`${URL_PREFIX}/api/revenue/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
              },
            body:JSON.stringify(info)
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    },
    deleteRevenue:function(token, id){
        return fetch(`${URL_PREFIX}/api/revenue/${id}`,{
            method:"DELETE",
            headers: {
                "authorization": `Bearer ${token}`
              }
        }).then(function(res){
            return res.json();
        }).catch(function(err){
            return null;
        });
    }
}

module.exports = API;