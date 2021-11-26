<template>
  <div>
    <v-card @submit.prevent="reg">
      <v-card-title>
        <span class="text-h5">Advanced Search</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="firstname"
                label="Landlord First Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="lastname"
                label="Landlord Last Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="street" label="Street"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="city" label="City"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                ref="province"
                v-model="province"
                :rules="[() => !!province || 'This field is required']"
                :items="provinces"
                label="Province/ State"
                placeholder="Select..."
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                ref="country"
                v-model="country"
                :rules="[() => !!country || 'This field is required']"
                :items="countries"
                label="Country"
                placeholder="Select..."
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="blue darken-1"
          text
          type="submit"
          v-on:click="newAdvancedSearch()"
        >
          Submit
        </v-btn>
        <!--    v-on:click="$emit('close-dialog')" -->
      </v-card-actions>
    </v-card>
    <v-alert v-if="failure" type="error">Error with Advanced Search </v-alert>
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
      firstname: "",
      lastname: "",
      street: "",
      city: "",
      province: "",
      country: "",
    };
  },
  methods: {
    ...mapActions(["advancedSearch"]),

    onSubmit(event) {
      event.preventDefault();

      this.newAdvancedSearch();
    },
    newAdvancedSearch() {
      console.log(this.country);
      console.log(this.province);
      const advancedSearchObject = {
        street: this.street.toLowerCase(),
        city: this.city.toLowerCase(),
        province: this.province.toLowerCase(),
        country: this.country.toLowerCase(),
        firstname: this.firstname.toLowerCase(),
        lastname: this.lastname.toLowerCase(),
      };
      // console.log("In Here")
      this.advancedSearch(advancedSearchObject)
        .then((res) => {
          // console.log("Resp: ");
          // console.log(res);
          if (res) {
            // console.log("GOT HERE");
            // Call an alert component, says it was completed or wasnt in the bottom, then kicks to home?

            this.$router.push("/searchresults");
          }
        })
        .catch((err) => {
          console.log(err);
          this.showAlertFail();
        });
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
.cardForm {
  /* height:50%;
    position: absolute; */
  vertical-align: middle;
  display: inline-block;
  height: 100%;
}
.createpost {
  /* min-height: 100vh; will cover the 100% of viewport */
  /* overflow: hidden; */
  /* display: block;
 position: relative; */
  height: 85vh;
}
.submit-advancedSearch {
  width: 100%;
}
</style>
