<template>
  <div>
    <Controls>
      <ControlsSection>
        <ButtonLink icon="link" label="Om utgåvorna" @click="showAbout" />
        <ButtonLink
          icon="link"
          label="Instruktioner"
          @click="showModal('help')"
        />
      </ControlsSection>
    </Controls>
    <Row>
      <SearchForm />
    </Row>
    <Controls>
      <SwitchButton
        :options="[MODE.HEADING, MODE.FULL]"
        :selected="MODE.HEADING"
        @change="modeChanged"
      />
      <ButtonLink id="close-tab" label="Slå ihop flikar" />
    </Controls>
    <div class="publications">
      <div class="publication">
        <div class="left-pane">
          <div class="left-pane-content">
            <Tabs
              :options="['Utgåva 1', 'Utgåva 2', 'Analys']"
              :selected="tab"
              @change="tab = $event"
            />
            <div class="pub-title">Utgåva 1</div>
          </div>

          <div class="left-pane-content">
            <Teaser
              v-for="(hit, i) in results[edition]"
              :key="i"
              :title="hit.title"
              :summary="hit.summary"
            />
          </div>
        </div>
        <div class="right-pane">
          <div class="right-pane-content">Data och grafer</div>
        </div>
      </div>

      <div class="publication publication2">
        <div class="left-pane">
          <div class="left-pane-content">
            <div class="pub-title">Utgåva 2</div>
          </div>

          <div class="left-pane-content">
            <Teaser
              v-for="(hit, i) in results[2]"
              :key="i"
              :title="hit.title"
              :summary="hit.summary"
            />
          </div>
        </div>

        <div class="right-pane">
          <div class="right-pane-content">Data och grafer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Controls from "@lib/GUITemplate/vue/Controls.vue";
import ControlsSection from "@lib/GUITemplate/vue/ControlsSection.vue";
import ButtonLink from "@lib/GUITemplate/vue/ButtonLink.vue";
import Row from "@lib/GUITemplate/vue/Row.vue";
import SwitchButton from "@lib/GUITemplate/vue/SwitchButton.vue";
import SearchForm from "@/components/SearchForm.vue";
import Tabs from "@lib/GUITemplate/vue/Tabs.vue";
import Teaser from "@/components/Teaser.vue";
import { mapMutations, mapState } from "vuex";

const MODE = { HEADING: "Uppslagsord", FULL: "Fulltextsökning" };

export default {
  name: "home",
  components: {
    Controls,
    ControlsSection,
    ButtonLink,
    Row,
    SwitchButton,
    SearchForm,
    Tabs,
    Teaser,
  },
  data: () => ({
    tab: "Utgåva 1",
  }),
  computed: {
    MODE: () => MODE,
    ...mapState(["results"]),
    /** Returns 1 or 2 */
    edition() {
      return [undefined, "Utgåva 1", "Utgåva 2"].indexOf(this.tab);
    },
  },
  methods: {
    ...mapMutations(["showModal", "setFulltext"]),
    showAbout() {
      this.showModal("about");
    },
    modeChanged(mode) {
      this.setFulltext(mode === MODE.FULL);
    },
  },
};
</script>

<style scoped>
.publications {
  display: flex;
  justify-content: space-between;
}

.publication {
  display: flex;
  width: 48.5%;
  transition: all 0.2s ease-in-out;
  border-style: none;
  border-color: black;
  border-width: 0.5px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 40px;
  background-color: rgb(245, 245, 245);
}

.publication.publication2 {
  margin-right: 0;
}

.pub-title {
  font-size: 24px;
  color: #0099cc;
}

.publication .tab-container {
  display: none;
}

#close-tab {
  min-width: 120px;
  font-size: 22px;
}

@media screen and (max-width: 1600px) {
  .publication {
    margin-right: 0px;
    width: 100%;
  }

  .publication2 {
    display: none;
  }

  .pub-title {
    display: none;
  }

  .publication .tab-container {
    display: flex;
    margin-left: -15px;
  }

  #close-tab {
    display: none;
  }
}

.left-pane {
  flex: 1;
}

.left-pane-content {
  padding: 15px 30px;
}

.right-pane {
  width: 30%;
  color: black;
  border-left-style: dotted;
  border-width: 1px;
  border-color: gray;
}

.right-pane-content {
  padding: 20px;
}

@media screen and (max-width: 700px) {
  .right-pane {
    display: none;
  }
}
</style>
