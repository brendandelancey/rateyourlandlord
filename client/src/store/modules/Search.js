//Current Vuex Module: Authentication module 
//Description: 
import axios from 'axios';
//import router from '../../router';

//**Probably will be adding initial post here and review because they are elements of data that will need to be changed and 
//require authentication before the action of posting can be done 
const state = {
    // queryAddress: {},
    // queryLandlords:{},
    queryResults:[],
    searchparameters:{},
    todos: [
        {
            id: 1,
            title: 'Go outside'
        },
        {
            id: 2,
            title: 'Come back in'
        }
    ]
   
 
    // status: '',
    // error: null
};

const getters = {
    // queriedAddressSearchResults: state=> state.queryAddress,
    // queriedLandlordSearchResults: state=> state.queryLandlords
    queriedResults: (state) => state.queryResults
    // error: state => state.error
};

const actions = {
    //Initial Posts
    async addressSearch({commit}, searchparameters){
        // commit('making_query');

        var listOfDataObjects=[];
        for (const call in searchparameters){

            try{
            
            console.log("!!!!!!!!!!!!!!!!!");

            console.log(JSON.stringify(searchparameters[call]));
            const res = await axios.get('http://localhost:5000/api/search/address', {
                params:
                    searchparameters[call]
                
            } 
            )
            // const res = {data:null};

            // Combine Both IF Statements
            if (res.data) 
            {
                console.log("res.data");
                console.log(JSON.stringify(res.data));
                console.log("res.data[0]");
                console.log(JSON.stringify(res.data[0]));
                if (res.data.length>0){
                    console.log("It Should Be Here 11111111111111111111111")
                    for (var review in res.data){
                        console.log("It Should Be Here 22222222222222222222222")
                        console.log(res.data[review])
                        listOfDataObjects.push(res.data[review])}
                }
                
               

            }
            }
            catch (err) {
                console.log(err);
            }
            // return res.data;
            // }catch (err) {
            //     commit('query_error', err);
            // }
        }
        if(listOfDataObjects!=null){
            console.log("listOfDataObjects")
            for(var item in listOfDataObjects){
                console.log(JSON.stringify(listOfDataObjects[item]));
            }
            commit('setAddressSearchResults', listOfDataObjects);
            return true;
        }
        
    },
    async landlordSearch({commit}, searchparameters){
        var listOfDataObjects=[];
        for (const call in searchparameters){
            try
            {
                console.log(JSON.stringify(searchparameters[call]));
                // search parameter object created in front end vue code, passed here
                let res = await axios.get('http://localhost:5000/api/search/landlord', {
                    params:
                        searchparameters[call]
                    
                } )
        
             // Combine Both IF Statements
            if (res.data) 
            {
                console.log("res.data");
                console.log(JSON.stringify(res.data));
                console.log("res.data[0]");
                console.log(JSON.stringify(res.data[0]));
                if (res.data.length>0){
                    console.log("It Should Be Here 11111111111111111111111")
                    for (var review in res.data){
                        console.log("It Should Be Here 22222222222222222222222")
                        console.log(res.data[review])
                        listOfDataObjects.push(res.data[review])}
                }
                
               

            }
            }
            catch (err) {
                console.log(err);
            }
            // return res.data;
            // }catch (err) {
            //     commit('query_error', err);
            // }
        }
        if(listOfDataObjects!=null){
            console.log("listOfDataObjects")
            for(var item in listOfDataObjects){
                console.log(JSON.stringify(listOfDataObjects[item]));
            }
            commit('setAddressSearchResults', listOfDataObjects);
            return true;
        }
    },

    async advancedSearch({commit}, searchparameters){
        // commit('making_query');

        var listOfDataObjects=[];
       

            try{
            
            console.log("!!!!!!!!!!!!!!!!!");

            console.log(JSON.stringify(searchparameters));
            const res = await axios.get('http://localhost:5000/api/search/advanced', {
                params:
                    searchparameters
                
            } 
            )
            // const res = {data:null};

            // Combine Both IF Statements
            if (res.data) 
            {
                console.log("res.data");
                console.log(JSON.stringify(res.data));
                console.log("res.data[0]");
                console.log(JSON.stringify(res.data[0]));
                if (res.data.length>0){
                    console.log("It Should Be Here 11111111111111111111111")
                    for (var review in res.data){
                        console.log("It Should Be Here 22222222222222222222222")
                        console.log(res.data[review])
                        listOfDataObjects.push(res.data[review])}
                }
                
               

            }
            }
            catch (err) {
                console.log(err);
            }
            // return res.data;
            // }catch (err) {
            //     commit('query_error', err);
            // }
        
        if(listOfDataObjects!=null){
            console.log("listOfDataObjects")
            for(var item in listOfDataObjects){
                console.log(JSON.stringify(listOfDataObjects[item]));
            }
            commit('setAddressSearchResults', listOfDataObjects);
            return true;
        }
        
    },
};

const mutations = {
    // making_query(state) {
    //     state.error = null
    //     state.status = 'loading'
    // },
    // query_error(state, err) {
    //     state.error = err.response.data.msg
    // },
    // setAddressSearchResults: (state, queryAddress) => (state.queryAddress = queryAddress),
    // setLandlordSearchResults: (state, queryLandlords) => (state.queryLandlords = queryLandlords),
    // ? This may be wrong
    setAddressSearchResults: (state, queryAddress) => (state.queryResults = queryAddress),
    setLandlordSearchResults: (state, queryLandlords) => (state.queryResults = queryLandlords)
};

export default {
    state,
    actions,
    mutations,
    getters
};