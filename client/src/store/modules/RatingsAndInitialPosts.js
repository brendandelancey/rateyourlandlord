
import axios from 'axios';
import config from "../../../config/env.js"
const url=config.LOCAL

const state = {
 
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

    async createInitialPosts({commit}, newIP){
        // commit('making_query');
       
        try
        {
         // console.log(newIP);
            var res = await axios.post(url+'/initialpost/', newIP)
            
            //Should just return some success message or failure message
         // console.log(res);
            
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
       
    },
   
    async fetchRatings({commit}, IPid){
     // console.log(JSON.stringify(IPid));
     // console.log(IPid);
        var listOfDataObjects=[];
        try{
            const res = await axios.get(url+'/rating/', {
                params:{
                    "IPid" : IPid}
                
            } );
            
            //Should ratings of specific IP 
            if (res.data) {
                if (res.data.length>0){
                    for (var rating in res.data){
                     // console.log(res.data[rating])
                        listOfDataObjects.push(res.data[rating])}
                        
                    }
            }
        }
        catch (err) {
         // console.log(err);
        }
        if(listOfDataObjects!=null){
            // for(var item in listOfDataObjects){
             // console.log(JSON.stringify(listOfDataObjects[item]));
            // }
            commit('setRatingsSearchResults', listOfDataObjects);
            return true; 
        }
    },
    async newRating({commit}, Rating){
     // console.log("In There");
        try{
 
         // console.log(Rating);
            var res = await axios.post(url+'/rating/', Rating)
            
            //Should just return some success message or failure message
         // console.log(res);
            
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

    createIPSuccess(state) {
        state.error = null
        state.status = 'success'
    },
    createRatingSuccess(state) {
        state.error = null
        state.status = 'success'
    },
    setRatingsSearchResults: (state, queryofRatings) => (state.queryofRatings = queryofRatings),
};

export default {
    state,
    actions,
    mutations,
    getters
};