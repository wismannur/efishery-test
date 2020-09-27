<template>
  <div class="content-index">
    <h2 class="title-index">Harga Ikan di Indonesia.</h2>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :loading="loadingListData"
        loading-text="Loading... Please wait"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
const SteinStore = require("stein-js-client");
import * as moment from 'moment';

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data () {
    return {
      search: '',
      loadingListData: true,
      headers: [
        // {
        //   text: 'Dessert (100g serving)',
        //   align: 'start',
        //   sortable: false,
        //   value: 'name',
        // },
        { text: 'Komoditas', value: 'komoditas' },
        { text: 'Provinsi', value: 'area_provinsi' },
        { text: 'Kota', value: 'area_kota' },
        { text: 'Harga', value: 'price' },
        { text: 'Ukuran', value: 'size' },
        { text: 'Tanggal', value: 'tgl_parsed' },
      ],
      desserts: [],
    }
  },
  methods: {
    init() {
      this.getListData();
    },
    getListData() {
      const store = new SteinStore(
        this.$api().list()
      );

      store.read("").then((data) => {
        // console.log('SteinStore', data);
        this.loadingListData = false;
        this.desserts = data.filter((e) => {
          if ( e.uuid == null ) {
            console.log('data null ', e);
          } else if (moment(e.tgl_parsed).format('DD-MMM-YYYY') == "Invalid date") {
            console.log('invalid date format');
          } else {
            return e;
          }
        }).map((e) => {
          let obj = {
            area_kota: this.$gf().checkTrimText(e.area_kota),
            area_provinsi: this.$gf().checkTrimText(e.area_provinsi),
            komoditas: this.$gf().checkTrimText(e.komoditas),
            price: this.$gf().checkTrimText(e.price),
            size: this.$gf().checkTrimText(e.size),
            tgl_parsed: moment(this.$gf().checkTrimText(e.tgl_parsed)).format('DD-MMM-YYYY'),
            timestamp: this.$gf().checkTrimText(e.timestamp),
            uuid: this.$gf().checkTrimText(e.uuid),
          };
          return obj;
        })
      });
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
.title-index {
  margin: 5px 0 10px 15px;
}
</style>
