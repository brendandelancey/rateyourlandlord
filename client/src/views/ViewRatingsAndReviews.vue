<template>
  <div class="landlordratings">
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

    <div class="ratingsBlock">
      <div
        v-for="rating in queriedRatings"
        :key="rating.id"
        class="initialpost"
      >
        <div class="rating_review_block">
          <div class="reviewRating">
            <h4>Landlord Rating:</h4>
            <div>
              <span> {{ rating.rating }} / 5</span>
            </div>
          </div>
          <div class="reviewReview">
            <h4>Review:</h4>
            <div>
              <span> {{ rating.review }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CreateRating(initialpost.id) -->
    <h4 class="createRating" @click="CreateRating()">Create a new rating</h4>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      initialpost: {},
    };
  },
  props: ["id"],
  mounted() {
    var retrieved = localStorage.getItem("initialpost");
    // console.log("InitialPost in View: " + JSON.parse(JSON.stringify(retrieved)));
    this.initialpost = JSON.parse(retrieved);
  },

  computed: mapGetters(["queriedRatings"]),
  methods: {
    CreateRating() {
      // IPid
      // const id = IPid;

      // console.log("In Here");
      // console.log("Initial Post: " + JSON.stringify(id));
      this.$router.push("/createrating");
    },
  },
};
</script>
<style>
.landlordratings {
  min-height: 85vh;
}

.ratingsBlock {
  padding-bottom: 50px;
}

.initialpost {
  display: flex;
  padding-bottom: 50px;
  justify-content: center;
}
.rating_review_block {
  flex-basis: 75%;
}
.reviewReview {
  display: flex;
  flex-direction: row;
  background-color: #eaeff1;
}
.reviewReview h4 {
  flex: 1;
  text-align: left;
  padding: 8px;
}
.reviewReview span {
  flex: 2;
  vertical-align: middle;
  text-align: left;
  /* padding: 3px; */
  background-color: #dddcde;
}
.reviewReview div {
  flex: 2;
  vertical-align: middle;

  text-align: left;
  padding: 9px;
  background-color: #dddcde;
  overflow: auto;
  width: 200px;
  font-size: 20px;
}
.reviewRating div {
  flex: 2;
  vertical-align: middle;
  text-align: left;
  padding: 9px;
  background-color: #dddcde;
  overflow: auto;
  width: 200px;
}
.reviewRating {
  display: flex;
  flex-direction: row;
  /* line-height: 28px; */
  background-color: #eaeff1;
}

.reviewRating h4 {
  flex: 1;
  text-align: left;
  padding: 8px;
}
.reviewRating span {
  flex: 2;
  vertical-align: middle;
  font-size: 36px;
  text-align: left;
  /* padding: 3px; */
  background-color: #dddcde;
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
  line-height: 125px;
}
.createRating {
  cursor: pointer;
  /* clear: both; */
  width: 100%;
  position: absolute;
  height: 1.5rem;
  /* bottom: 2rem; */
  padding-bottom: 50px;
  bottom: 0;
  margin-bottom: 6rem;
}
@media only screen and (max-width: 600px) {
  .createRating {
    margin-bottom: 1rem;
  }
  .rating_review_block {
    flex-basis: 75%;
  }
  .reviewReview {
    display: flex;
    flex-direction: row;
    background-color: #eaeff1;
  }
  .reviewReview h4 {
    flex: 1;
    text-align: left;
    padding: 8px;
  }
  .reviewReview span {
    flex: 2;
    vertical-align: middle;
    text-align: left;
    /* padding: 3px; */
    background-color: #dddcde;
  }
  .reviewReview div {
    flex: 2;
    vertical-align: middle;

    text-align: left;
    padding: 9px;
    background-color: #dddcde;
    overflow: auto;
    width: 200px;
    font-size: 20px;
  }
  .reviewRating div {
    flex: 2;
    vertical-align: middle;
    text-align: left;
    padding: 9px;
    background-color: #dddcde;
    overflow: auto;
    width: 200px;
  }
  .reviewRating {
    display: flex;
    flex-direction: row;
    /* line-height: 28px; */
    background-color: #eaeff1;
  }

  .reviewRating h4 {
    flex: 1;
    text-align: left;
    padding: 8px;
    font-size: 22px;
  }
  .reviewRating span {
    flex: 2;
    vertical-align: middle;
    font-size: 36px;
    text-align: left;
    /* padding: 3px; */
    background-color: #dddcde;
  }
}
</style>
