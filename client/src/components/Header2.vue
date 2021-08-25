<template>
  <div>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Navbar</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">


    </head>

    <div class="navbar">
            <div class="logo">
                <img  :src="require('../assets/RateYourLanlordLogo67p.png')" alt="Rate Your Landlord" />
            </div>
            <div class="search">
                <input class="searchByAddress" type="text" v-model="searchAddress" placeholder="Search by name: First-Last name"> 
                <input class="searchByName" type="text" v-model="searchName" placeholder="Search by address C-P-C-S"> 
            </div>
            <div class="nav">
                <nav>
                    <ul class="nav_links">
                        <li><a href="/login" v-if="!isLoggedIn">Login</a></li>
                        <li><a href="/profile" v-if="isLoggedIn">Profiles</a></li>
                        <li><a href="/register" v-if="!isLoggedIn">Register</a></li>
                        <li><a href="/logout" v-if="isLoggedIn" @click.prevent="logoutUser">Logout</a></li>
                    </ul>
                </nav>
            </div>
    </div>

  </div>
  
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    //! This might not be how you call two modules, needs testing
    ...mapActions(["logout"],["addressSearch"]),
    logoutUser() {
      this.logout();
    },

  
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
        street: this.street,
        city: this.city,
        province: this.province,
        country: this.country
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
.navbar{
    box-sizing:border-box;
    margin:0;
    padding:0;
    background-color: #222325;
}

li, a{
    font-weight:500;
    font-size: 16px;
    color: #edf0f1;
    text-decoration: none;
}

.navbar{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 30px 10%;
}


.logo{
  cursor: pointer;
  margin-right: auto;
  order:1;
  background-color: #acacac;
  padding: 0 3% 0 0;
}
.nav{
    order:3;
    margin-right: auto;
}
.nav_links{
    list-style: none;
}
.nav_links li{
    display: inline-block;
    padding: 20px 20px 0 0;
}
.nav_links li:nth-child(4){
    padding: 0 0 0 0;
}
.nav_links li:nth-child(2){
    padding: 0 10px 0 0;
}
.nav_links li a{
    transition: all 0.3s ease 0s;
    color: #fafafa;
}
.nav_links li a:hover{
   color: #acacac;
}
.search{
    order:2;
    flex: 2 1 0;
    min-width: 400px;
    padding-left: 50px;
    
}
.searchByAddress{
    padding-left: 10px;
    border-radius: 25px;
    width:45%;
}
.searchByName{
    padding-left: 10px;
    margin-left: 20px;
    border-radius: 25px;
    width:45%;
}
  </style>
