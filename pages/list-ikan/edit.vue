<template>
  <div class="content-page-add">
    <h2 class="title-index">Edit Data Ikan.</h2>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="body.komoditas"
              label="Komoditas"
              outlined
              :rules="rules.komoditas"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-dialog
              ref="dialog"
              v-model="modalDate"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="body.tgl_parsed"
                  label="Tanggal"
                  outlined
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                scrollable
                locale="id"
                v-on:change="changeDate()"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modalDate = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="body.price"
              label="Harga"
              outlined
              onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) ) || event.keyCode == 32) return false;"
              prefix="Rp. "
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-autocomplete
              :items="listUkuran"
              :filter="customFilter"
              item-text="name"
              outlined
              :loading="loadingListUkuran"
              v-model="body.size"
              label="Ukuran"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" md="6" class="">
            <v-autocomplete
              :items="listProvinsi"
              :filter="customFilter"
              item-text="name"
              outlined
              :loading="loadingListProvinsi"
              v-model="body.area_provinsi"
              v-on:change="changeKota()"
              label="Provinsi"
              prepend-inner-icon="mdi-map-marker"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-autocomplete
              :items="listKota"
              :filter="customFilter"
              item-text="name"
              outlined
              :loading="loadingListKota"
              v-model="body.area_kota"
              label="Kota"
              :disabled="disabledKota"
              prepend-inner-icon="mdi-map-marker"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
      <v-container class="card-actions-data">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" outlined @click="cancelSave()" >Batal</v-btn>
          <v-btn
            color="green"
            outlined
            @click="saveData();"
            :disabled="body.komoditas === ''"
          >Perbaui</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>

    <v-dialog
      v-model="dialogSaveData"
      max-width="290"
    >
      <v-card>
        <v-container>
          <v-card-title class="headline justify-center">
            <h3>Success</h3>
          </v-card-title>

          <v-card-text class="text-center">
            Data Berhasil di Perbarui.
          </v-card-text>

          <v-card-actions class="display-flex justify-center">
            <v-btn
              color="green darken-1"
              outlined
              @click="dialogSaveData = false; $router.push('/list-ikan/add')"
            >
              Tambah Data Baru
            </v-btn>
            <v-btn
              color="green darken-1"
              outlined
              @click="dialogSaveData = false; $gf().backPage();"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as moment from 'moment';
const SteinStore = require("stein-js-client");

export default {
  name: 'add',
  components: {
  },
  data() {
    return {
      body: {
        uuid: this.$gf().createUuid(),
        komoditas: '',
        area_provinsi: '',
        area_kota: '',
        size: '',
        price: '',
        tgl_parsed: '',
        timestamp: this.$gf().getTimestamp()
      },
      rules: {
        komoditas: [val => (val || '').length > 0 || 'Field ini tidak boleh kosong.'],
      },
      date: '',
      modalDate: false,
      listUkuran: [],
      loadingListUkuran: true,
      listArea: [],
      listProvinsi: [],
      loadingListProvinsi: true,
      listKota: [],
      loadingListKota: false,
      disabledKota: true,
      dialogSaveData: false,
      dataEditIkan: {},
    }
  },
  methods: {
    init() {
      this.getListUkuran();
      this.getListArea();
      this.getdataEditIkan();
    },
    getdataEditIkan() {
      let dataEditIkan = window.$nuxt.$cookies.get('dataEditIkan');
      this.dataEditIkan = window.$nuxt.$cookies.get('dataEditIkan');
      if ( dataEditIkan === undefined ) {
        this.$router.push("/list-ikan");
      } else {
        this.body = dataEditIkan;
        this.body.price = dataEditIkan.price === "-" ? "" : dataEditIkan.price;
        this.date = dataEditIkan.tgl_parsed === "Invalid date" || dataEditIkan.tgl_parsed === "-" ? "" : moment(dataEditIkan.tgl_parsed).format('YYYY-MM-DD');

        this.changeKota();
      }
      this.$gf().loadingPage().hide();
    },
    getListUkuran() {
      const store = new SteinStore(
        this.$api().optionSize()
      );

      store.read("").then((data) => {
        // console.log('SteinStore Ukuran ', data);
        this.loadingListUkuran = false;
        this.listUkuran = data.map((e, i) => {
          let obj = {
            id: i,
            name: e.size,
            abbr: e.size,
          };
          return obj;
        })
      });
    },
    getListArea() {
      const store = new SteinStore(
        this.$api().optionArea()
      );

      store.read("").then((data) => {
        // console.log('SteinStore Area ', data);
        this.loadingListProvinsi = false;
        this.listArea = data;
        this.listProvinsi = data.filter((e, index, self) =>
          index === self.findIndex((t) => (
            t.province === e.province
          ))
        ).map((e, i) => {
          let obj = {
            id: i,
            name: e.province,
            abbr: e.province,
          };
          return obj;
        });
        setTimeout(() => {
          this.handleKota();
          this.body.area_kota = this.dataEditIkan.area_kota;
          // console.log('data edit ', this.dataEditIkan)
        }, 500);
      });
    },
    customFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const textTwo = item.abbr.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
    },
    changeDate() {
      // console.log('new date ', this.date);
      this.body.tgl_parsed = moment(this.date).locale('id').format('DD-MMMM-YYYY');
    },
    handleKota() {
      let dataProvinsi = this.body.area_provinsi;
      let listArea = this.listArea;
      this.listKota = listArea.filter((e, i) => {
        return e.province === dataProvinsi && e.city !== null;
      }).map((e, i) => {
        let obj = {
          id: i,
          name: e.city,
          abbr: e.city,
        };
        // console.log('obj ', obj);
        return obj;
      });
      setTimeout(() => {
        this.loadingListKota = false;
        this.disabledKota = false;
      })
    },
    changeKota() {
      // console.log('body.area_provinsi ', this.body.area_provinsi);
      this.loadingListKota = true;
      this.disabledKota = true;
      this.body.area_kota = "";
      this.handleKota();
    },
    resetField() {
      let body = this.body;
      body.uuid = this.$gf().createUuid();
      body.komoditas = '';
      body.area_provinsi = '';
      body.area_kota = '';
      body.size = '';
      body.price = '';
      body.tgl_parsed = '';
      this.date = '';
      body.timestamp = this.$gf().getTimestamp();
      this.disabledKota = true;
    },
    cancelSave() {
      this.$gf().cancelSvData().show();
    },
    saveData() {
      // console.log('data body ', this.body);
      this.$gf().loadingPage().show();
      this.body.tgl_parsed = this.date;

      const store = new SteinStore(
        this.$api().list()
      );

      store.edit("", {
        search: { uuid: this.body.uuid },
        set: this.body
      })
      .then((res) => {
        this.$gf().loadingPage().hide();
        this.dialogSaveData = true;
        window.$nuxt.$cookies.remove('dataEditIkan');
        // console.log('Success Updated Data' + res);
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
.v-card__text {
  &:first-child {
    padding-bottom: 0px !important;
  }
}
.card-actions-data {
  padding-top: 0px !important;
}
</style>
