<template>
  <Container id="app">
    <Brand />
    <MainTitle>Nordisk<br />Familjebok</MainTitle>
    <router-view />
  </Container>
</template>

<script>
import "typeface-barlow-condensed";
import "@lib/GUITemplate/css/style.css";
import Container from "@lib/GUITemplate/vue/Container.vue";
import Brand from "@lib/GUITemplate/vue/Brand.vue";
import MainTitle from "@lib/GUITemplate/vue/MainTitle.vue";

export default {
  name: "App",
  components: {
    Container,
    Brand,
    MainTitle,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Antic+Didone&display=swap");

#main-title {
  font-family: "Antic Didone", serif;
}
</style>
