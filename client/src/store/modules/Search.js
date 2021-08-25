//Current Vuex Module: Authentication module 
//Description: 
import axios from 'axios';
//import router from '../../router';

//**Probably will be adding initial post here and review because they are elements of data that will need to be changed and 
//require authentication before the action of posting can be done 
const state = {
    // queryAddress: {},
    // queryLandlords:{},
    queryResults:{},
    searchparameters:{},
   
 
    // status: '',
    // error: null
};

const getters = {
    // queriedAddressSearchResults: state=> state.queryAddress,
    // queriedLandlordSearchResults: state=> state.queryLandlords
    queriedResults: state=> state.queryResults
    // error: state => state.error
};

const actions = {
    //Initial Posts
    async addressSearch({commit}, searchparameters){
        // commit('making_query');
        try{
        
       
        console.log(searchparameters);
        let res = await axios.get('http://localhost:5000/api/search/address', searchparameters)
        
        if (res.data) 
        {
            commit('setAddressSearchResults', res.data);
        }
        }
        catch (err) {
            console.log(err);
        }
        // return res.data;
        // }catch (err) {
        //     commit('query_error', err);
        // }
        
    },
    async landlordSearch({commit}, searchparameters){
        try
        {
            console.log(searchparameters);
            // search parameter object created in front end vue code, passed here
            let res = await axios.get('http://localhost:5000/api/search/landlord', searchparameters)
    
            console.log(res);
            if (res.data) 
            {
                commit('setLandlordSearchResults', res.data);
            }
        }
        catch (err) 
        {
            console.log(err);
        }

        
        // return res.data;
  
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