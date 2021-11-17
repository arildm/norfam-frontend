<template>
  <Row class="search-row">
    <input
      type="text"
      id="search"
      v-model="q"
      placeholder="Sök..."
      @input="queryChanged"
    />
    <div v-show="waiting">Laddar...</div>
  </Row>
</template>

<script>
import { debounce } from "@/assets/util";
import { getSimilarTerms, search } from "@/services/norfam.service";
import { mapGetters, mapMutations, mapState } from "vuex";

const searchDebounced = debounce(search);
const getSimilarTermsDebounced = debounce(getSimilarTerms);

export default {
  name: "SearchForm",
  data: () => ({
    q: "",
  }),
  computed: {
    ...mapState(["query", "fulltext"]),
    ...mapGetters(["waiting"]),
  },
  methods: {
    ...mapMutations([
      "setQuery",
      "enqueue",
      "dequeue",
      "setResults",
      "setNeighbors",
    ]),
    async queryChanged() {
      this.setQuery(this.q);
      // Requests are triggered by watcher.
    },
    async searchArticles(query) {
      this.enqueue("search");
      const [res1, res2] = await searchDebounced(this.query, this.fulltext);
      // The request can take some time. Discard this result if the query has already changed.
      if (query !== this.query) return;

      res1.then((results) => this.setResults({ edition: 1, results }));
      res2.then((results) => this.setResults({ edition: 2, results }));
      Promise.all([res1, res2]).finally(() => this.dequeue("search"));
    },
    async findSimilarTerms(query) {
      this.enqueue("similar");
      const [res1, res2] = await getSimilarTermsDebounced(query);
      if (query !== this.query) return;

      res1.then((neighbors) => this.setNeighbors({ edition: 1, neighbors }));
      res2.then((neighbors) => this.setNeighbors({ edition: 2, neighbors }));
      Promise.all([res1, res2]).finally(() => this.dequeue("similar"));
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

<style scoped>
.search-row {
  display: flex;
  align-items: center;
}

#search {
  flex: 1;
  font-size: 50px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  height: 80px;
  padding: 0px 10px 10px 0px;
  font-family: "Barlow Condensed", sans-serif;
  font-weight: 100;
}
</style>
