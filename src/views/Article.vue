<template>
  <div v-if="article">
    <Row>
      <router-link to="/">
        <ButtonLink icon="back" label="Sök" />
      </router-link>
    </Row>
    <Pane class="article-pane">
      <PaneContent class="article-pane-text">
        <h1>{{ article.title }}</h1>
        <article v-html="article.body" />
      </PaneContent>
      <div class="article-pane-side">
        <ButtonLink
          icon="download"
          label="Ladda ner text"
          @click="downloadText"
          type="text/plain"
        />
        <ButtonLink
          v-if="facsimiles.length"
          icon="download"
          label="Ladda ner faksimiler"
          @click="downloadFacsimiles"
          type="text/plain"
        />
        <PaneContent v-if="facsimiles.length">
          <h3>Faksimiler</h3>
          <div class="facsimiles">
            <a
              v-for="facsimile in facsimiles"
              :key="facsimile.name"
              :href="facsimile.large"
              class="facsimiles-item"
            >
              <img :src="facsimile.thumb" />
            </a>
          </div>
        </PaneContent>
      </div>
    </Pane>
  </div>
</template>

<script>
import { getArticle } from "@/services/norfam.service";
import { download } from "@/assets/util";
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
    facsimiles() {
      return this.pages.map((name) => ({
        name,
        thumb: `http://runeberg.org/img/${name}.8.png`,
        large: `http://runeberg.org/img/${name}.3.png`,
        full: `http://runeberg.org/img/${name}.1.tif`,
      }));
    },
  },
  methods: {
    downloadText() {
      const plainText = this.article.body.replaceAll(/<\/?\w+>/g, "");
      download(`${this.article.title}.txt`, plainText);
    },
  },
  async created() {
    this.article = await getArticle(this.edition, this.id);
  },
};
</script>

<style scoped>
.article-pane {
  display: flex;
}

@media screen and (max-width: 800px) {
  .article-pane {
    flex-wrap: wrap;
  }
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
