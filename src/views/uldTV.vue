<template>
  <div class="about pa-6">
    <h1>uldTV </h1>

    <v-btn
        elevation="2"
        fab
        x-small
        raised
        tile
    ></v-btn>

    <v-card
        flat
        class="py-12"
    >
      {{date}}
      <v-item-group active-class="primary">
        <v-container>
          <v-row>
            <v-col
                v-for="n in 256"
                :key="n"
                cols="16"
                rows="16"
                md="1"
            >
              <v-item v-slot="{ active, toggle }">
                <v-card
                    class="d-flex align-center btn"
                    accent
                    width="20"
                    height="20"
                    @click="toggle"
                >
                  <v-scroll-y-transition>
                    <div
                        v-if="active"
                        class="btn display-1 flex-grow-5 text-center"
                    >
                      Active
                    </div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-card>

      </div>
</template>
<style lang="sass">

</style>

<script>
import { format } from 'date-fns'

export default {
  data() {
    return {
      date: ''
    }
  },
  methods: {
    getDate() {
      this.date = format(new Date(), 'MMMM d, H:mm:ss')
      setTimeout(this.getDate, 1000)
    },
    test(){
      console.log("FOO TEST");

    }
  },
  mounted() {
    this.getDate()
    this.test()
  }
}
</script>
