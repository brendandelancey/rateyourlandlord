<template>
  <div>
    <v-card @submit.prevent="reg">
      <v-card-title>
        <span class="text-h5">Create Review</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="landlordfirstname"
                label="Landlord First Name*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="landlordlastname"
                label="Landlord Last Name*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="street"
                label="Street*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="city"
                label="City*"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                ref="province"
                v-model="province"
                :rules="[() => !!province || 'This field is required']"
                :items="provinces"
                label="Province/ State*"
                placeholder="Select..."
                required
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                ref="country"
                v-model="country"
                :rules="[() => !!country || 'This field is required']"
                :items="countries"
                label="Country*"
                placeholder="Select..."
                required
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-textarea
                counter
                label="Write Your Review Here"
                v-model="review"
              ></v-textarea>
              <b-form-rating
                v-model="rating"
                variant="warning"
                class="mb-2"
              ></b-form-rating>
            </v-col>
            <v-col cols="12" sm="6"> </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="blue darken-1"
          text
          type="submit"
          v-on:click="newInitialPost()"
        >
          Submit
        </v-btn>
        <!--    v-on:click="$emit('close-dialog')" -->
      </v-card-actions>
    </v-card>
    <v-alert v-if="success" type="success">Success</v-alert>
    <v-alert v-if="failure" type="error">Error with Sign Up</v-alert>
  </div>
</template>

<script>
// gets input, calls register function using input
// if successful router sends user to next appropriate screen
// if unsuccessful catch error user not signed in no router usage
import { mapActions } from "vuex";
export default {
  data() {
    return {
      provinces: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon Territory",
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District Of Columbia",
        "Federated States Of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Islands",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cruise Ship",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kuwait",
        "Kyrgyz Republic",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Satellite",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "St. Lucia",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        `Timor L'Este`,
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
      success: false,
      failure: false,
      landlordfirstname: "",
      landlordlastname: "",
      street: "",
      city: "",
      province: "",
      country: "",
      review: "",
      rating: 0,
    };
  },
  methods: {
    ...mapActions(["createInitialPosts"]),

    onSubmit(event) {
      event.preventDefault();
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
        landlordfirstname: this.landlordfirstname,
        landlordlastname: this.landlordlastname,
        rating: this.rating,
        review: this.review,
      };
      // console.log("In Here")
      this.createInitialPosts(initialPostObject)
        .then((res) => {
          // console.log("Resp: ");
          // console.log(res);
          if (res) {
            // console.log("GOT HERE");
            // Call an alert component, says it was completed or wasnt in the bottom, then kicks to home?
            this.showAlertSuccess();
          }
        })
        .catch((err) => {
          console.log(err);
          this.showAlertFail();
        });
    },

    showAlertSuccess() {
      console.log("a" + this.success);
      this.street = "";
      this.city = "";
      this.province = "";
      this.country = "";
      this.landlordfirstname = "";
      this.landlordlastname = "";
      this.rating = 0;
      this.review = "";
      this.success = true;
      console.log("b" + this.success);
      var self = this;

      setTimeout(function () {
        self.alertRerender("success");
      }, 5000);
    },

    showAlertFail() {
      this.failure = true;
      var self = this;
      setTimeout(function () {
        self.alertRerender("fail");
      }, 5000);
    },
    alertRerender(alertCode) {
      if (alertCode === "success") {
        this.success = false;
      } else if (alertCode === "fail") {
        this.failure = false;
      }
    },
  },
};
</script>

<style>
.create_review_form {
  /* height:250px; */
  justify-content: center;
  display: flex;
  padding-bottom: 50px;
}
.createpost {
  padding-bottom: 15px;
}
.submit-post {
  width: 100%;
}
</style>
