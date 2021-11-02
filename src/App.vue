<template>
  <div id="app">
    <Container>
      <Brand />
      <router-view />
    </Container>
    <Modal v-show="modalVisible === 'about'">
      <div class="article-title">Om utgåvorna</div>
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
import { mapState } from "vuex";
import "typeface-barlow-condensed";
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
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&display=swap");

#main-title {
  font-family: "Antic Didone", serif;
}

h1,
h2,
h3,
strong,
b {
  font-weight: 300;
}
</style>
