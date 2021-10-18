<template>
  <div class="searchresults">
    <h4 class="advancedsearch" @click="AdvancedSearch()">Advanced Search</h4>
  
    <div class="queryofIPs">
      <div
        v-for="initialpost in queriedResults"
        :key="initialpost.id"
        class="initial-post"
      >
        <div @click="ViewReview(initialpost)" class="result">
          <div  class="rating">
            <h1>
              {{ initialpost.ratingAverage }} / 5
            </h1>
          </div>
          <div class="theReview">
          <h1 v-if="initialpost.landlordfirstname.length+initialpost.landlordlastname.length < 26">
            {{ initialpost.landlordfirstname }} {{ initialpost.landlordlastname }} 
          </h1>
          <h1 v-else>
            {{ initialpost.landlordfirstname.substring(0,13) }} {{ initialpost.landlordlastname.substring(0,13)+".."  }} 
          </h1>
          <h2 v-if="initialpost.street.length+initialpost.city.length < 70">
             {{ initialpost.street }} {{ initialpost.city }}
          </h2>
          <h2 v-else>
             {{ initialpost.street.substring(0,50) }} {{ initialpost.city.substring(0,20)+".."  }} 
          </h2>
          </div>
        </div>
      </div>
    </div>
   
    <h4 class="createAPost" @click="CreatePost()">
      Is your house not in the list above Add Your House Here
    </h4>

  </div>
</template>

<script>
// mapActions
import { mapGetters, mapActions } from "vuex";
// import { store } from '../store';
export default {
  data() {
    return {
      // queriedResults: "",
    };
  },

  computed: mapGetters(["queriedResults"]),
 

  methods: {
    ...mapActions(["fetchRatings"]),

    AdvancedSearch() {
      this.$router.push("/advancedsearch");
    },
    CreatePost() {
   // console.log("HHHHEEEERRRREEEE")
      this.$router.push("/createpost");
    },
    CreateRating() {
      this.$router.push("/createrating");
    },
    ViewReview(initialpost) {
      const id=initialpost.id;
      const IP =JSON.stringify(initialpost);
   // console.log("READ THIS: "+ IP)
      localStorage.setItem( "initialpost", IP );
    
   // console.log("In Here");
   // console.log("Initial Post ID: " + JSON.stringify(id));
      this.fetchRatings(id)
        .then((res) => {
       // console.log("Resp: ");
       // console.log(res);
          if (res) {
         // console.log("GOT HERE");
            // Router needs a fix onComplete event
            this.$router.push ({name:"ViewRatingsAndReviews",
              params: {id},
            });
          }
        })
        .catch((err) => {
       console.log(err);
        });
    },
  },

  // ...mapActions(["fetchRatings"]),
  // fetchByResults() {
  //     // ! Probably not accurate
  //   let IPid = {
  //     IPid: this.IP.IPid,
  //   };
  //   this.fetchRatings(searchparameters)
  //     .then(res => {
  //       if (res.data) {
  //         this.$router.push("/LandlordRatings");
  //       }
  //     })
  //     .catch(err => {
  //    // console.log(err);
  //     });
  // },

  //   },
  //   computed: mapGetters(["queriedInitialPosts"]),
  //   created() {
  //     this.fetchTodos();
  //   }

  //   data() {
  //     return {
  //       username: "",
  //       password: ""
  //     };
  //   },
  //   methods: {
  //     ...mapActions(["login"]),
  //     loginUser() {
  //       let user = {
  //         username: this.username,
  //         password: this.password
  //       };
  //       this.login(user)
  //         .then(res => {
  //           if (res.data.success) {
  //             this.$router.push("/profile");
  //           }
  //         })
  //         .catch(err => {
  //        // console.log(err);
  //         });
  //     }
  //   }
};
</script>
<style>
.advancedsearch{
  cursor: pointer;
   padding-bottom: 2rem;
   padding-top: 1rem;
}
.searchresults {
  min-height:85vh; 
    /* position:relative;  */
}
.result{
    /* position: absolute;  */
  /* top: 50%; */
  /* left: 100%; */
  display: flex;
  justify-content: center;
  padding-top: 0rem;
  /* padding-bottom: 20px; */
  margin: 0 auto;
  width: 75%;
  cursor: pointer;
  padding-bottom: 1rem;
  

}
.initial-post{
    /* position: absolute;  */
  /* top: 50%; */
  /* left: 100%; */
 
  justify-content: center;
  padding-bottom: 35px;
  
  /* padding: 20px; */
  /* margin: 0 auto; */

}
.theReview{
  
  background-color: #eaeff1;
  height: 150px;
  width: 50%;
 
   
  /* margin: 0 auto; */
  
  /* padding: 35px;
  text-align: center;
  justify-content: center;
  vertical-align: middle; */
  

}
.theReview h1 {
  height: 35%;
  /* line-height: 10px; */
  font-size: 36px;
  
  
  /* margin: 0 auto; */
  /* text-align: center;
  justify-content: center;
  vertical-align: middle; */
  

}
.theReview h2 {
  height: 65%;
  /* line-height: 10px; */
  font-size: 24px;
  justify-content: left;


}
.rating{
  
  background-color: darkgray;
  height: 150px;
  width: 150px;
  /* padding: 35px; */
  
  
}
.rating h1{
  
  line-height: 150px;
  /* background-color: darkgray; */
  /* height: 150px; */
  /* width: 150px; */
  /* padding: 35px; */
  
  
}
.createAPost{
  cursor: pointer;
    /* clear: both; */
  width: 100%;
  position: absolute;
  height: 1.5rem; 
  padding-bottom: 50px;
  bottom: 0;
  margin-bottom: 6rem;
  /* padding-top: 50px; */
  
}
.queryofIPs{
  padding-bottom:2rem;
}

</style>