<template>
  <div>
    <MainTitle>Nordisk<br />Familjebok</MainTitle>
    <Controls>
      <ControlsSection>
        <ButtonLink
          icon="link"
          label="Instruktioner"
          @click="showModal('instructions')"
        />
        <ButtonLink
          icon="link"
          label="Om utgåvorna"
          @click="showModal('editions')"
        />
        <ButtonLink
          icon="link"
          label="Om verktyget"
          @click="showModal('tool')"
        />
      </ControlsSection>
    </Controls>

    <SearchForm />
    <Controls>
      <SwitchButton
        :options="[MODE.FULL, MODE.HEADING]"
        :selected="mode"
        @change="modeChanged"
      />
      <!-- <ButtonLink id="close-tab" label="Slå ihop flikar" /> -->
    </Controls>

    <div class="publications">
      <Pane class="publication publication-vary">
        <div class="left-pane">
          <PaneContent class="edition-tabs">
            <Tabs
              :options="EDITIONS.slice(1)"
              :selected="tab"
              @change="tab = $event"
            />
          </PaneContent>

          <PaneContent :title="EDITIONS[1]">
            <div v-if="edition == 2" class="help-label wip-warning">
              Digitiseringen av andra utgåvan är ännu inte korrekturläst, och
              innehåller därför många fel.
            </div>
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
              <p class="help-label">
                Siffrorna är ett mått på likheten mellan respektive ord och
                sökordet, utifrån avståndet i en Word2Vec-modell som tränats på
                hela utgåvan. Ett ord som i texten ofta omges av vissa ord
                räknas som "likt" ett annat ord som omges av samma ord.
              </p>
            </div>
          </div>
        </div>
      </Pane>

      <Pane class="publication publication2">
        <div class="left-pane">
          <PaneContent :title="EDITIONS[2]">
            <div class="help-label wip-warning">
              Digitiseringen av andra utgåvan är ännu inte korrekturläst, och
              innehåller därför många fel.
            </div>
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
              <p class="help-label">
                Siffrorna är ett mått på likheten mellan respektive ord och
                sökordet, utifrån avståndet i en Word2Vec-modell som tränats på
                hela utgåvan. Ett ord som i texten ofta omges av vissa ord
                räknas som "likt" ett annat ord som omges av samma ord.
              </p>
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
import { EDITIONS } from "@/assets/util";

const MODE = { FULL: "Fulltextsökning", HEADING: "Uppslagsord" };

export default {
  name: "home",
  components: {
    SearchForm,
    Teaser,
    SimilarTerms,
  },
  data: () => ({
    tab: EDITIONS[1],
  }),
  computed: {
    MODE: () => MODE,
    EDITIONS: () => EDITIONS,
    ...mapState(["query", "fulltext", "results", "counts", "neighbors"]),
    mode() {
      return this.fulltext ? MODE.FULL : MODE.HEADING;
    },
    /** Returns 1 or 2 */
    edition() {
      return EDITIONS.indexOf(this.tab);
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

.publication-vary .wip-warning {
  display: none;
}

.wip-warning {
  margin-bottom: 1rem;
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

  .publication-vary .wip-warning {
    display: block;
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
