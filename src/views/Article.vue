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
          <Row v-for="range in pages.ranges" :key="range.link">
            <p class="citeas">{{ range.citeAs }}</p>
            <a :href="range.link" target="_blank">
              <ButtonLink icon="link" label="Läs på runeberg.org" />
            </a>
          </Row>
          <ButtonLink
            icon="download"
            label="Ladda ner ren text"
            @click="downloadText"
          />
        </PaneContent>
        <PaneContent v-if="pages.filenames.length">
          <h3>Faksimiler</h3>
          <div class="facsimiles">
            <a
              v-for="fn in pages.filenames"
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
    /** Get page numbers, scan filenames and citation info, and Runeberg links. */
    pages() {
      const data = window[`scanned_${this.edition}`][this.article.title];
      // data : { [vol]: { img: int[][], p: int[][] }
      const filenames = [];
      const ranges = [];
      for (const vol in data) {
        const volFilenames = data[vol].img.map(
          (scanInt) => `${vol}/${String(scanInt).padStart(4, "0")}`
        );
        filenames.push(...volFilenames);
        const pageRanges = data[vol].p
          .map((range) => range.join("–"))
          .join(", ");
        ranges.push({
          citeAs: `Nordisk Familjebok, utgåva ${this.edition}, volym ${this.volumes[vol]} ss. ${pageRanges}`,
          link: `http://runeberg.org/${volFilenames[0]}.html`,
        });
      }
      return { filenames, ranges };
    },
    editionName() {
      return [null, "Utgåva 1", "Utgåva 2"][this.edition];
    },
    volumes() {
      return {
        nfaa: "1. A–Barograf (1876)",
        nfab: "2. Barometer–Capitularis (1878)",
        nfac: "3. Capitulum–Duplikant (1880)",
        nfad: "4. Duplikator–Folkvandringen (1881)",
        nfae: "5. Folkvisor–Grimnesmål (1882)",
        nfaf: "6. Grimsby–Hufvudskatt (1883)",
        nfag: "7. Hufvudskål–Kaffraria (1884)",
        nfah: "8. Kaffrer–Kristdala (1884)",
        nfai: "9. Kristendomen–Lloyd (1885)",
        nfaj: "10. Lloyd–Militärkoloni (1886)",
        nfak: "11. Militärkonventioner–Nådaval (1887)",
        nfal: "12. Nådemedlem–Pontifikat (1888)",
        nfam: "13. Pontin–Ruete (1889)",
        nfan: "14. Ruff–Sockenstämma (1890)",
        nfao: "15. Socker–Tengström (1891)",
        nfap: "16. Teniers–Üxkull (1892)",
        nfaq: "17. V–Väring (1893)",
        nfar: "18. Värja–Öynhausen (1894)",
        nfas: "19. supplement: A–Böttiger (1896)",
        nfat: "20. supplement: C–Öxnevalla (1899)",
        nfba: "1. A–Armati (1904)",
        nfbb: "2. Armatoler–Bergsund (1904)",
        nfbc: "3. Bergsvalan–Branstad (1905)",
        nfbd: "4. Brant–Cesti (1905)",
        nfbe: "5. Cestius–Degas (1906)",
        nfbf: "6. Degeberg–Egyptolog (1907)",
        nfbg: "7. Egyptologi–Feinschmecker (1907)",
        nfbh: "8. Feiss–Fruktmögel (1908)",
        nfbi: "9. Fruktodling–Gossensass (1908)",
        nfbj: "10. Gossler–Harris (1909)",
        nfbk: "11. Harrisburg–Hypereides (1909)",
        nfbl: "12. Hyperemi–Johan (1910)",
        nfbm: "13. Johan–Kikare (1910)",
        nfbn: "14. Kikarsikte–Kroman (1911)",
        nfbo: "15. Kromat–Ledvätska (1911)",
        nfbp: "16. Lee–Luvua (1912)",
        nfbq: "17. Lux–Mekanik (1912)",
        nfbr: "18. Mekaniker–Mykale (1913)",
        nfbs: "19. Mykenai–Norrpada (1913)",
        nfbt: "20. Norrsken–Paprocki (1914)",
        nfca: "21. Papua–Posselt (1915)",
        nfcb: "22. Possession–Retzia (1915)",
        nfcc: "23. Retzius–Ryssland (1916)",
        nfcd: "24. Ryssläder–Sekretär (1916)",
        nfce: "25. Sekt–Slöjskifling (1917)",
        nfcf: "26. Slöke–Stockholm (1917)",
        nfcg: "27. Stockholm-Nynäs järnväg–Syrsor (1918)",
        nfch: "28. Syrten–Tidsbestämning (1919)",
        nfci: "29. Tidsekvation–Trompe (1919)",
        nfcj: "30. Tromsdalstind–Urakami (1920)",
        nfck: "31. Ural–Vertex (1921)",
        nfcl: "32. Werth–Väderkvarn (1921)",
        nfcm: "33. Väderlek–Äänekoski (1922)",
        nfcn: "34. Ö–Öyslebö; supplement: Aa–Cambon (1922)",
        nfco: "35. supplement: Cambrai–Glis (1923)",
        nfcp: "36. supplement: Globe–Kövess (1924)",
        nfcq: "37. supplement: L–Riksdag (1925)",
        nfcr: "38. supplement: Riksdagens bibliotek–Öyen; tillägg (1926)",
      };
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

.citeas {
  margin-bottom: 0;
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
