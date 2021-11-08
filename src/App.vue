<template>
  <div id="app">
    <Container id="main">
      <Brand />
      <router-view />
    </Container>
    <Modal v-show="modalVisible === 'about'">
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
    <Modal v-show="modalVisible === 'help'">
      <div class="article-title">Instruktioner</div>
      <div class="article">
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
        cumque nihil impedit quo minus id quod maxime placeat facere possimus,
        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
        quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
        ut et voluptates repudiandae sint et molestiae non recusandae. Itaque
        earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
        voluptatibus maiores alias consequatur aut perferendis doloribus
        asperiores repellat.
      </div>
    </Modal>
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import "typeface-barlow-condensed";
import "typeface-antic-didone";
import "@lib/GUITemplate/css/base.css";
import Container from "@lib/GUITemplate/vue/Container.vue";
import Brand from "@lib/GUITemplate/vue/Brand.vue";
import Modal from "@lib/GUITemplate/vue/Modal.vue";
import Footer from "@lib/GUITemplate/vue/Footer.vue";

export default {
  name: "App",
  components: {
    Container,
    Brand,
    Modal,
    Footer,
  },
  computed: {
    ...mapState(["modalVisible"]),
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
</style>
