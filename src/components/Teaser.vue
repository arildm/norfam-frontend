<template>
  <div class="teaser">
    <h1>{{ title }}</h1>
    <p v-html="summary" />
  </div>
</template>

<script>
export default {
  name: "Teaser",
  props: ["title", "summary"],
};
</script>

<style>
.teaser:not(:last-child) {
  margin-bottom: 30px;
}

.teaser h1 {
  margin-top: 0;
  font-weight: 300;
}
</style>
