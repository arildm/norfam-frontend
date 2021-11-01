<template>
  <div id="app">
    <Container>
      <Brand />
      <MainTitle>Nordisk<br />Familjebok</MainTitle>
      <router-view />
    </Container>
    <Footer />
  </div>
</template>

<script>
import "typeface-barlow-condensed";
import "@lib/GUITemplate/css/style.css";
import Container from "@lib/GUITemplate/vue/Container.vue";
import Brand from "@lib/GUITemplate/vue/Brand.vue";
import MainTitle from "@lib/GUITemplate/vue/MainTitle.vue";
import Footer from "@lib/GUITemplate/vue/Footer.vue";

export default {
  name: "App",
  components: {
    Container,
    Brand,
    MainTitle,
    Footer,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&display=swap");

#main-title {
  font-family: "Antic Didone", serif;
}
</style>
