<template>
  <div class="page">
  <v-container>
    <v-row justify="center">
        <h4>Picture of day</h4>
    </v-row>
    <v-row justify="center">
      <v-btn icon="left" @click="prevPic"><</v-btn>
        <v-card min-width="800">
          <v-img
              class="bg-grey-lighten-2"

              :src="getCurrentPicture"
              cover
          ></v-img>
          <v-card-title class="text-h6">
            {{ getCurrentTitle }}
          </v-card-title>
        </v-card>
      <v-btn icon="right"@click="nextPic">></v-btn>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import {useNasaDataStore} from "@/store/nasaDataStore.js";

import {mapActions, mapState} from "pinia";

  export default {

    name: 'HomePage',
    data() {
      return {
        picIndex: 0,
      }
    },
    methods: {
      ...mapActions(useNasaDataStore, ['getPictures']),
      nextPic() {
        this.picIndex = this.picIndex === this.quantityDays - 1 ? 0 : this.picIndex + 1;
      },
      prevPic() {
        this.picIndex = this.picIndex === 0 ? this.quantityDays - 1 : this.picIndex - 1;
      },
    },
    computed: {
      ...mapState(useNasaDataStore, ['pictures', 'quantityDays']),
      getCurrentPicture() {
        return this.pictures.length === 0 ? '' : this.pictures[this.picIndex].url;
      },
      getCurrentTitle() {
        return this.pictures.length === 0 ? 'No image available now' : this.pictures[this.picIndex].title;
      },
    },
    mounted() {
      if (!this.pictures || this.pictures.length === 0) {
        this.getPictures();
      }
    }
  };
</script>

<style>

</style>