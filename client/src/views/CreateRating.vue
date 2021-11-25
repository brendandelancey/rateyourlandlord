<template>
  <div class="createrating">
    <!-- Either remove columns or make 1 and 3 very small -->
    <div class="IP">
      <h1 class="name">
        {{ initialpost.landlordfirstname }} {{ initialpost.landlordlastname }}
      </h1>

      <div class="IP-row">
        <div class="IPinformation">
          <h4>{{ initialpost.country }} {{ initialpost.province }}</h4>
          <h4>{{ initialpost.city }} {{ initialpost.street }}</h4>
        </div>

        <div class="averageRating">
          <h2>{{ initialpost.ratingAverage }} / 5</h2>
        </div>
      </div>
    </div>
    <div class="create_rating_form">
      <v-card @submit.prevent="reg">
        <v-card-title>
          <span class="text-h5">Leave A Rating </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue darken-1"
            text
            type="submit"
            v-on:click="createRating()"
          >
            Submit
          </v-btn>
          <!--    v-on:click="$emit('close-dialog')" -->
        </v-card-actions>
      </v-card>
      <v-alert v-if="success" type="success">Success</v-alert>
      <v-alert v-if="failure" type="error">Error with Sign Up</v-alert>
    </div>
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
      review: "",
      rating: 0,
      initialpost: {},
    };
  },
  mounted() {
    var retrieved = localStorage.getItem("initialpost");
    // console.log("InitialPost in Create Rating: " + JSON.parse(JSON.stringify(retrieved)))
    this.initialpost = JSON.parse(retrieved);
  },
  methods: {
    ...mapActions(["newRating"]),

    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form))
      // console.log("Review: "+this.review)
      // console.log("Rating: "+this.rating)
      this.createRating();
    },
    createRating() {
      const ratingObject = {
        rating: this.rating,
        review: this.review,
        IPid: this.initialpost.id,
      };
      // console.log("In Here")
      this.newRating(ratingObject)
        .then((res) => {
          // console.log("Resp: ");
          // console.log(res);
          if (res) {
            this.showAlertSuccess();
            // console.log("GOT HERE");
            // Call an alert component, says it was completed or wasnt in the bottom, then kicks to home?
            var self = this;
            setTimeout(function () {
              self.$router.push("/");
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err);
          this.showAlertFail();
        });
    },

    showAlertSuccess() {
      console.log("a" + this.success);
      this.rating = "";
      this.review = "";
      this.success = true;
      console.log("b" + this.success);
      var self = this;

      setTimeout(function () {
        self.alertRerender("success");
      }, 3000);
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
.create_rating_form {
  display: flex;
  flex-direction: column;
  padding: 100px 0 0 0;
  justify-content: center;
  padding-bottom: 200px;
}

.IP {
  display: flex;
  flex-direction: column;
  padding: 15px 0 15px 0;
}
.name {
  font-size: 64px;
}
.IP-row {
  display: flex;
  height: 100%;
  justify-content: center;
}

.IPinformation {
  flex: 2;
}
.averageRating {
  flex: 1;
}
.averageRating h2 {
  background-color: darkgray;
  height: 125px;
  width: 125px;
}
.submit-rating {
  width: 100%;
}
</style>
