<template>
  <div v-if="article">
    <Row>
      <router-link to="/">
        <ButtonLink icon="back" label="Sök" />
      </router-link>
    </Row>
    <h1>{{ article.title }}</h1>
    <article v-html="article.body" />
  </div>
</template>

<script>
import { getArticle } from "@/services/norfam.service";
import Row from "../../lib/GUITemplate/vue/Row.vue";
import ButtonLink from "../../lib/GUITemplate/vue/ButtonLink.vue";

export default {
  name: "Article",
  props: ["edition", "id"],
  components: { Row, ButtonLink },
  data: () => ({
    article: null,
  }),
  async created() {
    this.article = await getArticle(this.edition, this.id);
  },
};
</script>

<style></style>
