<template>
  <!-- <div>
    <h2>Login</h2>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Login</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="loginUser">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                v-model="username"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                name="password"
                id="password"
                v-model="password"
              >
            </div>
            <input type="submit" class="btn btn-primary" value="Login">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/register" class="card-link">Need and account?</router-link>
          </form>
        </div>

      <div>
        
      </div>




      </div>
    </div>
  </div>
</template> -->

  <div>
    <v-card @submit.prevent="reg">
      <v-card-title>
        <span class="text-h5">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                label="Username*"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6"> </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="password"
                label="Password*"
                type="password"
                required
              ></v-text-field>
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
          v-on:click="loginUser()"
        >
          Submit
        </v-btn>
        <!--    v-on:click="$emit('close-dialog')" -->
      </v-card-actions>
    </v-card>
    <v-alert v-if="success" type="success">Success</v-alert>
    <v-alert v-if="failure" type="error">Error with Login</v-alert>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      success: false,
      failure: false,
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      console.log("aaaaaaaa");
      let user = {
        username: this.username,
        password: this.password,
      };
      this.login(user)
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
      this.password = "";
      this.success = true;
      console.log("b" + this.success);
      var self = this;

      setTimeout(function () {
        self.alertRerender("success");
      }, 5000);
    },

    showAlertFail() {
      this.password = "";
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

// import { mapActions } from "vuex";
// export default {
//   data() {
//     return {
//       username: "",
//       password: "",
//     };
//   },
//   methods: {
//     ...mapActions(["login"]),
//     loginUser() {
//       let user = {
//         username: this.username,
//         password: this.password,
//       };
//       this.login(user)
//         .then((res) => {
//           if (res.data.success) {
//             this.$router.push("/profile");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//   },
// };
//
//
</script>

<style>
.card {
  width: 60%;
  border-radius: 0;
}
.btn {
  border-radius: 0;
}
.form-control {
  border-radius: 0;
}
</style>
