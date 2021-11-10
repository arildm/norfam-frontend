<template>
  <div v-if="term && neighbors">
    <table>
      <thead>
        <th colspan="2">{{ term }}</th>
      </thead>
      <tbody>
        <tr v-for="neighbor in neighbors" :key="neighbor.term_term">
          <td class="term">
            <span @click="search(neighbor.term_term)">
              {{ neighbor.term_term }}
            </span>
          </td>
          <td class="similarity">{{ formatNumber(neighbor.similarity) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from "@/router";
import { mapMutations } from "vuex";

export default {
  name: "SimilarTerms",
  props: ["term", "neighbors"],
  methods: {
    ...mapMutations(["setQuery"]),
    formatNumber(number) {
      return Number(number).toFixed(3);
    },
    search(term) {
      if (router.currentRoute.path !== "/") router.push("/");
      this.setQuery(term);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  margin-bottom: 1em;
}
.term span {
  cursor: pointer;
}
.similarity {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
</style>
