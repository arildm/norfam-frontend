<template>
  <router-link :to="`/article/${edition}/${id}`" custom v-slot="{ navigate }">
    <div class="teaser" @click="navigate">
      <h2>{{ title }}</h2>
      <article v-html="summary" />
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Teaser",
  props: ["id", "title", "summary", "edition"],
};
</script>

<style>
.teaser {
  cursor: pointer;
}

.teaser {
  margin-block: 30px;
}

.teaser h2 {
  margin: 0 0 0.2em;
  font-weight: 300;
}
</style>
