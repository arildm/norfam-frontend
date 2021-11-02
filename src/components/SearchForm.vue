<template>
  <input
    type="text"
    id="search"
    v-model="q"
    placeholder="Sök..."
    @input="search"
  />
</template>

<script>
import { debounce } from "@/assets/util";
import { search } from "@/services/norfam.service";
import { mapMutations, mapState } from "vuex";

const searchDebounced = debounce(search);

export default {
  name: "SearchForm",
  data: () => ({
    q: "",
  }),
  computed: {
    ...mapState(["fulltext"]),
  },
  methods: {
    ...mapMutations(["setResults"]),
    async search() {
      const q = this.q;
      const [res1, res2] = await searchDebounced(this.q, this.fulltext);
      // The request can take some time. Discard this result if the query has already changed.
      if (q !== this.q) return;
      res1.then((results) => this.setResults({ edition: 1, results }));
      res2.then((results) => this.setResults({ edition: 2, results }));
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
