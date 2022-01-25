<template>
  <div>
    <h2>Profile</h2>
    <!-- <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">Username: {{ user.username }}</li>
        <li class="list-group-item">Name: {{ user.name }}</li>
      </ul>
    </div> -->
    
    <v-card class="mx-auto" max-width="650" tile>
         
          
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content>
                <v-list-item-title class="text-h4">Email: {{ user.email }}  </v-list-item-title>
                <v-list-item-subtitle class="text-h5">Username: {{ user.username }}</v-list-item-subtitle>
                <v-list-item-subtitle class="text-h5">Name: {{ user.name }}</v-list-item-subtitle>
                
              </v-list-item-content>
            </v-list-item>
      </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"])
  },
  created() {
    this.getProfile();
  }
};
</script>

<style>

</style>