//May later include negative feedback if login fails
<template>
  <!-- <b-container fluid>
    <b-row>
        <div>
            <b-card title="Register" >
                <b-card-text>
                    <form @submit.prevent="registerUser">
                        <div class="form-group">
                            <b-form-group
                            
                            id="username"
                            label="Username"
                            label-for="username"
                            >
                            <b-form-input 
                            id="username"
                            type="text"
                            placeholder="Username"
                            name="username"
                            v-model="username"
                            class="form-control">
                            </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="form-group">
                            <b-form-group
                            id="name"
                            label="Name"
                            label-for="name"
                            >
                            <b-form-input 
                            id="name"
                            type="text"
                            placeholder="Name"
                            name="name"
                            v-model="name"
                            class="form-control">
                            </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="form-group">
                            <b-form-group
                            id="email"
                            label="Email"
                            label-for="email"
                            >
                            <b-form-input 
                            id="email"
                            type="text"
                            placeholder="Email"
                            name="email"
                            v-model="email"
                            class="form-control">
                            </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="form-group">
                            <b-form-group
                            id="password"
                            label="Password"
                            label-for="password"
                            >
                            <b-form-input 
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            v-model="password"
                            class="form-control">
                            </b-form-input>
                            </b-form-group>
                        </div>
                        <div class="form-group">
                            <b-form-group
                            id="confirm_password"
                            label="Confirm Password"
                            label-for="confirm_password"
                            >
                            <b-form-input 
                            id="confirm_password"
                            type="confirm_password"
                            placeholder="Confirm Password"
                            name="confirm_password"
                            v-model="confirm_password"
                            class="form-control">
                            </b-form-input>
                            </b-form-group>
                        </div>
                        <input type="submit" class="btn btn-primary" value="Create">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <b-link href="/login" variant="primary">Already have an account?</b-link >
                    </form>
                </b-card-text>
            </b-card>


        </div>
     
    </b-row>
  </b-container> -->
  <div>
    <v-card @submit.prevent="reg">
      <v-card-title>
        <span class="text-h5">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="name"
                label="Legal name*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="username"
                label="Username*"
                hint="needs to be unique"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                label="Email*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="confirm_password"
                label="Confirm Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <!-- <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete> -->
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn
            color="blue darken-1"
            text
            v-on:click="$emit('close-dialog')"
          >
            Close
          </v-btn> -->
        <v-btn
          color="blue darken-1"
          text
          type="submit"
          v-on:click="registerUser()"
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
      success: false,
      failure: false,
      username: "",
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    registerUser() {
      console.log("Here");
      let user = {
        username: this.username,
        name: this.name,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
      };
      // console.log(user);
      this.register(user)
        .then((res) => {
          if (res.data.success) {
            console.log("Here2");
            this.showAlertSuccess();
          }
        })
        .catch((err) => {
          console.log("Here3");
          console.log(err);
          this.showAlertFail();
        });
    },

    showAlertSuccess() {
      console.log("a" + this.success);
      this.username = "";
      this.name = "";
      this.email = "";
      this.password = "";
      this.confirm_password = "";
      this.success = true;
      console.log("b" + this.success);
      var self = this;

      setTimeout(function () {
        self.alertRerender("success");
      }, 5000);
    },

    showAlertFail() {
      this.password = "";
      this.confirm_password = "";
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
