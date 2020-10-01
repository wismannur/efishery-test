<template>
  <div class="content-page-add">
    <h2 class="title-index">Tambah Data Baru.</h2>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6"
            v-if="!existingProvince"
          >
            <v-text-field
              v-model="body.province"
              label="Provinsi"
              outlined
              :rules="rules.province"
              required
              class="text-uppercase"
              v-on:keyup="textUpper('province')"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            v-if="existingProvince"
          >
            <v-autocomplete
              :items="listProvinsi"
              :filter="customFilter"
              item-text="name"
              outlined
              :loading="loadingListProvinsi"
              v-model="body.province"
              label="Provinsi"
              prepend-inner-icon="mdi-map-marker"
              v-on:keyup="textUpper('province')"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              class="text-uppercase"
              v-model="body.city"
              label="Kota"
              outlined
              v-on:keyup="textUpper('city')"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6" class="use-existing-province">
            <v-checkbox
              v-model="existingProvince"
              @click="body.province = ''"
              label="Gunakan Data Provinsi yang sudah ada."
            ></v-checkbox>
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
            :disabled="body.province === ''"
          >Simpan</v-btn>
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
            Data Berhasil Tersimpan.
          </v-card-text>

          <v-card-actions class="display-flex justify-center">
            <v-btn
              color="green darken-1"
              outlined
              @click="dialogSaveData = false; resetField();"
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
const SteinStore = require("stein-js-client");

export default {
  name: 'add',
  components: {
  },
  data() {
    return {
      body: {
        province: '',
        city: '',
      },
      rules: {
        province: [val => (val || '').length > 0 || 'Field ini tidak boleh kosong.'],
      },
      listArea: [],
      listProvinsi: [],
      loadingListProvinsi: true,
      listKota: [],
      loadingListKota: false,
      disabledKota: true,
      dialogSaveData: false,
      existingProvince: false,
    }
  },
  methods: {
    init() {
      this.getListArea();
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
        })
      });
    },
    customFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const textTwo = item.abbr.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
    },
    resetField() {
      let body = this.body;
      body.province = '';
      body.city = '';
    },
    textUpper(f) {
      let body = this.body[f];
      this.body[f] = body.toUpperCase();
    },
    cancelSave() {
      this.$gf().cancelSvData().show();
    },
    saveData() {
      this.$gf().loadingPage().show();
      this.body.tgl_parsed = this.date;
      // console.log('data body ', this.body);

      const store = new SteinStore(
        this.$api().optionArea()
      );

      store.append("", [ this.body ])
      .then((res) => {
        this.$gf().loadingPage().hide();
        this.dialogSaveData = true;
        // console.log('Success Saved Data' + res);
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
.use-existing-province {
  > div {
    margin: 0%;
    padding: 0%;
  }
}
</style>
