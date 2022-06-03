i
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import VotingControl from "../components/votingControl.vue";
import { getStore } from "../store";
import handleExcelClipboard from "../utils/handleExcelClipboard";

export default defineComponent({
  components: {
    VotingControl,
  },
  setup() {
    const theStore = getStore();
    const showDebug = ref(false);
    function handlePaste(evt: ClipboardEvent) {
      const clipboardData = evt.clipboardData;
      if (clipboardData) {
        const rows = handleExcelClipboard(clipboardData);
        if (rows) {
          theStore.replace(rows);
        }
      }
    }

    const toggleDebug = () => (showDebug.value = !showDebug.value);

    return {
      theStore,
      handlePaste,
      toggleDebug,
      showDebug,
    };
  },
});
</script>

<template>
  <div @paste.prevent="handlePaste" class="flex justify-between">
    <div>
      <h1 class="text-xl font-bold">Home Page</h1>
      <div>
        <button><i class="fas fa-list"></i> Prioritize</button>
        <button @click="theStore.createDefault">
          <i class="fas fa-eraser"></i> Clear
        </button>
      </div>
      <table>
        <tr v-for="i in theStore.state.tasks" :key="i.id">
          <VotingControl :item="i"></VotingControl>
          <td
            :colspan="
              theStore.state.tasks.length - theStore.state.tasks.indexOf(i)
            "
          >
            <span class="text-xl font-semibold"
              >{{ theStore.state.tasks.indexOf(i) + 1 }}.
            </span>
            <input
              v-model="i.title"
              class="border m-1 text-xl p-1 focus:bg-amber-100 ring-yellow-400"
              :class="{ ring: theStore.isHighlighted(i.id) }"
            />
            <button class="icon" @click="theStore.move(i, -1)" tabindex="-2" :disabled="theStore.state.tasks.indexOf(i) === 0">
              <i class="fas fa-chevron-up"></i>
            </button>
            <button class="icon" @click="theStore.move(i, 1)" tabindex="-2" :disabled="theStore.state.tasks.indexOf(i) >= theStore.state.tasks.length - 1">
              <i class="fas fa-chevron-down"></i>
            </button>
            <button class="icon" @click="theStore.remove(i)" tabindex="-2" >
              <i class="fas fa-close"></i>
            </button>
          </td>
        </tr>
      </table>
      <div>
        <button @click="theStore.add()">
          <i class="fas fa-plus"></i> Add New Item
        </button>
      </div>
      <div>
        <button @click="toggleDebug" class="text-sm">Toggle Raw Data</button>
        <pre v-if="showDebug">{{
          JSON.stringify(theStore.state, null, "  ")
        }}</pre>
      </div>
    </div>
    <div>
      <div class="text-xl font-bold">Prioritized Tasks</div>
      <div>coming soon...</div>
    </div>
  </div>
</template>
