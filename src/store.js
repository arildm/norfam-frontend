import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    query: "",
    modalVisible: null,
    fulltext: false,
    results: { 1: [], 2: [] },
    neighbors: [],
  },
  mutations: {
    setQuery(state, query) {
      state.query = query;
    },
    showModal(state, name) {
      state.modalVisible = name;
    },
    hideModal(state) {
      state.modalVisible = null;
    },
    setFulltext(state, fulltext) {
      state.fulltext = fulltext;
    },
    setResults(state, { edition, results }) {
      state.results[edition] = results;
    },
    setNeighbors(state, neighbors) {
      state.neighbors = neighbors;
    },
  },
  actions: {},
});
