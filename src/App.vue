<template>
  <div id="app" :class="{ waiting }">
    <Container id="main">
      <Brand />
      <router-view />
    </Container>
    <Modal :show="modalVisible === 'about'" @hide="hideModal">
      <div class="article-title">Om utgåvorna</div>
      <div class="article">
        <blockquote>
          Nordisk familjebok påbörjades med att förläggaren C. E. Gernandt i
          Halmstad som 1874 anställde en redaktör (språkforskaren Nils Linder)
          för att ge ut ett uppslagsverk i sex band. Det första häftet skickades
          ut till subskribenterna i maj 1875 och hela första bandet var klart
          året därpå. När tio band var färdiga tog pengarna slut och ändå hade
          man bara nått bokstaven K. Läs slutordet till första utgåvan (1894)
          och vad uggleupplagan skriver om sig själv.
        </blockquote>

        <p>
          Så skriver Lars Aronsson på
          <a href="http://runeberg.org/nf">Projekt Runeberg</a>. Vidare:
        </p>

        <blockquote>
          Andra utgåvan, som med sina 38 band är Sveriges mest omfattande
          uppslagsverk eller encyklopedi genom tiderna, brukar också kallas
          "uggleupplagan" eftersom den har en uggla på titelsidan. Ugglan finns
          ibland även på bokryggarna, men det finns också billigare inbindningar
          med samma innehåll. Den första utgåvan från 1800-talet har i stället
          Idun som sin symbol, hon som i nordisk mytologi dagligen bär en korg
          med vishetens äpplen till gudarna i Valhall.
        </blockquote>
      </div>
    </Modal>
    <Modal :show="modalVisible === 'help'" @hide="hideModal">
      <div class="article-title">Instruktioner</div>
      <div class="article">
        <p>
          Ange ett eller flera <strong>sökord</strong> i sökfältet. Om flera ord
          anges sker en sökning på varje ord för sig. I det förvalda sökläget
          sker sökning endast inom <em>uppslagsordet</em>. Välj
          <em>Fulltextsökning</em> för att söka på ord som förekommer inom
          uppslagstexterna.
        </p>
        <p>
          <strong>Sökresultaten</strong> visas sida vid sida om
          webbläsarfönstret är tillräckligt stort. I annat fall visas en upplaga
          i taget, med en knapp för att växla mellan dem. Notera att ett flertal
          uppslagsord har flera ingångar, dels för att särskilja olika
          betydelser men också för att korrigeringar i supplementband räknas upp
          separat.
        </p>
        <p>
          Utöver sökresultaten visas för varje sökord en lista över
          <strong>relaterade ord</strong>. Det är en sammanställning som är
          frikopplad från konceptet uppslagsord, och istället utgår från hela
          respektive upplaga som en textkorpus. Siffrorna anger likheten i en
          Word2Vec-modell, vilket innebär att ord betraktas som lika om de
          förekommer i liknande lexikala sammanhang.
        </p>
        <p>
          Genom att klicka på ett sökresultat kommer du till den
          uppslagsingången i sin helhet. Texten ackompanjeras av
          <strong>sidhänvisningar</strong>, <strong>faksimiler</strong> från det
          tryckta verket och ren text för nedladdning. Sidhänvisningarna och
          faksimilsammanställningarna skiljer tyvärr inte mellan de olika
          ingångarna för ett givet uppslagsord.
        </p>
      </div>
    </Modal>
    <Footer />
  </div>
</template>

<script>
import "@gui/src/assets/css/base.css";
import { mapGetters, mapMutations, mapState } from "vuex";
import "typeface-antic-didone";
import * as norfam from "@/services/norfam.service";

// Expose internal API to browser console in development mode.
if (process.env.NODE_ENV === "development") {
  window.norfam = norfam;
}

export default {
  name: "App",
  components: {},
  computed: {
    ...mapState(["modalVisible", "queue"]),
    ...mapGetters(["waiting"]),
  },
  methods: {
    ...mapMutations(["hideModal"]),
    keyup($event) {
      if ($event.key == "Escape") this.hideModal();
    },
  },
  mounted() {
    document.addEventListener("keyup", this.keyup);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.keyup);
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
}

.waiting {
  cursor: wait;
}

#main {
  flex: 1;
}

#main-title {
  font-family: "Antic Didone", serif;
}

h1,
h2,
h3,
strong,
b,
th {
  font-weight: 300;
}

blockquote {
  margin: 1em 0;
  font-style: italic;
}

.article > :first-child {
  margin-top: 0;
}

.article > :last-child {
  margin-bottom: 0;
}

.help-label {
  font-size: smaller;
}
</style>
