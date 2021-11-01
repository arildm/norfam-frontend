<template>
  <div id="app">
    <ButtonLink />
    <router-view />
  </div>
</template>

<script>
import ButtonLink from "@lib/GUITemplate/ButtonLink.vue";
import "typeface-barlow-condensed";
import "@lib/GUITemplate/css/style.css";

export default {
  name: "App",
  components: { ButtonLink },
};
</script>

<style lang="scss">
#app {
}
</style>
