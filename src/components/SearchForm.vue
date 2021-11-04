<template>
  <input
    type="text"
    id="search"
    v-model="q"
    placeholder="Sök..."
    @input="queryChanged"
  />
</template>

<script>
import { debounce } from "@/assets/util";
import { getSimilarTerms, search } from "@/services/norfam.service";
import { mapMutations, mapState } from "vuex";

const searchDebounced = debounce(search);
const getSimilarTermsDebounced = debounce(getSimilarTerms);

export default {
  name: "SearchForm",
  data: () => ({
    q: "",
  }),
  computed: {
    ...mapState(["query", "fulltext"]),
  },
  methods: {
    ...mapMutations(["setQuery", "setResults", "setNeighbors"]),
    async queryChanged() {
      this.setQuery(this.q);
      // Requests are triggered by watcher.
    },
    async searchArticles(query) {
      const [res1, res2] = await searchDebounced(this.query, this.fulltext);
      // The request can take some time. Discard this result if the query has already changed.
      if (query !== this.query) return;
      res1.then((results) => this.setResults({ edition: 1, results }));
      res2.then((results) => this.setResults({ edition: 2, results }));
    },
    async findSimilarTerms(query) {
      const [res1, res2] = await getSimilarTermsDebounced(query);
      if (query !== this.query) return;
      res1.then((neighbors) => this.setNeighbors({ edition: 1, neighbors }));
      res2.then((neighbors) => this.setNeighbors({ edition: 2, neighbors }));
    },
  },
  watch: {
    query(query) {
      this.q = query;
      this.searchArticles(this.q);
      this.findSimilarTerms(this.q);
    },
    fulltext() {
      this.searchArticles(this.q);
      this.findSimilarTerms(this.q);
    },
  },
};
</script>

<style>
#search {
  font-size: 50px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  height: 80px;
  padding: 0px 10px 10px 0px;
  font-family: "Barlow Condensed", sans-serif;
  font-weight: 100;
}
</style>
