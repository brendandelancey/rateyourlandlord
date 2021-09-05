<template>
<div class = "LandingPage">
  <!-- <input id="auto_complete" type="text" placeholder="Type Here" >  -->
        <h1>
          {{ address }}
  
        </h1>
         <!-- <h1>
          {{ placeResult }}
  
        </h1> -->
        <!-- <h1>
          {{ id }}
  
        </h1> -->
        <div class="Hsearch">
              <vue-google-autocomplete
                ref="address"
                id="map"
                classname="HsearchByAddress"
                placeholder="Search by address:  street / city / province / country"
                v-on:placechanged="getAddressData"
                @keyup.enter="AddressSearch($event)"
                country="CA"
            >
            </vue-google-autocomplete>
            <!-- <input id="auto_complete" class="HsearchByAddress" type="text" v-model="searchAddress" placeholder="Search by address" onChange={}>  -->
            
            <input class="HsearchByName" type="text" @keyup.enter="NameSearch($event)" placeholder="Search by name:  first name / last name"> 
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
  <!-- <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDw26_qVKrZBvPak7lCbcgMhy2wh6muL10&libraries=places&callback=initAutocomplete"> </script> -->
  <!-- <script src="https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_AUTOCOMPLETE_API}&libraries=places&callback=initAutocomplete" async defer> </script> -->
  <!-- <script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDw26_qVKrZBvPak7lCbcgMhy2wh6muL10&callback=initAutocomplete" async defer> </script> -->
  <!-- <script src="https://maps.googleapis.com/maps/api/js?key={{$process.env.VUE_APP_AUTOCOMPLETE_API}}&libraries=places" async defer> </script> -->
  <!-- <script async src='"https://maps.googleapis.com/maps/api/js?libraries=places&key="+ {{key}}'> </script> -->
  
</template>

<script>
// NOTE: Database needs to save only lower case for name/ address



import VueGoogleAutocomplete from 'vue-google-autocomplete'
import { mapActions } from "vuex";
export default {
  components: { VueGoogleAutocomplete },
  data(){
  return {
        // autocomplete:null,
        // place:null,
        // key:"AIzaSyDw26_qVKrZBvPak7lCbcgMhy2wh6muL10"
        address:'',
        placeResult:null, 
        id:'',
        addressSearched:'',
        nameSearched:'',
        objectOfSearches:null,
        objectOfAddressSearches:null,
        
      }
    },

    mounted() {

      this.$refs.address.focus();


      // window.checkAndAttachMapScript(this.initLocationSearch);

      // this.initAutocomplete();
      // new google.maps.event.addDomListener(window, 'load', initialize);
      // new google.maps.places.Autocomplete(
      //   document.getElementById('auto_complete'),
      //   {
      //     componentRestrictions: {'country': ['CA']},
      //     fields:['formatted_address'],
      //   });
      // document.ready(function(){
      // initialize();
      // });
    // autocomplete.setFields(['place_id', 'geometry','name']);
    // var place =autocomplete.geometry;
    // // var g=place.geometry.location.lat();; 
    // // const g = autocomplete.geometry;
    // var n=autocomplete.name;
    // console.log("AAAAAAAAAAAAAA");
    // console.log(place);
    // console.log(n);
    // autocomplete.addListener('place_changed', this.onPlaceChanged(autocomplete));


      // new google.maps.places.Autocomplete(
      //         document.getElementById('autocomplete'),
      //         {
      //             componentRestrictions: {'country': ['CA']},
      //             fields:['place_id','geometry','name'],
      //         });

      // this.autocomplete.addListener('place_changed',OnPlaceChanged);





      // this.place = autocomplete.getPlace();

        
  },
  
  methods: {
    //! This might not be how you call two modules, needs testing
    ...mapActions(["addressSearch","landlordSearch"]),

    getAddressData: function (addressData,) {
                this.address = addressData;
                console.log("Address: "+this.address)
                // this.placeResult = placeResultData;
                // this.id = idData;
                // placeResultData, idData
                
            },
      // AddressSearch(e) {
      //           console.log(e.target.value);
      //           this.addressSearched=e.target.value;
      //           this.ParseAddressField(this.addressSearched);
                
                
      //       },
    //   NameSearch(e) {
    //     // Will Be ParserNameField
    //     console.log(e.target.value);
    //     this.nameSearched=e.target.value;

        
        
    // },
    NameSearch(e){
      var name = e.target.value.toLowerCase();
      const listOfNames = name.split(' ');

      // 2 searches, 1 object
      if (name.split(" ").length-1 === 0){
        
        
        // Call 1 = listOfNames[0] = firstname

        // Call 2 = listOfNames[0] = lastname

        this.objectOfSearches=
        {
          callOne :
          {
            firstname : listOfNames[0],
            lastname : null,
          },
          callTwo :
          {
            firstname : null,
            lastname : listOfNames[0]
          },
        }
        console.log("Name One Word:"+ JSON.stringify(this.objectOfSearches));
        this.searchByLandlord();

      }
      // 3 searches, 1 object
      else if(name.split(" ").length-1 === 1){
        
        // Call 1 = listOfNames[0]+listOfNames[1] = firstname

        // Call 2 = listOfNames[0]+listOfNames[1] = lastname 

        // Call 3 = listOfNames[0] = firstname, listOfNames[1] = lastname

        this.objectOfSearches=
        {
          callOne :
          {
            firstname : listOfNames[0]+' '+listOfNames[1],
            lastname : null,
          },
          callTwo :
          {
            firstname : null,
            lastname : listOfNames[0]+' '+listOfNames[1]
          },
          callThree :
          {
            firstname : listOfNames[0],
            lastname : listOfNames[1]
          },
        }
        console.log("Name Two Words:"+ JSON.stringify(this.objectOfSearches));
        this.searchByLandlord();

      }
      // 4 searches 3+ spaces, 1 object
      else if (name.split(" ").length-1 >= 2){
        


        // Call 1 = listOfNames[0]+listOfNames[1] = firstname, listOfNames[*] = lastname 

        // Call 2 = listOfNames[*] = firstname, listOfNames[-1]+listOfNames[-2] = lastname 

        // Call 3 = listOfNames[0] = firstname, listOfNames[*] = lastname 

        // Call 4 = listOfNames[*] = firstname, listOfNames[-1] = lastname 


        const namesExceptFirstTwoWords = name.split(' ').slice(2).join(' ');
        const namesExceptLastTwoWords =name.split(" ").slice(0, -2).join(" ");

        const namesExceptFirstWord = name.split(' ').slice(1).join(' ');
        const namesExceptLastWord =name.split(" ").slice(0, -1).join(" ");
       
        this.objectOfSearches=
        {
          callOne :
          {
            firstname : listOfNames[0]+' '+listOfNames[1],
            lastname : namesExceptFirstTwoWords
          },
          callTwo :
          {
            firstname : namesExceptLastTwoWords,
            lastname : listOfNames[ listOfNames.length-2]+' '+listOfNames[ listOfNames.length-1]
          },
          callThree :
          {
            firstname : listOfNames[0],
            lastname : namesExceptFirstWord
          },
          callFour :
          {
            firstname : namesExceptLastWord,
            lastname : listOfNames[ listOfNames.length-1]
          },
        }
        console.log("Name Three Words:"+ JSON.stringify(this.objectOfSearches));
        this.searchByLandlord();


      }
      //! If empty do nothing and do not search
      else{
        // 

      }

      // searchByAddress();

    },


   AddressSearch(e){
    //  LOWERCASE
     console.log(e.target.value);
     var addressField=e.target.value.toLowerCase();
     console.log(addressField);
    

      // Google Search
      console.log("Address Null?: "+this.address===null)
      console.log(this.address===null)

      // What Happens if they enter a google search then remove it?
      if (this.address!=null&&this.address!=""){
        //
        // Object.keys(this.placeResult).map(ele => {console.log(this.placeResult[ele]); })
        const abreviationObject =
        {
          "AB": "Alberta",
          "BC": "British Columbia",
          "MB": "Manitoba",
          "NB": "New Brunswick",
          "NL": "Newfoundland and Labrador",
          "NS": "Nova Scotia",
          "ON": "Ontario",
          "PE": "Prince Edward Island",
          "QC": "Quebec",
          "SK": "Saskatchewan"
        }

        const province = abreviationObject[this.address.administrative_area_level_1]
        this.objectOfAddressSearches={
            callOne:{
              street: this.address.route.toLowerCase(),
              city:this.address.locality.toLowerCase(),
              province:province.toLowerCase(),
              country:this.address.country.toLowerCase(),
            }
      }
      console.log("Google Search: "+  JSON.stringify(this.objectOfAddressSearches));
      this.searchByAddress();
      }
      //Custom Search
      else if (addressField!=null&&addressField!="") {


        // Change these to lower case
        const province =   ["Alberta","British Columbia","Manitoba", 
        "New Brunswick","Newfoundland and Labrador",
        "Nova Scotia", "Ontario","Prince Edward Island",
        "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"]
        const quebec =["Quebec"]
        // const provinceAbreviations =[
        // "AB","BC","MB","NB", "NL", "NS", "ON","PE", "QC", "SK", "NT", "NU", "YT"]
        const country =["Canada","United States","USA","CA","US",]

        

        const addressList = addressField.split(' ');
        var provinceInSearch=null;
        var countryInSearch=null;

        province.some(v => {addressField.includes(v.toLowerCase())? ( addressList.length>1?addressField=addressField.replace(" "+ v.toLowerCase(), ""):addressField=addressField.replace(v.toLowerCase(), ""), provinceInSearch=v.toLowerCase()):null});
        console.log("New Address After province: "+addressField);
        quebec.some(v => {addressField.includes(v.toLowerCase()) && !addressField.includes(v.toLowerCase()+" city")? ( addressList.length>1?addressField=addressField.replace(" "+ v.toLowerCase(), ""):addressField=addressField.replace(v.toLowerCase(), ""), provinceInSearch=v.toLowerCase() ):  null })
        
        console.log("New Address after qubec: "+addressField);
        //This then needs to be mapped to actual province
        // provinceAbreviations.some(v => {addressField.includes(v.toLowerCase())? (addressField=addressField.replace(" "+ v.toLowerCase(), ""), provinceInSearch=v.toLowerCase()):null});
        
        country.some(v => {addressField.includes(v.toLowerCase()) ? ( addressList.length>1?addressField=addressField.replace(" "+ v.toLowerCase(), ""):addressField=addressField.replace(v.toLowerCase(), ""), countryInSearch=v.toLowerCase()):null});
        console.log("New Address after country: "+addressField);

        console.log("Address Field Spaces: "+ (addressField.split(" ").length-1).toString());
        console.log("Province: "+provinceInSearch);
        console.log("Country: "+countryInSearch);


     
      // // callOne:{
      // //         street:,
      // //         city:,
      // //         province:,
      // //         country:, }
      

        if (addressField.length===0&&countryInSearch!=null ||provinceInSearch!=null){
          // Two Searches Unless in List then One Search

          this.objectOfAddressSearches={
            callOne:{
              street:null,
              city:null,
              province:provinceInSearch,
              country:countryInSearch,
            },
        
          }

          console.log("Adress One Word:"+ JSON.stringify(this.objectOfAddressSearches));
          this.searchByAddress();

        }
        else if (addressField.split(" ").length-1 === 0 && addressField.length>0){
          // Two Searches Unless in List then One Search

          this.objectOfAddressSearches={
            callOne:{
              street:addressList[0],
              city:null,
              province:provinceInSearch,
              country:countryInSearch,
            },
             callTwo:{
              street:null,
              city:addressList[0],
              province:provinceInSearch,
              country:countryInSearch,
            }
          }

          console.log("Adress One Word:"+ JSON.stringify(this.objectOfAddressSearches));
          this.searchByAddress();

        }
        else if(addressField.split(" ").length-1 === 1){
           // Three Searches Unless in List then searchTotal-numInList

            this.objectOfAddressSearches={
            callOne:{
              street:addressList[0]+' '+addressList[1],
              city:null,
              province:provinceInSearch,
              country:countryInSearch,
            },
             callTwo:{
              street:addressList[0],
              city:addressList[1],
              province:provinceInSearch,
              country:countryInSearch,
            },
              callThree:{
              street:null,
              city:addressList[0]+' '+addressList[1],
              province:provinceInSearch,
              country:countryInSearch,
            }
          }
          console.log("Adress Two Words:"+ JSON.stringify(this.objectOfAddressSearches));
          this.searchByAddress();

        }
        else if(addressField.split(" ").length-1 === 2){
          // 
             this.objectOfAddressSearches={
            callOne:{
              street:addressList[0]+' '+addressList[1]+' '+addressList[2],
              city:null,
              province:provinceInSearch,
              country:countryInSearch,
            },
            callTwo:{
              street:addressList[0]+' '+addressList[1],
              city:addressList[2],
              province:provinceInSearch,
              country:countryInSearch,
            },
            callThree:{
              street:addressList[0],
              city:addressList[1]+' '+addressList[2],
              province:provinceInSearch,
              country:countryInSearch,
            },
            callFour:{
              street:null,
              city:addressList[0]+' '+addressList[1]+' '+addressList[2],
              province:provinceInSearch,
              country:countryInSearch,
            }
          }
          console.log("Adress Three Words:"+ JSON.stringify(this.objectOfAddressSearches));
          this.searchByAddress();

        }
        else if(addressField.split(" ").length-1 >= 3){
          
          const addressExceptLastThreeWords =addressField.split(" ").slice(0, -3).join(" ");

          const addressExceptLastTwoWords =addressField.split(" ").slice(0, -2).join(" ");

          const addressExceptLastWord =addressField.split(" ").slice(0, -1).join(" ");

       
          this.objectOfAddressSearches={
            callOne:{
              street:addressField,
              city:null,
              province:provinceInSearch,
              country:countryInSearch,
            },
            callTwo:{
              street:addressExceptLastWord,
              city:addressList[addressList.length - 1],
              province:provinceInSearch,
              country:countryInSearch,
            },
            callThree:{
              street:addressExceptLastTwoWords,
              city:addressList[addressList.length-2]+' '+addressList[addressList.length-1],
              province:provinceInSearch,
              country:countryInSearch,
            },
            callFour:{
              street:addressExceptLastThreeWords,
              city:addressList[addressList.length-3]+' '+addressList[addressList.length-2]+' '+addressList[addressList.length-1],
              province:provinceInSearch,
              country:countryInSearch,
            },
            
          }
          console.log("Adress Four Or More Words:"+ JSON.stringify(this.objectOfAddressSearches));
          this.searchByAddress();

        }
     














      }


   },



    // initLocationSearch() {
    //      let autocomplete = new window.google.maps.places.Autocomplete(this.$refs.search);
    //      autocomplete.addListener("place_changed", function() {
    //         let place = autocomplete.getPlace();
    //         if (place && place.address_components) {
    //            console.log(place.address_components);
    //         }
    //      });
    // },
    
    // initAutocomplete(){
     
      
    //   new google.maps.places.Autocomplete(
    //       document.getElementById("auto_complete"),
    //       {
    //           componentRestrictions: {'country': ['CA']},
    //           fields:['place_id','geometry','name'],
    //       });
    //   // this.autocomplete.addListener('place_changed', this.onPlaceChanged);
    // },

    // onPlaceChanged(){
   

    //   if (!place.geometry){
    //     document.getElementById("auto_complete").placeholder = "Search by Address"
    //   }
    //   else{
    //     document.getElementById('details').innerHTML = place.name;
    //   }
    //  },
  //   window.checkAndAttachMapScript = function (callback) {
  //   let scriptId = "map-api-script";
  //   let mapAlreadyAttached = !!document.getElementById(scriptId);

  //   if (mapAlreadyAttached) {
  //       if (window.google) // Script attached but may not finished loading; so check for 'google' object.
  //         callback();
  //   }
  //   else {
  //       window.mapApiInitialized = callback;

  //       let script = document.createElement('script');
  //       script.id = scriptId;
  //       script.src = 'https://maps.googleapis.com/maps/api/js?key=_YOUR_KEY_HERE_&libraries=places,geometry&callback=mapApiInitialized';
  //       document.body.appendChild(script);
  //   }

  //   return mapAlreadyAttached;
  // },


    
  //! Need to actually get the parameters from the search box
  //! Also need to involve google in the auto correct
    searchByAddress() {
      // let searchparameters = {
      //   street: this.street,
      //   city: this.city,
      //   province: this.province,
      //   country: this.country
      // };
      console.log("In Here")
      this.addressSearch(
        this.objectOfAddressSearches)
        .then(res => {
          console.log("Resp: ");
          console.log(res);
          if (res) {
            console.log("GOT HERE");
            this.$router.push("/searchresults");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    searchByLandlord() {
      // let searchparameters = {
      //   landlordfirstname: this.landlordfirstname,
      //   landlordlastname: this.landlordlastname,
      //   // city: this.city
      // };
      this.landlordSearch(this.objectOfSearches)
        .then(res => {
          if (res) {
            console.log("GOT HERE");
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