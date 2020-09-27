import Vue from "vue";
import Vuex from "vuex";
import mbx from './mbx';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    mbx
  }
});

export default store;
