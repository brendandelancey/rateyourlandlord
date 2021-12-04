<template>
  <div>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Navbar</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>

    <div class="navbar">
      <div class="logo" @click="home()">
        <img
          :src="require('../assets/RateYourStudentHouseGrey67p.png')"
          alt="Rate Your Landlord"
        />
      </div>
      <div class="search">
        <input
          @keyup.enter="AddressSearch($event)"
          class="searchByAddress"
          type="text"
          placeholder="Search by address"
        />
        <input
          @keyup.enter="NameSearch($event)"
          class="searchByName"
          type="text"
          placeholder="Search by name"
        />
      </div>

      <div class="nav">
        <nav>
          <ul class="nav_links">
            <li>
              <!-- <a href="/login" v-if="!isLoggedIn">Login</a> -->
              <v-row data-app justify="center">
                <v-dialog max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <a v-bind="attrs" v-on="on" v-if="!isLoggedIn">Login</a>
                  </template>
                  <login />
                  <!-- v-on:close-dialog="closeDialog" -->
                </v-dialog>
              </v-row>
            </li>
            <spacer></spacer>
            <li><a href="/profile" v-if="isLoggedIn">Profiles</a></li>
            <spacer></spacer>
            <li>
              <!-- <a href="/register" v-if="!isLoggedIn">Register</a> -->
              <v-row data-app justify="center">
                <v-dialog max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <a v-bind="attrs" v-on="on" v-if="!isLoggedIn">Register</a>
                  </template>
                  <signup />
                  <!-- v-on:close-dialog="closeDialog" -->
                </v-dialog>
              </v-row>
            </li>
            <li>
              <a href="/logout" v-if="isLoggedIn" @click.prevent="logoutUser"
                >Logout</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
export default {
  components: { login: Login, signup: SignUp },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    data() {
      return {
        // autocomplete:null,
        // place:null,
        // key:""

        // dialog: false,
        address: "",
        placeResult: null,
        id: "",
        addressSearched: "",
        nameSearched: "",
        objectOfSearches: null,
        objectOfAddressSearches: null,
      };
    },
  },
  methods: {
    //! This might not be how you call two modules, needs testing
    ...mapActions(["logout", "addressSearch", "landlordSearch"]),
    logoutUser() {
      this.logout();
    },
    // closeDialog: function(){
    //       console.log(this.dialog);
    //       console.log('close dialog 2');
    //       this.dialog = false;

    //     } ,

    home() {
      this.$router.push("/");
    },
    //! Need to actually get the parameters from the search box
    //! Also need to involve google in the auto correct

    NameSearch(e) {
      var name = e.target.value;
      const listOfNames = name.split(" ");

      // 2 searches, 1 object
      if (name.split(" ").length - 1 === 0) {
        // Call 1 = listOfNames[0] = firstname

        // Call 2 = listOfNames[0] = lastname

        this.objectOfSearches = {
          callOne: {
            firstname: listOfNames[0],
            lastname: null,
          },
          callTwo: {
            firstname: null,
            lastname: listOfNames[0],
          },
        };
        // console.log("Name One Word:" + JSON.stringify(this.objectOfSearches));
        this.searchByLandlord();
      }
      // 3 searches, 1 object
      else if (name.split(" ").length - 1 === 1) {
        // Call 1 = listOfNames[0]+listOfNames[1] = firstname

        // Call 2 = listOfNames[0]+listOfNames[1] = lastname

        // Call 3 = listOfNames[0] = firstname, listOfNames[1] = lastname

        this.objectOfSearches = {
          callOne: {
            firstname: listOfNames[0] + " " + listOfNames[1],
            lastname: null,
          },
          callTwo: {
            firstname: null,
            lastname: listOfNames[0] + " " + listOfNames[1],
          },
          callThree: {
            firstname: listOfNames[0],
            lastname: listOfNames[1],
          },
        };
        // console.log("Name Two Words:" + JSON.stringify(this.objectOfSearches));
        this.searchByLandlord();
      }
      // 4 searches 3+ spaces, 1 object
      else if (name.split(" ").length - 1 >= 2) {
        // Call 1 = listOfNames[0]+listOfNames[1] = firstname, listOfNames[*] = lastname

        // Call 2 = listOfNames[*] = firstname, listOfNames[-1]+listOfNames[-2] = lastname

        // Call 3 = listOfNames[0] = firstname, listOfNames[*] = lastname

        // Call 4 = listOfNames[*] = firstname, listOfNames[-1] = lastname

        const namesExceptFirstTwoWords = name.split(" ").slice(2).join(" ");
        const namesExceptLastTwoWords = name.split(" ").slice(0, -2).join(" ");

        const namesExceptFirstWord = name.split(" ").slice(1).join(" ");
        const namesExceptLastWord = name.split(" ").slice(0, -1).join(" ");

        this.objectOfSearches = {
          callOne: {
            firstname: listOfNames[0] + " " + listOfNames[1],
            lastname: namesExceptFirstTwoWords,
          },
          callTwo: {
            firstname: namesExceptLastTwoWords,
            lastname:
              listOfNames[listOfNames.length - 2] +
              " " +
              listOfNames[listOfNames.length - 1],
          },
          callThree: {
            firstname: listOfNames[0],
            lastname: namesExceptFirstWord,
          },
          callFour: {
            firstname: namesExceptLastWord,
            lastname: listOfNames[listOfNames.length - 1],
          },
        };
        // console.log(
        //   "Name Three Words:" + JSON.stringify(this.objectOfSearches)
        // );
        this.searchByLandlord();
      }
      //! If empty do nothing and do not search
      else {
        //
      }

      // searchByAddress();
    },

    AddressSearch(e) {
      //  LOWERCASE
      // console.log(e.target.value);
      var addressField = e.target.value;
      // console.log(addressField);

      //Custom Search
      if (addressField != null && addressField != "") {
        // Change these to lower case
        const province = [
          "Alberta",
          "British Columbia",
          "Manitoba",
          "New Brunswick",
          "Newfoundland and Labrador",
          "Nova Scotia",
          "Ontario",
          "Prince Edward Island",
          "Saskatchewan",
          "Northwest Territories",
          "Nunavut",
          "Yukon",
        ];
        const quebec = ["Quebec"];
        // const provinceAbreviations =[
        // "AB","BC","MB","NB", "NL", "NS", "ON","PE", "QC", "SK", "NT", "NU", "YT"]
        const country = ["Canada", "United States", "USA", "CA", "US"];

        const addressList = addressField.split(" ");
        var provinceInSearch = null;
        var countryInSearch = null;

        province.some((v) => {
          addressField.includes(v.toLowerCase())
            ? (addressList.length > 1
                ? (addressField = addressField.replace(
                    " " + v.toLowerCase(),
                    ""
                  ))
                : (addressField = addressField.replace(v.toLowerCase(), "")),
              (provinceInSearch = v.toLowerCase()))
            : null;
        });
        // console.log("New Address After province: " + addressField);
        quebec.some((v) => {
          addressField.includes(v.toLowerCase()) &&
          !addressField.includes(v.toLowerCase() + " city")
            ? (addressList.length > 1
                ? (addressField = addressField.replace(
                    " " + v.toLowerCase(),
                    ""
                  ))
                : (addressField = addressField.replace(v.toLowerCase(), "")),
              (provinceInSearch = v.toLowerCase()))
            : null;
        });

        // console.log("New Address after qubec: " + addressField);
        //This then needs to be mapped to actual province
        // provinceAbreviations.some(v => {addressField.includes(v.toLowerCase())? (addressField=addressField.replace(" "+ v.toLowerCase(), ""), provinceInSearch=v.toLowerCase()):null});

        country.some((v) => {
          addressField.includes(v.toLowerCase())
            ? (addressList.length > 1
                ? (addressField = addressField.replace(
                    " " + v.toLowerCase(),
                    ""
                  ))
                : (addressField = addressField.replace(v.toLowerCase(), "")),
              (countryInSearch = v.toLowerCase()))
            : null;
        });
        // console.log("New Address after country: " + addressField);

        // console.log(
        //   "Address Field Spaces: " +
        //     (addressField.split(" ").length - 1).toString()
        // );
        // console.log("Province: " + provinceInSearch);
        // console.log("Country: " + countryInSearch);

        // // callOne:{
        // //         street:,
        // //         city:,
        // //         province:,
        // //         country:, }

        if (
          (addressField.length === 0 && countryInSearch != null) ||
          provinceInSearch != null
        ) {
          // Two Searches Unless in List then One Search

          this.objectOfAddressSearches = {
            callOne: {
              street: null,
              city: null,
              province: provinceInSearch,
              country: countryInSearch,
            },
          };

          // console.log(
          //   "Adress One Word:" + JSON.stringify(this.objectOfAddressSearches)
          // );
          this.searchByAddress();
        } else if (
          addressField.split(" ").length - 1 === 0 &&
          addressField.length > 0
        ) {
          // Two Searches Unless in List then One Search

          this.objectOfAddressSearches = {
            callOne: {
              street: addressList[0],
              city: null,
              province: provinceInSearch,
              country: countryInSearch,
            },
            callTwo: {
              street: null,
              city: addressList[0],
              province: provinceInSearch,
              country: countryInSearch,
            },
          };

          // console.log(
          //   "Adress One Word:" + JSON.stringify(this.objectOfAddressSearches)
          // );
          this.searchByAddress();
        } else if (addressField.split(" ").length - 1 === 1) {
          // Three Searches Unless in List then searchTotal-numInList

          this.objectOfAddressSearches = {
            callOne: {
              street: addressList[0] + " " + addressList[1],
              city: null,
              province: provinceInSearch,
              country: countryInSearch,
            },
            callTwo: {
              street: addressList[0],
              city: addressList[1],
              province: provinceInSearch,
              country: countryInSearch,
            },
            callThree: {
              street: null,
              city: addressList[0] + " " + addressList[1],
              province: provinceInSearch,
              country: countryInSearch,
            },
          };
          // console.log(
          //   "Adress Two Words:" + JSON.stringify(this.objectOfAddressSearches)
          // );
          this.searchByAddress();
        } else if (addressField.split(" ").length - 1 === 2) {
          //
          this.objectOfAddressSearches = {
            callOne: {
              street:
                addressList[0] + " " + addressList[1] + " " + addressList[2],
              city: null,
              province: provinceInSearch,
              country: countryInSearch,
            },
            callTwo: {
              street: addressList[0] + " " + addressList[1],
              city: addressList[2],
              province: provinceInSearch,
              country: countryInSearch,
            },
            callThree: {
              street: addressList[0],
              city: addressList[1] + " " + addressList[2],
              province: provinceInSearch,
              country: countryInSearch,
            },
            callFour: {
              street: null,
              city:
                addressList[0] + " " + addressList[1] + " " + addressList[2],
              province: provinceInSearch,
              country: countryInSearch,
            },
          };
          // console.log(
          //   "Adress Three Words:" + JSON.stringify(this.objectOfAddressSearches)
          // );
          this.searchByAddress();
        } else if (addressField.split(" ").length - 1 >= 3) {
          const addressExceptLastThreeWords = addressField
            .split(" ")
            .slice(0, -3)
            .join(" ");

          const addressExceptLastTwoWords = addressField
            .split(" ")
            .slice(0, -2)
            .join(" ");

          const addressExceptLastWord = addressField
            .split(" ")
            .slice(0, -1)
            .join(" ");

          this.objectOfAddressSearches = {
            callOne: {
              street: addressField,
              city: null,
              province: provinceInSearch,
              country: countryInSearch,
            },
            callTwo: {
              street: addressExceptLastWord,
              city: addressList[addressList.length - 1],
              province: provinceInSearch,
              country: countryInSearch,
            },
            callThree: {
              street: addressExceptLastTwoWords,
              city:
                addressList[addressList.length - 2] +
                " " +
                addressList[addressList.length - 1],
              province: provinceInSearch,
              country: countryInSearch,
            },
            callFour: {
              street: addressExceptLastThreeWords,
              city:
                addressList[addressList.length - 3] +
                " " +
                addressList[addressList.length - 2] +
                " " +
                addressList[addressList.length - 1],
              province: provinceInSearch,
              country: countryInSearch,
            },
          };
          // console.log(
          //   "Adress Four Or More Words:" +
          //     JSON.stringify(this.objectOfAddressSearches)
          // );
          this.searchByAddress();
        }
      }
    },

    searchByAddress() {
      this.addressSearch(this.objectOfAddressSearches)
        .then((res) => {
          if (res) {
            this.$router.push("/searchresults");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchByLandlord() {
      this.landlordSearch(this.objectOfSearches)
        .then((res) => {
          if (res) {
            this.$router.push("/searchresults");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.navbar {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #222325;
}

li,
a {
  font-weight: 500;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}

.navbar {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 30px 10%;
}

.logo {
  cursor: pointer;
  margin-right: auto;
  order: 1;
  background-color: #acacac;
  /* padding: 0 3% 0 0; */
  width: 235px;
}
.nav {
  order: 3;
  margin-right: auto;
}
.nav_links {
  list-style: none;
  padding: 0 0 0 20px;
}
.nav_links li {
  display: inline-block;
  padding: 20px 20px 0 0;
}
.nav_links li:nth-child(4) {
  padding: 0 0 0 0;
}
.nav_links li:nth-child(2) {
  padding: 0 10px 0 0;
}
.nav_links li a {
  transition: all 0.3s ease 0s;
  color: #fafafa;
}
.nav_links li a:hover {
  color: #acacac;
}
.search {
  order: 2;
  flex: 2 1 0;
  min-width: 400px;
  padding-left: 50px;
}
.searchByAddress {
  background-color: white;
  padding-left: 10px;
  border-radius: 25px;
  width: 45%;
}
.searchByName {
  background-color: white;
  padding-left: 10px;
  margin-left: 20px;
  border-radius: 25px;
  width: 45%;
}
</style>
