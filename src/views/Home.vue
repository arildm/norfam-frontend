<template>
  <div>
    <MainTitle>Nordisk<br />Familjebok</MainTitle>
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
        :selected="mode"
        @change="modeChanged"
      />
      <ButtonLink id="close-tab" label="Slå ihop flikar" />
    </Controls>
    <div class="publications">
      <Pane class="publication">
        <div class="left-pane">
          <PaneContent>
            <Tabs
              :options="['Utgåva 1', 'Utgåva 2', 'Analys']"
              :selected="tab"
              @change="tab = $event"
            />
            <div class="pub-title">Utgåva 1</div>
          </PaneContent>

          <PaneContent>
            <div>
              {{ Number(results[edition].length).toLocaleString("sv") }} träffar
            </div>
            <Teaser
              v-for="hit in results[edition]"
              :key="hit.id"
              v-bind="hit"
              :edition="edition"
            />
          </PaneContent>
        </div>
        <div class="right-pane">
          <div class="right-pane-content">
            <div v-if="neighbors.length">
              <h3>Liknande ord</h3>
              <SimilarTerms
                v-for="{ term, neighbors } in neighbors"
                :key="term"
                :term="term"
                :neighbors="neighbors"
              />
            </div>
          </div>
        </div>
      </Pane>

      <Pane class="publication publication2">
        <div class="left-pane">
          <PaneContent>
            <div class="pub-title">Utgåva 2</div>
          </PaneContent>

          <PaneContent>
            <div>
              {{ Number(results[2].length).toLocaleString("sv") }} träffar
            </div>
            <Teaser
              v-for="hit in results[2]"
              :key="hit.id"
              v-bind="hit"
              :edition="2"
            />
          </PaneContent>
        </div>

        <div class="right-pane">
          <div class="right-pane-content">Data och grafer</div>
        </div>
      </Pane>
    </div>
  </div>
</template>

<script>
import MainTitle from "@lib/GUITemplate/vue/MainTitle.vue";
import Controls from "@lib/GUITemplate/vue/Controls.vue";
import ControlsSection from "@lib/GUITemplate/vue/ControlsSection.vue";
import ButtonLink from "@lib/GUITemplate/vue/ButtonLink.vue";
import Row from "@lib/GUITemplate/vue/Row.vue";
import SwitchButton from "@lib/GUITemplate/vue/SwitchButton.vue";
import SearchForm from "@/components/SearchForm.vue";
import Tabs from "@lib/GUITemplate/vue/Tabs.vue";
import Pane from "@lib/GUITemplate/vue/Pane.vue";
import PaneContent from "@lib/GUITemplate/vue/PaneContent.vue";
import Teaser from "@/components/Teaser.vue";
import SimilarTerms from "@/components/SimilarTerms.vue";
import { mapMutations, mapState } from "vuex";

const MODE = { HEADING: "Uppslagsord", FULL: "Fulltextsökning" };

export default {
  name: "home",
  components: {
    MainTitle,
    Controls,
    ControlsSection,
    ButtonLink,
    Row,
    SwitchButton,
    SearchForm,
    Tabs,
    Pane,
    PaneContent,
    Teaser,
    SimilarTerms,
  },
  data: () => ({
    tab: "Utgåva 1",
  }),
  computed: {
    MODE: () => MODE,
    ...mapState(["query", "fulltext", "results", "neighbors"]),
    mode() {
      return this.fulltext ? MODE.FULL : MODE.HEADING;
    },
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
  overflow: hidden;
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

h3:first-child {
  margin-top: 0;
}

@media screen and (max-width: 700px) {
  .right-pane {
    display: none;
  }
}
</style>
