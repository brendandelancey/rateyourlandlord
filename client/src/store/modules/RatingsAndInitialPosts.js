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
    queryofRatings:[],
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
                return true;   
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
        console.log(JSON.stringify(IPid));
        console.log(IPid);
        var listOfDataObjects=[];
        try{
            const res = await axios.get('http://localhost:5000/api/rating/', {
                params:{
                    "IPid" : IPid}
                
            } );
            
            //Should ratings of specific IP 
            if (res.data) {
                if (res.data.length>0){
                    for (var rating in res.data){
                        console.log(res.data[rating])
                        listOfDataObjects.push(res.data[rating])}
                        
                    }
            }
        }
        catch (err) {
            console.log(err);
        }
        if(listOfDataObjects!=null){
            for(var item in listOfDataObjects){
                console.log(JSON.stringify(listOfDataObjects[item]));
            }
            commit('setRatingsSearchResults', listOfDataObjects);
            return true; 
        }
    },
    async newRating({commit}, Rating){
        console.log("In There");
        try{
 
            console.log(Rating);
            let res = await axios.post('http://localhost:5000/api/rating/', Rating)
            
            //Should just return some success message or failure message
            console.log(res);
            
            if (res.data.status) {
                commit('createRatingSuccess');
                return true;
            
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