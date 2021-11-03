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
    <div v-if="pages.length">
      <h3>Faksimiler</h3>
      <div class="facsimiles">
        <a
          v-for="fn in pages"
          :key="fn"
          :href="`http://runeberg.org/img/${fn}.3.png`"
          class="facsimiles-item"
        >
          <img :src="`http://runeberg.org/img/${fn}.8.png`" />
        </a>
      </div>
    </div>
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
  computed: {
    pages() {
      return (
        window[`scanned_${this.edition}`][this.article.title] || []
      ).map((fn) => String(fn.match(/nf..\/\d+/)));
    },
  },
  async created() {
    this.article = await getArticle(this.edition, this.id);
  },
};
</script>

<style scoped>
h1 {
  margin-top: 0;
}

.facsimiles {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: -1rem;
  margin-bottom: -1rem;
}
.facsimiles-item {
  display: block;
  flex: 1;
  min-width: 10rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
.facsimiles-item img {
  width: 100%;
}
</style>
