<template>
  <div v-if="term && neighbors">
    <table>
      <thead>
        <th colspan="2">{{ term }}</th>
      </thead>
      <tbody>
        <tr v-for="neighbor in neighbors" :key="neighbor.term_term">
          <td class="term">{{ neighbor.term_term }}</td>
          <td class="similarity">{{ formatNumber(neighbor.similarity) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SimilarTerms",
  props: ["term", "neighbors"],
  methods: {
    formatNumber(number) {
      return Number(number).toFixed(3);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
.similarity {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
</style>
