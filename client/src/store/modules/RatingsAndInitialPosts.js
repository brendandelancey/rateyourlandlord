//Current Vuex Module: Authentication module 
//Description: 
import axios from 'axios';
//import router from '../../router';

//**Probably will be adding initial post here and review because they are elements of data that will need to be changed and 
//require authentication before the action of posting can be done 
const state = {
    // queryofIPs: {},
    // searchparameters:{},
    // Ratings:{},
    queryofRatings:{},
    status: '',
    error: null
};

const getters = {
    queriedInitialPosts: state => state.queryofIPs,
    queriedRatings: state=> state.queryofRatings,
    error: state => state.error,
    status: state => state.status
};

const actions = {
    //Initial Posts
    // async fetchInitialPosts({commit}, searchparameters){
    //     // commit('making_query');
    //     // try{
        
    //     console.log("BBBBBBBB");
    //     console.log(searchparameters);
    //     let res = await axios.get('http://localhost:5000/api/initialpost/searchresults', searchparameters)
        
    //     console.log("CCCCCCCC");
    //     console.log(res);
    //     commit('setSearchResults', res.data);
    //     // if (res.data) {
    //     //     const searchparameters = res.data.searchparameters;
        
    //     //  }
    //     return res.data;
    //     // }catch (err) {
    //     //     commit('query_error', err);
    //     // }
    //     //router.push('/SearchResults');
    // },

    async createInitialPosts({commit}, newIP){
        // commit('making_query');
        try
        {
            console.log(newIP);
            let res = await axios.post('http://localhost:5000/api/initialpost/', newIP)
            
            //Should just return some success message or failure message
            console.log(res);
            
            if (res.data.status) {
                commit('createIPSuccess');   
            }
            // return res.data;
        }
        catch (err)
        {
            console.log(err);
        }
        // }catch (err) {
        //     commit('query_error', err);
        // }
    },
    //Ratings
    async fetchRatings({commit}, IPid){
        try{
            let res = await axios.get('http://localhost:5000/api/rating/', IPid);
            
            //Should ratings of specific IP 
            if (res.data) {
                commit('setRatingsSearchResults', res.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    async newRating({commit}, Rating){
        try{
 
            console.log(Rating);
            let res = await axios.post('http://localhost:5000/api/rating/', Rating)
            
            //Should just return some success message or failure message
            console.log(res);
            
            if (res.data.status) {
                commit('createRatingSuccess');
            
            }
            // return res.data;
        }
        catch (err) 
        {
            console.log(err);
        }
        // }catch (err) {
        //     commit('query_error', err);
        // }
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
    createIPSuccess(state) {
        state.error = null
        state.status = 'success'
    },
    createRatingSuccess(state) {
        state.error = null
        state.status = 'success'
    },
    // setSearchResults: (state, queryofIPs) => (state.queryofIPs = queryofIPs),
    setRatingsSearchResults: (state, queryofRatings) => (state.queryofRatings = queryofRatings),
};

export default {
    state,
    actions,
    mutations,
    getters
};