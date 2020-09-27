<template>
  <div class="content-index-list-ikan">
    <h2 class="title-index">Harga Ikan di Indonesia.</h2>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Cari Data"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <nuxt-link
          :to="'/list-ikan/add'"
          class="url-link-ef-tst"
        >
          <v-btn
            color="green"
            class="mb-2"
            outlined
          >Tambah Data</v-btn>
        </nuxt-link>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :loading="loadingListData"
        loading-text="Sedang Memuat Data..."
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            class="mr-2"
            title="Ubah Data"
            @click="editItem(item)"
            color="warning"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            title="Hapus Data"
            @click="deleteItem(item)"
            color="error"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialogDeleteData"
      max-width="400"
    >
      <v-card>
        <v-container>
          <v-card-title class="headline justify-center">
            <h3>Hapus Data</h3>
          </v-card-title>

          <v-card-text class="text-center">
            Anda Yakin ingin menghapus Data <br> "{{ deleteData.komoditas }}" ?
          </v-card-text>

          <v-card-actions class="display-flex justify-center">
            <v-btn
              color="error"
              outlined
              @click="dialogDeleteData = false;"
            >
              Batal
            </v-btn>
            <v-btn
              color="green darken-1"
              outlined
              @click="dialogDeleteData = false; fixDeleteItem();"
            >
              Hapus
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
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
        { text: 'Actions', value: 'actions' },
        { text: 'Komoditas', value: 'komoditas' },
        { text: 'Provinsi', value: 'area_provinsi' },
        { text: 'Kota', value: 'area_kota' },
        { text: 'Harga', value: 'price_parsed' },
        { text: 'Ukuran', value: 'size' },
        { text: 'Tanggal', value: 'tgl_parsed' },
      ],
      desserts: [],
      deleteData: {
        komoditas: ''
      },
      dialogDeleteData: false,
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
            price_parsed: this.$gf().convertToCurrency(this.$gf().checkTrimText(e.price) == '-' ? '0' : parseInt((this.$gf().checkTrimText(e.price)).split('.').join('')), 'Rp. '),
            size: this.$gf().checkTrimText(e.size),
            tgl_parsed: moment(this.$gf().checkTrimText(e.tgl_parsed)).format('DD-MMM-YYYY'),
            timestamp: this.$gf().checkTrimText(e.timestamp),
            uuid: this.$gf().checkTrimText(e.uuid),
          };
          return obj;
        }).reverse();
      });
    },
    editItem(item) {
      window.$nuxt.$cookies.set("dataEdit", item);
      this.$gf().loadingPage().show();
      setTimeout(() => {
        this.$router.push('/list-ikan/edit');
      }, 1000);
    },
    deleteItem(item) {
      this.deleteData = item;
      this.dialogDeleteData = true;
    },
    fixDeleteItem() {
      this.$gf().loadingPage().show();
      const store = new SteinStore(
        this.$api().list()
      );

      store
        .delete("", {
          search: { uuid: this.deleteData.uuid }
        })
        .then((res) => {
          console.log(res);
          this.$gf().loadingPage().hide();
          this.$gf().msgHandler().show("Success", "Data Berhasil di Hapus.");
          this.getListData();
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
.url-link-ef-tst {
  text-decoration: none;
}
</style>
