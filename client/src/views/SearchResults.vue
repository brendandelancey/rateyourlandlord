<template>
  <div class="searchresults">
    
    
    <b-container class="bv-example-row">
        <b-row class="text-center">
            <b-col>1 of 3</b-col>

            <b-col cols="8" >2 of 3 (wider)

                
                <!-- Add boarder and off white colour also add results in cards multiplied by number of results scrolling down -->
                <!--Should use the vuex searchResults gathered from the last page -->
                <div class="queryofIPs">
                    <div v-for="initialpost in queriedResults" :key="initialpost.id" class="initialpost">
                        {{initialpost.street
                        }}
                    </div>



                    <b-card-group deck>
                        <b-card
                        header="Landlord: Actual Name of Landlord"
                        header-tag="header"
                        footer="Rating: Actual Rating of Landlord"
                        footer-tag="footer"
                        title="Address: Actaul Address"
                        >
                        <b-card-text>Header and footers using props.</b-card-text>
                        <!-- <b-button href="#" variant="primary">Go somewhere</b-button>
                        Probably wil make whole card clickable -->
                        <!-- **May Rearrange this to have Rating on Top, Name as title and Body as Address  -->
                        </b-card>

                       
                    </b-card-group>
                </div>


            </b-col>

            <b-col>3 of 3
                <!-- At Bottom -->
                <b-card bg-variant="light"  title="Landlord Not Here?">
                    <b-card-text>
                        If you cant find your Landlord in your search above you can be the first to add them,
                        to let other renters like you know about your landlord.
                    </b-card-text>
                    <b-button href="#" variant="primary">Review Landlord</b-button>
                </b-card>
            </b-col>
        </b-row>
    </b-container>

     
  
  </div>

  
  
</template>

<script>
// mapActions
import { mapGetters,  } from "vuex";
export default {
    // ! Fix This
    // TODO Get queried results from state
    // TODO Display qurried results
    // TODO On Click MapAction Get Ratings Results and save to state
    computed: mapGetters(["queriedResults"]),
  
  

  name:"SearchRequest",
  methods: {
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
    //       console.log(err);
    //     });
    // },
  
  },
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
//           console.log(err);
//         });
//     }
//   }
};
</script>
