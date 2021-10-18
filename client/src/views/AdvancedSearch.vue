<template>
  <div class="createpost">
    
    <!-- Either remove columns or make 1 and 3 very small -->
    <b-container class="bv-example-row">
        <b-row class="text-center">
            <b-col></b-col>

            <b-col cols="8" >

                
                <div class="create_review_form">
                    <b-form class="cardForm" @submit="onSubmit"  >
                        <!-- @reset="onReset" -->
                        <!-- v-if="show" -->
                        <b-card  bg-variant="light" >
                            <!-- <b-form-group
                            label-cols-lg="3"
                            label="Rate Your Student Home"
                            label-size="lg"
                            label-class="font-weight-bold pt-0"
                            class="mb-0"
                            > -->
                            <b-form-group
                                label-cols-sm="3"
                                label="Landlord First Name:"
                                label-align-sm="right"
                                label-for="landlordfirstname"
                                type="text"
                            >
                                <b-form-input 
                                id="landlordfirstname"
                                v-model="firstname"
                                >
                                </b-form-input>
                            </b-form-group>
                              <b-form-group
                                label-cols-sm="3"
                                label="Landlord Last Name:"
                                label-align-sm="right"
                                label-for="lastname"
                                type="text"
                            >
                                <b-form-input 
                                id="landlordlastname"
                                v-model="lastname"
                                >
                                </b-form-input>
                            </b-form-group>
                            <b-form-group
                                label-cols-sm="3"
                                label="Street:"
                                label-align-sm="right"
                                label-for="street"
                            
                            >
                                <b-form-input 
                                id="street"
                                v-model="street"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label-cols-sm="3"
                                label="City:"
                                label-align-sm="right"
                                label-for="city"
                            >
                                <b-form-input 
                                id="city"
                                v-model="city"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label-cols-sm="3"
                                label="Province/State:"
                                label-align-sm="right"
                                label-for="province"
                            >
                                <b-form-input 
                                id="province"
                                v-model="province"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label-cols-sm="3"
                                label="Country:"
                                label-align-sm="right"
                                label-for="country"
                            >
                                <b-form-input 
                                id="country"
                                v-model="country"
                                ></b-form-input>
                            </b-form-group>

            
                            
                        </b-card>
                        <b-button class="submit-advancedSearch" type="submit" variant="primary">Submit</b-button>
                    </b-form>
                </div>


            </b-col>

            <b-col></b-col>
        </b-row>
    </b-container>

     
  
  </div>

  
  
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions } from "vuex";
export default {
    data() {
      return {
        firstname: "",
        lastname: "",
        street: "",
        city: "",
        province: "",
        country: "",
      }
    },
      mounted() {
      
  },
  methods: {
       ...mapActions(["advancedSearch"]),

    onSubmit(event) {
        event.preventDefault()
        // alert(JSON.stringify(this.form))
     // console.log("Landlord Firstname: "+this.firstname)
     // console.log("Landlord Lastname: "+this.lastname)
     // console.log("Street: "+this.street)
     // console.log("City: "+this.city)
     // console.log("Province: "+this.province)
     // console.log("Country: "+this.country)

        this.newAdvancedSearch();
        },
    newAdvancedSearch() {
        const advancedSearchObject = {
          street: this.street.toLowerCase(),
          city: this.city.toLowerCase(),
          province: this.province.toLowerCase(),
          country: this.country.toLowerCase(),
          firstname:this.firstname.toLowerCase(),
          lastname: this.lastname.toLowerCase(),

        };
     // console.log("In Here")
        this.advancedSearch(
           advancedSearchObject)
            .then(res => {
         // console.log("Resp: ");
         // console.log(res);
            if (res) {
             // console.log("GOT HERE");
                // Call an alert component, says it was completed or wasnt in the bottom, then kicks to home?
                this.$router.push("/searchresults");
            }
            })
            .catch(err => {
         console.log(err);
            });
    },
  }
}
</script>

<style>
.cardForm{
    /* height:50%;
    position: absolute; */
    vertical-align:middle;
     display:inline-block;
    height:100%;
}
.createpost{
 /* min-height: 100vh; will cover the 100% of viewport */
 /* overflow: hidden; */
 /* display: block;
 position: relative; */
 height:85vh;
}
.submit-advancedSearch{
    width: 100%;
}

</style>
