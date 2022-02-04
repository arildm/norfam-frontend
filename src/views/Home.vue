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

    <SearchForm />

    <Controls>
      <SwitchButton
        :options="[MODE.HEADING, MODE.FULL]"
        :selected="mode"
        @change="modeChanged"
      />
      <!-- <ButtonLink id="close-tab" label="Slå ihop flikar" /> -->
    </Controls>
    <div class="publications">
      <Pane class="publication">
        <div class="left-pane">
          <PaneContent class="edition-tabs">
            <Tabs
              :options="['Utgåva 1', 'Utgåva 2' /*, 'Analys'*/]"
              :selected="tab"
              @change="tab = $event"
            />
          </PaneContent>

          <PaneContent title="Utgåva 1">
            <div>
              {{ hitCountMessage(counts[edition]) }}
            </div>
            <Teaser
              v-for="hit in results[edition]"
              :key="hit.id"
              v-bind="hit"
              :edition="edition"
            />
            <div v-observe-visibility="onScrollToBottom(edition)"></div>
          </PaneContent>
        </div>

        <div class="right-pane">
          <div class="right-pane-content">
            <div v-if="neighbors[edition].length">
              <h3>Relaterade ord</h3>
              <SimilarTerms
                v-for="{ term, neighbors } in neighbors[edition]"
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
          <PaneContent title="Utgåva 2">
            <div>
              {{ hitCountMessage(counts[2]) }}
            </div>
            <Teaser
              v-for="hit in results[2]"
              :key="hit.id"
              v-bind="hit"
              :edition="2"
            />
            <div v-observe-visibility="onScrollToBottom(2)"></div>
          </PaneContent>
        </div>

        <div class="right-pane">
          <div class="right-pane-content">
            <div v-if="neighbors[2].length">
              <h3>Relaterade ord</h3>
              <SimilarTerms
                v-for="{ term, neighbors } in neighbors[2]"
                :key="term"
                :term="term"
                :neighbors="neighbors"
              />
            </div>
          </div>
        </div>
      </Pane>
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import Teaser from "@/components/Teaser.vue";
import SimilarTerms from "@/components/SimilarTerms.vue";
import { mapMutations, mapState } from "vuex";

const MODE = { HEADING: "Uppslagsord", FULL: "Fulltextsökning" };

export default {
  name: "home",
  components: {
    SearchForm,
    Teaser,
    SimilarTerms,
  },
  data: () => ({
    tab: "Utgåva 1",
  }),
  computed: {
    MODE: () => MODE,
    ...mapState(["query", "fulltext", "results", "counts", "neighbors"]),
    mode() {
      return this.fulltext ? MODE.FULL : MODE.HEADING;
    },
    /** Returns 1 or 2 */
    edition() {
      return [undefined, "Utgåva 1", "Utgåva 2"].indexOf(this.tab);
    },
  },
  methods: {
    ...mapMutations(["showModal", "setFulltext", "incrementPage"]),
    showAbout() {
      this.showModal("about");
    },
    modeChanged(mode) {
      this.setFulltext(mode === MODE.FULL);
    },
    hitCountMessage(count) {
      return count == 1
        ? "1 träff"
        : `${Number(count).toLocaleString("sv")} träffar`;
    },
    onScrollToBottom(edition) {
      return (isVisible) => isVisible && this.nextPage(edition);
    },
    nextPage(edition) {
      if (this.results[edition].length < this.counts[edition]) {
        this.incrementPage(edition);
      }
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

.publication .edition-tabs {
  display: none;
  margin-left: -15px;
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

  .publication .edition-tabs {
    display: flex;
  }

  #close-tab {
    display: none;
  }
}

.left-pane {
  flex: 1;
  padding-bottom: 1rem;
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
  padding-bottom: 1rem;
}

.right-pane-content {
  padding: 20px;
}

.right-pane h3 {
  text-align: center;
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

<style>
@media screen and (max-width: 1600px) {
  .publication .pane-title {
    display: none;
  }
}
</style>
