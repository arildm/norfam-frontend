<template>
  <input
    type="text"
    id="search"
    v-model="q"
    placeholder="Sök..."
    @keyup="search"
  />
</template>

<script>
import { search } from "@/services/norfam.service";
import { mapMutations, mapState } from "vuex";

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
      const [res1, res2] = await search(this.q, this.fulltext);
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
