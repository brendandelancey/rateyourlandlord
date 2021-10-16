<template>
  <div>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Navbar</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">


    </head>
    <div class="footer">
      <div class="navbar">
            
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
      <div id="TextAndLegal">
            © RateYourStudentHouse
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
     data(){
  return {
      
        id:'',
      
        
      }
    },
  },
  methods: {
    //! This might not be how you call two modules, needs testing
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },


    
    

  }

};
</script>

<style>
.TextAndLegal {
  background-color: darkgray;
}
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

/* .footer{
  width: 100%;
  position: fixed;
  bottom: 0;
} */


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

/* 
.footer {
  position: fixed;
  bottom: 0;
} */
  </style>
