<template>
  <div v-if="article">
    <Row>
      <router-link to="/">
        <ButtonLink icon="back" label="Sök" />
      </router-link>
    </Row>
    <Pane>
      <PaneContent>
        <h1>{{ article.title }}</h1>
        <article v-html="article.body" />
      </PaneContent>
    </Pane>
  </div>
</template>

<script>
import { getArticle } from "@/services/norfam.service";
import Row from "@lib/GUITemplate/vue/Row.vue";
import ButtonLink from "@lib/GUITemplate/vue/ButtonLink.vue";
import Pane from "@lib/GUITemplate/vue/Pane.vue";
import PaneContent from "@lib/GUITemplate/vue/PaneContent.vue";

export default {
  name: "Article",
  props: ["edition", "id"],
  components: {
    Row,
    ButtonLink,
    Pane,
    PaneContent,
  },
  data: () => ({
    article: null,
  }),
  async created() {
    this.article = await getArticle(this.edition, this.id);
  },
};
</script>

<style scoped>
h1 {
  margin-top: 0;
}
</style>
