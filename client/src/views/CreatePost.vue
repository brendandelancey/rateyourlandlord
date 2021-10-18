<template>
  <div class="createpost">
    <h1>Add your student house below</h1>
    <!-- Either remove columns or make 1 and 3 very small -->
    <b-container class="bv-example-row">

        <b-row class="text-center">
            <b-col></b-col>

            <b-col cols="8" >

                
                <div class="create_review_form">
                    <b-form @submit="onSubmit"  >
                        <!-- @reset="onReset" -->
                        <!-- v-if="show" -->
                        <b-card bg-variant="light" >
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
                                v-model="landlordfirstname"
                                required
                                >
                                </b-form-input>
                            </b-form-group>
                              <b-form-group
                                label-cols-sm="3"
                                label="Landlord Last Name:"
                                label-align-sm="right"
                                label-for="landlordlastname"
                                type="text"
                            >
                                <b-form-input 
                                id="landlordlastname"
                                v-model="landlordlastname"
                                required
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
                                required
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
                                required
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
                                required
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
                                required
                                ></b-form-input>
                            </b-form-group>

            

                            <!-- </b-form-group> -->
                            <!-- Might remove divs from both -->
                            <div>
                                <b-form-textarea
                                id="review"
                                v-model="review"
                                required
                                placeholder="Write Your Review Here"
                                rows="3"
                                max-rows="6"
                                ></b-form-textarea>

                                <!-- <pre class="mt-3 mb-0">{{ text }}</pre> -->
                                <p></p>
                            </div>
                            <div>
                                <b-form-rating v-model="rating" required variant="warning" class="mb-2"></b-form-rating>
                                <p class="mt-2">Value: {{ rating }}</p>
                            </div>
                        </b-card>
                        <b-button class="submit-post" type="submit" variant="primary">Submit</b-button>
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
        landlordfirstname: "",
        landlordlastname: "",
        street: "",
        city: "",
        province: "",
        country: "",
        review: "",
        rating:0
      }
    },
      mounted() {
      
  },
  methods: {
       ...mapActions(["createInitialPosts"]),

    onSubmit(event) {
        event.preventDefault()
        // alert(JSON.stringify(this.form))
     // console.log("Landlord Firstname: "+this.landlordfirstname)
     // console.log("Landlord Lastname: "+this.landlordlastname)
     // console.log("Street: "+this.street)
     // console.log("City: "+this.city)
     // console.log("Province: "+this.province)
     // console.log("Country: "+this.country)
     // console.log("Review: "+this.review)
     // console.log("Rating: "+this.rating)
        this.newInitialPost();
        },
    newInitialPost() {
        const initialPostObject = {
          street: this.street,
          city: this.city,
          province: this.province,
          country: this.country,
          landlordfirstname:this.landlordfirstname,
          landlordlastname: this.landlordlastname,
          rating: this.rating,
          review: this.review,
        };
     // console.log("In Here")
        this.createInitialPosts(
           initialPostObject)
            .then(res => {
         // console.log("Resp: ");
         // console.log(res);
            if (res) {
             // console.log("GOT HERE");
                // Call an alert component, says it was completed or wasnt in the bottom, then kicks to home?
                this.$router.push("/");
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
.create_review_form{
    /* height:250px; */
    justify-content: center;
    display: flex;
  padding-bottom: 50px;
}
.createpost{
  padding-bottom: 15px;
  
}
.submit-post{
    width: 100%;
}

</style>
