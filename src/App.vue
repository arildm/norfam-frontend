<template>
  <div id="app" :class="{ waiting }">
    <Container id="main">
      <Brand />
      <router-view />
    </Container>
    <Modal :show="modalVisible === 'instructions'" @hide="hideModal">
      <InfoInstructions />
    </Modal>
    <Modal :show="modalVisible === 'editions'" @hide="hideModal">
      <InfoEditions />
    </Modal>
    <Modal :show="modalVisible === 'tool'" @hide="hideModal">
      <InfoTool />
    </Modal>
    <Footer />
  </div>
</template>

<script>
import "@gui/src/assets/css/base.css";
import { mapGetters, mapMutations, mapState } from "vuex";
import "typeface-antic-didone";
import * as norfam from "@/services/norfam.service";
import InfoEditions from "./components/InfoEditions.vue";
import InfoInstructions from "./components/InfoInstructions.vue";
import InfoTool from "./components/InfoTool.vue";

// Expose internal API to browser console in development mode.
if (process.env.NODE_ENV === "development") {
  window.norfam = norfam;
}

export default {
  name: "App",
  components: { InfoInstructions, InfoTool, InfoEditions },
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
b,
th {
  font-weight: 300;
}

strong {
  font-weight: 500;
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
