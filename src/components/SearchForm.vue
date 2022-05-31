<template>
  <Row class="search-row">
    <input
      type="text"
      id="search"
      v-model="q"
      placeholder="Sök efter..."
      @input="queryChanged"
    />
    <div v-show="waiting" class="loading-indicator">Laddar...</div>
  </Row>
</template>

<script>
import { debounce } from "@/assets/util";
import { getSimilarTerms, search } from "@/services/norfam.service";
import { mapGetters, mapMutations, mapState } from "vuex";

// Debounce the search method to be more responsive while the user is editing the query input.
// We want to search simultaneously in both editions, so keep a separate debounce function for each edition.
// Since we're redefining the function per edition, we can preset the edition param as well.
const searchInEdition = {
  1: debounce((query, fulltext, page) => search(1, query, fulltext, page)),
  2: debounce((query, fulltext, page) => search(2, query, fulltext, page)),
};
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
      this.resetPages();
      this.searchArticlesInEdition(1, query, this.fulltext);
      this.searchArticlesInEdition(2, query, this.fulltext);
    },
    async searchArticlesInEdition(edition, query) {
      // Reset results if query empty.
      if (!query) {
        this.setResults({ edition, items: [], count: null });
        return;
      }
      this.enqueue("search" + edition);
      const { items, count } = await searchInEdition[edition](
        query,
        this.fulltext
      );
      // The request can take some time. Discard this result if the query has already changed.
      if (query !== this.query) return;
      this.setResults({ edition, items, count });
      this.dequeue("search" + edition);
    },
    async nextPage(edition) {
      this.enqueue("next" + edition);
      const { items } = await searchInEdition[edition](
        this.query,
        this.fulltext,
        this.page[edition]
      );
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
    "page.1"(page) {
      if (page > 1) this.nextPage(1);
    },
    "page.2"(page) {
      if (page > 1) this.nextPage(2);
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
  font-size: 50px;
  width: 48.5%;
  background-color: rgba(255 255 255 / 25%);
  border-radius: 15px;
  height: 80px;
  padding: 0px 15px 10px;
  font-family: "Barlow Condensed", sans-serif;
  font-weight: 100;
}

.loading-indicator {
  margin-left: 15px;
}

@media screen and (max-width: 1600px) {
  #search {
    width: 100%;
  }
}
</style>
