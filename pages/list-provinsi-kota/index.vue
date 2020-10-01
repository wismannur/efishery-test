<template>
  <div class="content-index-list-ikan">
    <h2 class="title-index">Data Provinsi dan Kota.</h2>
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
          :to="'/list-provinsi-kota/add'"
          class="url-link-ef-tst"
        >
          <v-btn
            color="green"
            class="mb-2"
            outlined
          >
            <v-icon left>mdi-plus</v-icon>
            Tambah Data
          </v-btn>
        </nuxt-link>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :loading="loadingListData"
        loading-text="Sedang Memuat Data..."
        class="table-list-provinsi-kota"
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
            Anda Yakin ingin menghapus Data <br> "{{ deleteData.province }} - {{ deleteData.city }}" ?
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
        {
          text: 'Actions',
          align: 'start',
          sortable: false,
          value: 'actions'
        },
        { text: 'Provinsi', value: 'province' },
        { text: 'Kota', value: 'city' },
      ],
      desserts: [],
      deleteData: {
        province: '',
        city: ''
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
        this.$api().optionArea()
      );

      store.read("").then((data) => {
        // console.log('SteinStore', data);
        this.loadingListData = false;
        this.desserts = data.map((e, i) => {
          let obj = {
            province: this.$gf().checkTrimText(e.province),
            city: this.$gf().checkTrimText(e.city),
            idx: i,
          };
          return obj;
        }).reverse();
      });
    },
    editItem(item) {
      let obj = {
        province: item.province,
        city: item.city
      };
      window.$nuxt.$cookies.set("dataEditProvince", obj);
      this.$gf().loadingPage().show();
      setTimeout(() => {
        this.$router.push('/list-provinsi-kota/edit');
      }, 1000);
    },
    deleteItem(item) {
      this.deleteData = item;
      this.dialogDeleteData = true;
    },
    fixDeleteItem() {
      this.$gf().loadingPage().show();
      const store = new SteinStore(
        this.$api().optionArea()
      );
      let data = this.deleteData;
      store
        .delete("", {
          search: { province: data.province, city: data.city }
        })
        .then((res) => {
          // console.log(res);
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
  margin-top: 15px;
}
@media (max-width: 481px) {
  .title-index {
    margin: 5px 0 10px 5px;
  }
}
</style>
