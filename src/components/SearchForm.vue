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
    ...mapState(["query", "fulltext", "page"]),
    ...mapGetters(["waiting"]),
  },
  methods: {
    ...mapMutations([
      "setQuery",
      "resetPages",
      "enqueue",
      "dequeue",
      "setResults",
      "appendResults",
      "setNeighbors",
    ]),
    async queryChanged() {
      this.setQuery(this.q);
      // Requests are triggered by watcher.
    },
    async searchArticles(query) {
      this.enqueue("search");
      this.resetPages();
      const [res1, res2] = await searchDebounced(this.query, this.fulltext);
      // The request can take some time. Discard this result if the query has already changed.
      // TODO What actually takes time is the promises res1 and res2 to resolve.
      if (query !== this.query) return;

      res1.then(({ items, count }) =>
        this.setResults({ edition: 1, items, count })
      );
      res2.then(({ items, count }) =>
        this.setResults({ edition: 2, items, count })
      );
      Promise.all([res1, res2]).finally(() => this.dequeue("search"));
    },
    async nextPage(edition) {
      this.enqueue("next" + edition);
      // TODO Change search() to only do one edition.
      const [res1, res2] = await searchDebounced(
        this.query,
        this.fulltext,
        this.page[edition]
      );
      const { items } = await (edition === 2 ? res2 : res1);
      this.appendResults({ edition, items });
      this.dequeue("next" + edition);
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
    "page.1"() {
      this.nextPage(1);
    },
    "page.2"() {
      this.nextPage(2);
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
