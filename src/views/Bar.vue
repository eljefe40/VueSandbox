<template>
  <div class="about pa-6">
    <h1>Bar </h1>

    <v-textarea
        solo
        background-color="accent"
        name="input-7-4"
    ></v-textarea>
    <v-col
        cols="12"
        class="py-2"
    >


      <v-btn-toggle
          v-model="text"
          tile
          color="deep-purple accent-3"
          group
      >
        <v-btn value="1">
          One
        </v-btn>

        <v-btn value="2">
          Two
        </v-btn>

        <v-btn value="3">
          Three
        </v-btn>

        <v-btn value="4">
          Four
        </v-btn>
      </v-btn-toggle>
    </v-col>



      </div>
</template>
