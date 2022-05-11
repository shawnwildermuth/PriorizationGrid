i
<script lang="ts">
import { computed, defineComponent } from "vue";
import Item from "../models/Task";
import VotingControl from "../components/votingControl.vue";
import { getStore } from "../store";

export default defineComponent({
  components: {
    VotingControl
  },
  setup() {
    const theStore = getStore();

    return {
      theStore
    };
  },
});
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <div>
      <button><i class="fas fa-list"></i> Prioritize</button>
      <button @click="theStore.clear"><i class="fas fa-eraser"></i> Clear</button>
    </div>
    <table>
      <tr v-for="i in theStore.state.tasks" :key="i.id">
        <VotingControl :item="i"></VotingControl> 

        <td :colspan="theStore.state.tasks.length - theStore.state.tasks.indexOf(i)">
          <span class="text-xl font-semibold"
            >{{ theStore.state.tasks.indexOf(i) }}.
          </span>
          <input
            v-model="i.title"
            class="border m-1 text-xl p-1 focus:bg-amber-100"
          />
          <button class="icon" @click="theStore.remove(i)">
            <i class="fas fa-close"></i>
          </button>
        </td>
      </tr>
    </table>
    <div>
      <button @click="theStore.add()"><i class="fas fa-plus"></i> Add New Item</button>
    </div>
    <pre>{{ JSON.stringify(theStore.state, null, "  ") }}</pre>
  </div>
</template>
