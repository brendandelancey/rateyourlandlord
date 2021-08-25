<template>
<div class = "LandingPage">
        <div class="Hsearch">
            <input id="autocomplete" class="HsearchByAddress" type="text" v-model="searchAddress" placeholder="Search by address"> 
            <input class="HsearchByName" type="text" v-model="searchName" placeholder="Search by name"> 
        </div>
    <div class="LandingSearch">
    </div>

    <div class="LandingAbout">
        <div class="houseRow">
            <div class="stylizedHouse">
                <img  :src="require('../assets/housedrawnstylized.png')" alt="Rate Your Landlord" />
            </div>
            <div class="houseText">
                <p>Text</p>
            </div>
        </div>
        <div class="apartmentBuildingRow">
            <div class="stylizedApartment">
                <img  :src="require('../assets/apartmentbuildingdrawnstylized.png')" alt="Rate Your Landlord" />
            </div>
            <div class="apartmentBuildingText">
                <p>Text</p>

            </div>
        </div>   

    </div>

</div>
  
</template>

<script>
import { mapActions } from "vuex";
export default {

    mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    );
  },
  
  methods: {
    //! This might not be how you call two modules, needs testing
    ...mapActions(["addressSearch","landlordSearch"]),
  
  //! Need to actually get the parameters from the search box
  //! Also need to involve google in the auto correct
    searchByAddress() {
      let searchparameters = {
        street: this.street,
        city: this.city,
        province: this.province,
        country: this.country
      };
      this.addressSearch(searchparameters)
        .then(res => {
          if (res.data) {
            this.$router.push("/searchresults");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    searchByLandlord() {
      let searchparameters = {
        landlordfirstname: this.landlordfirstname,
        landlordlastname: this.landlordlastname,
        // city: this.city
      };
      this.landlordSearch(searchparameters)
        .then(res => {
          if (res.data) {
            this.$router.push("/searchresults");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.LandingPage{
    background-color: rgb(252, 238, 223);
}
.LandingSearch{
    background-image: url("../assets/CityButWithFolieage.webp");
    background-size: contain;
    background-repeat: no-repeat;
      /* background-attachment: fixed; */
  background-position: center;
    width: 100%;
    height: 0;
    padding-top: 66.66%; /* (img-height / img-width * container-width) */
                /* (853 / 1280 * 100) */
                /* (900 / 1350 * 100) */
    
}
.Hsearch{
    display: flex;

    
    /* flex: 2 1 0; */
    min-width: 400px; 
    /* padding-left: 50px; */
    padding-top: 15%;
    position: absolute;
    width:100%;
    align-items: center;
  justify-content: center;
    
}
.HsearchByAddress{
    order:1; 
    /* padding-left: 10px; */
    border-radius: 25px;
    width:35%;
    padding: 5px;
}
.HsearchByName{
    order:2; 
    /* padding-left: 10px; */
    margin-left: 20px;
    border-radius: 25px;
    width:35%;
    padding: 5px;
    /* height: 80%; */ 
}
.houseRow{
    display: flex;
    padding: 10px;
}
.stylizedHouse{
    order:1;
    width:50%;

}
/* .stylizedHouse, img{


} */
.houseText{
    order:2;
    width:50%;
}
.houseText, p{
     justify-content: center;
}


.apartmentBuildingRow{
    display: flex;
    padding: 10px;
    
}
.stylizedApartment{
    order:2;
    width:50%;
    
    

}
/* .stylizedApartment, img{
  
    
    
    

} */
.apartmentBuildingText{
    order:1;
    width:50%;
    align-items: center;
  justify-content: center;
    

}
.apartmentBuildingText, p{
    align-items: center;
    /* justify-content: center; 
     flex-direction: column; */
    
    /* height: 100%; */
    /* flex: 0 0 50%; */
    text-align:center; 
  /* vertical-align: middle; */
  /* display: table-cell;  */

}
</style>