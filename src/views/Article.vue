<template>
  <div v-if="article">
    <Row>
      <router-link to="/">
        <ButtonLink icon="back" label="Sök" />
      </router-link>
    </Row>
    <h1>{{ article.title }}</h1>
    <Pane class="article-pane">
      <PaneContent :title="editionName" class="article-pane-text">
        <article v-html="article.body" />
      </PaneContent>
      <div class="article-pane-side">
        <PaneContent>
          <a v-if="linkRuneberg" :href="linkRuneberg" target="_blank">
            <ButtonLink icon="link" label="Läs på runeberg.org" />
          </a>
          <ButtonLink
            icon="download"
            label="Ladda ner ren text"
            @click="downloadText"
          />
        </PaneContent>
        <PaneContent v-if="pages.length">
          <h3>Faksimiler</h3>
          <div class="facsimiles">
            <a
              v-for="fn in pages"
              :key="fn"
              :href="`http://runeberg.org/img/${fn}.3.png`"
              target="_blank"
              class="facsimiles-item"
            >
              <img :src="`http://runeberg.org/img/${fn}.8.png`" />
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

export default {
  name: "Article",
  props: ["edition", "id"],
  components: {},
  data: () => ({
    article: null,
  }),
  computed: {
    pages() {
      return (
        window[`scanned_${this.edition}`][this.article.title] || []
      ).map((fn) => String(fn.match(/nf..\/\d+/)));
    },
    linkRuneberg() {
      const firstPage = this.pages[0];
      return firstPage && `http://runeberg.org/${firstPage}.html`;
    },
    editionName() {
      return [null, "Utgåva 1", "Utgåva 2"][this.edition];
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
    display: block;
  }
}

.article-pane-text {
  flex: 1;
}

.article-pane-side {
  flex: 0;
}

.facsimiles {
  margin-bottom: -1rem;
}

.facsimiles-item {
  display: block;
  margin-bottom: 1rem;
}

.facsimiles-item img {
  max-width: 100%;
}
</style>
