
import axios from 'axios';

const state = {
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
   
 
   
};

const getters = {
    queriedResults: (state) => state.queryResults
    
};

const actions = {
    // Might be able to remove loops adding to a list if data is sent as a list



    //Initial Posts
    async addressSearch({commit}, searchparameters){
        // commit('making_query');

        var listOfDataObjects=[];
        for (const call in searchparameters){

            try{
            
            console.log("!!!!!!!!!!!!!!!!!");

            console.log(JSON.stringify(searchparameters[call]));
            const res = await axios.get('http://rateyourstudenthouse.com:5000/api/search/address', {
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
            console.log(JSON.stringify(listOfDataObjects[item]));
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

                var res = await axios.get('http://rateyourstudenthouse.com:5000/api/search/landlord', {
                    params:
                        searchparameters[call]
                    
                } )
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

        var listOfDataObjects=[];
       

            try{
            
            console.log("!!!!!!!!!!!!!!!!!");

            console.log(JSON.stringify(searchparameters));
            const res = await axios.get('http://rateyourstudenthouse.com:5000/api/search/advanced', {
                params:
                    searchparameters
                
            } 
            )

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
   
    setAddressSearchResults: (state, queryAddress) => (state.queryResults = queryAddress),
    setLandlordSearchResults: (state, queryLandlords) => (state.queryResults = queryLandlords)
};

export default {
    state,
    actions,
    mutations,
    getters
};