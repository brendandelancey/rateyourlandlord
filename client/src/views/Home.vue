<template>
  <body>
    <div >
  
      <div class="FirstBackgroundSection">
        <div class="row">
          
          <div class="col">
            <h1>Some Words and Stuff</h1>
            <h3>This Website Lets You Review <br> and View Reviews of Landlords</h3>
          </div>
          <div class="col">
            <button>Create A Review</button>
          </div>
            <!-- This Should Scroll down to the bottum and explain how to post, this is my call to action besides the sign up button -->
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
          
        </div>
      </div>
      
      <div class="SecondBackgroundSection">
        <div class="row">

          <div class="card mx-auto Name/City">
            <div class="card-header text-white bg-primary">
              <h4>Name and City Search</h4>
            </div>
              <div class="card-body">
                <form @submit.prevent="searchRequest">
                  <div class="form-group1">
                    <label for="landlordname">Landlordname</label>
                    <input
                      id="landlordname"
                      type="text"
                      placeholder="Landlordname"
                      name="landlordname"
                      v-model="landlordname"
                      class="form-control"
                    >
                    
                    <label for="city">City</label>
                    <input
                      id="city"
                      type="text"
                      placeholder="City"
                      name="city"
                      v-model="city"
                      class="form-control"
                    >
                  </div>
                  <input type="submit" class="btn btn-primary" value="Submit">
                  &nbsp;&nbsp;&nbsp;&nbsp;
            
                </form>
              </div> 
          </div>

          <div class="card mx-auto Address Search">
            <div class="card-header text-white bg-primary">
              <h4>Address Search</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="searchRequest" >
                <div class="form-group2">
                  <label for="street">Street</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Street"
                    name="street"
                    id="street"
                    v-model="street2"
                  >
                  <label for="city">City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    name="city"
                    v-model="city2"
                    class="form-control"
                  >
              
                
                  <label for="province">Province</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Province"
                    name="province"
                    id="province"
                    v-model="province2"
                  >
              
                
                  <label for="country">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Country"
                    name="country"
                    id="country"
                    v-model="country2"
                  >
                </div>
                <input type="submit" class="btn btn-primary" value="Submit">
                &nbsp;&nbsp;&nbsp;&nbsp;
          
              </form>
            </div> 
          </div>

        </div>

        <!-- Use css margin -->

        <div class="row">

          <div class="card mx-auto Advanced Search">
            <div class="card-header text-white bg-primary">
              <h4>Advanced Search</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="searchRequest" >
                <div class="form-group3">
                  <label for="landlordname">Landlordname</label>
                  <input
                    id="landlordname"
                    type="text"
                    placeholder="Landlordname"
                    name="landlordname"
                    v-model="landlordname3"
                    class="form-control"
                  >
                  <label for="street">Street</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Street"
                    name="street"
                    id="street"
                    v-model="street3"
                  >
                  <label for="city">City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    name="city"
                    v-model="city3"
                    class="form-control"
                  >
                  <label for="province">Province</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Province"
                    name="province"
                    id="province"
                    v-model="province3"
                  >
                  <label for="country">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Country"
                    name="country"
                    id="country"
                    v-model="country3"
                  >
                </div>
                <input type="submit" class="btn btn-primary" value="Submit">
                &nbsp;&nbsp;&nbsp;&nbsp;
          
              </form>
            </div> 
          </div>

        </div>
      </div>

      <div class="ThirdBackgroundSection">
        <div class="column">
          <br>
          <h1>How To Post a Review -> Might Remove This </h1>
          <h4>Step 1 Search <br> Step 2 Login or Signup <br> Step 3A Add a review to an Already Existing Landlord Post <br> Step 3B Create a New Post Using the button at the bottum of the Search Results Page</h4>
          
          
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
        </div>
      </div>

    </div>
  </body>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
export default {
  data() {
      return {
          landlordname: "",
          street: "",
          city: "",
          province: "",
          country: "",
          landlordname2: "",
          street2: "",
          city2: "",
          province2: "",
          country2: "",
          landlordname3: "",
          street3: "",
          city3: "",
          province3: "",
          country3: ""
      };
      
    },
  //name:"SearchRequest",
    methods: {
      ...mapActions(["fetchInitialPosts"]),
      searchRequest(){
        if(this.landlordname3!=""&&this.street3!=""&&this.city3!=""&&this.province3!=""&&this.country3!=""){
           let searchparameters ={
                  
              landlordname: this.landlordname3,
              street: this.street3,
              city: this.city3,
              province: this.province3,
              country: this.country3,

          };
          this.fetchInitialPosts(searchparameters);
          this.$router.push("/SearchResults");
        }
        else if(this.street2!=""&&this.city2!=""&&this.province2!=""&&this.country2!=""){
           let searchparameters ={
                  
              landlordname: this.landlordname2,
              street: this.street2,
              city: this.city2,
              province: this.province2,
              country: this.country2,

          };
          this.fetchInitialPosts(searchparameters);
          this.$router.push("/SearchResults");
        }
        else if(this.landlordname!=""&&this.city!=""){
          let searchparameters ={
                  
              landlordname: this.landlordname,
              street: this.street,
              city: this.city,
              province: this.province,
              country: this.country,

          };
          this.fetchInitialPosts(searchparameters);
          this.$router.push("/SearchResults");
        }
        else{//throw an error saying "fill the form"
        }
      // console.log(theSearchParam);
  
        

        //this.fetchInitialPosts(this.landlordname,this.street,this.city, this.province,this.country);
        // .then(res => {
        //   if (res.data.success) {
        
        //   }
        // })
        // .catch(err => {
        //   console.log(err);
        // });

    }
  
  },
  // computed: mapGetters(["queriedInitialPosts"]),
  // created() {
  //   this.fetchInitialPosts();
  // },



  
  // data() 
  // {
  
  //     return {
  //       slide: 0,
  //       sliding: null
  //     }
  //   },
  //   methods: {
  //     onSlideStart() {
  //       this.sliding = true
  //     },
  //     onSlideEnd() {
  //       this.sliding = false
  //     }
  //   }

 
    //Carousel Markup
      // <b-carousel
      //   id="carousel-1"
      //   v-model="slide"
      //   :interval="4000"
      //   controls
      //   indicators
      //   background="#ababab"
      //   img-width="1024"
      //   img-height="480"
      //   style="text-shadow: 1px 1px 2px #333;"
      //   @sliding-start="onSlideStart"
      //   @sliding-end="onSlideEnd">
      //   <!-- Text slides with image -->
      //   <b-carousel-slide
      //     caption="First slide"
      //     text="Nulla vitae elit libero, a pharetra augue mollis interdum."
      //     img-src="https://picsum.photos/1024/480/?image=52"
      //   ></b-carousel-slide>

      //   <!-- Slides with custom text -->
      //   <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
      //     <h1>Hello world!</h1>
      //   </b-carousel-slide>

      //   <!-- Slides with image only -->
      //   <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      //   <!-- Slides with img slot -->
      //   <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      //   <b-carousel-slide>
      //     <template v-slot:img>
      //       <img
      //         class="d-block img-fluid w-100"
      //         width="1024"
      //         height="480"
      //         src="https://picsum.photos/1024/480/?image=55"
      //         alt="image slot"
      //       >
      //     </template>
      //   </b-carousel-slide>

      //   <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      //   <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
          
      //     <b-jumbotron header="Rate Landlord" lead="Looking To Rate Your Landlord">
      //       <p>Search our Database to find your Landlord //:Edit</p>
            

      //       <b-navbar type="light" variant="light">
      //         <b-nav-form>
      //           <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
      //           <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
      //         </b-nav-form>
      //       </b-navbar>
      //     </b-jumbotron>
    
      //   </b-carousel-slide>
      //   <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
          
      //     <b-jumbotron header="Find Landlord" lead="Looking For a Specific Landlord">
      //       <p>Search our Database to find your Landlord //:Edit</p>
      //       <!-- <b-button variant="primary" href="#">More Info</b-button> -->
      //       <b-navbar type="light" variant="light">
      //         <b-nav-form>
      //           <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
      //           <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
      //         </b-nav-form>
      //       </b-navbar>
      //     </b-jumbotron>
    
      //   </b-carousel-slide>
      //   <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
          
      //     <b-jumbotron header="Search By Address" lead="Enter as much info as you can to narrow your search">
      //       <p>Search our Database to find your Landlord //:Edit</p>
      //       <!-- <b-button variant="primary" href="#">More Info</b-button> -->
      //       <b-navbar type="light" variant="light">
      //         <b-nav-form>
      //           <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
      //           <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
      //         </b-nav-form>
      //       </b-navbar>
      //     </b-jumbotron>
    
      //   </b-carousel-slide>
      // </b-carousel>

      // <p class="mt-4">
      //   Slide #: {{ slide }}<br>
      //   Sliding: {{ sliding }}
      // </p>
}
</script>
<style>
.FirstBackgroundSection{
  background:rgb(163, 163, 163,1) url('https://s3-us-west-2.amazonaws.com/s.cdpn.https://images.unsplash.com/https://images.unsplash.com/photo-1524813686514-a57563d77965?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80-1524813686514-a57563d77965?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80/2621168/bg_copy.jpg');

}
.SecondBackgroundSection{
  background: rgb(196,196,196);
  background: linear-gradient(90deg, rgba(196,196,196,1) 0%, rgba(163,163,163,1) 35%, rgba(31,31,31,1) 98%);
}
/* .ThirdBackgroundSection{
  
} */
</style>
