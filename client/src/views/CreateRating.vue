<template>
  <div class="createrating">
    
    <!-- Either remove columns or make 1 and 3 very small -->
    <div class="IP">
      <h1 class="name">{{ initialpost.landlordfirstname }} {{ initialpost.landlordlastname }}</h1>
        
      <div class="IP-row">

        <div class="IPinformation">
          <h4 > {{ initialpost.country }} {{ initialpost.province }}</h4>
          <h4> {{ initialpost.city }} {{ initialpost.street }}</h4>
        </div>

        <div class="averageRating">
          <h2> {{ initialpost.ratingAverage }} / 5</h2>
        </div>
      </div>
    </div>  

    <b-container class="bv-example-row">
        <b-row class="text-center">
            
             <b-col></b-col>
            <b-col cols="8" >

                
                <div class="create_rating_form">
                  <b-form @submit="onSubmit"  >
                    <b-card bg-variant="light">
                        <b-form-group
                        label-cols-lg="3"
                        label="Leave A Rating"
                        label-size="lg"
                        label-class="font-weight-bold pt-0"
                        class="mb-0"
                        >
                        </b-form-group>
                        <!-- Might remove divs from both -->
                         <div>
                            <b-form-textarea
                            id="review"
                            v-model="review"
                            placeholder="Write Your Review Here"
                            rows="3"
                            max-rows="6"
                            ></b-form-textarea>
                            <p></p>
                        </div>
                        <div>
                            <b-form-rating v-model="rating" variant="warning" class="mb-2"></b-form-rating>
                            <p class="mt-2">Value: {{ rating }}</p>
                        </div>

           
                    </b-card>
                    <b-button class="submit-rating" type="submit" variant="primary">Submit</b-button>
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
        review: "",
        rating:0,
        initialpost:{},
      }
    },
      mounted() {
        var retrieved= localStorage.getItem("initialpost");
        console.log("InitialPost in Create Rating: " + JSON.parse(JSON.stringify(retrieved)))
        this.initialpost = JSON.parse(retrieved)

  },
  methods: {
        ...mapActions(["newRating"]),

   onSubmit(event) {
        event.preventDefault()
        // alert(JSON.stringify(this.form))
        console.log("Review: "+this.review)
        console.log("Rating: "+this.rating)
        this.createRating();
        },
    createRating() {
        const ratingObject = {
          rating: this.rating,
          review: this.review.toLowerCase(),
          IPid: this.initialpost.id,
        };
        console.log("In Here")
        this.newRating(
           ratingObject)
            .then(res => {
            console.log("Resp: ");
            console.log(res);
            if (res) {
                console.log("GOT HERE");
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
<style >
.create_rating_form{
  display: flex;
  flex-direction: column;
  padding: 30px 0 0 0;
  justify-content: center;
   padding-bottom: 200px;

}

.IP{
  display: flex;
  flex-direction: column;
  padding: 15px 0 15px 0;

}
.name{
  font-size: 64px;

}
.IP-row{
  display: flex;
  height: 100%;
  justify-content: center;
}

.IPinformation{
  flex:2

}
.averageRating{
  flex:1;

  
}
.averageRating h2{
  background-color: darkgray;
  height: 125px;
  width: 125px;
}
.submit-rating{
    width: 100%;
}
</style>
