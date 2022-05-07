i
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, ref } from "vue";
import Item from "../models/Item";
import VotingControl from "../components/votingControl.vue";

export default defineComponent({
  components: {
    VotingControl
  },
  setup() {
    const items = reactive(new Array<Item>());
    clear();

    function clear() {
      // Initally create 5
      items.length = 0;
      for (let x = 0; x < 5; ++x) items.push(new Item(x));
    }

    function remove(item: Item) {
      items.splice(items.indexOf(item), 1);
    }

    function add() {
      const lastItem = Math.max(...items.map((i) => i.id));
      items.push(new Item(lastItem + 1));
    }

    return {
      items,
      clear,
      remove,
      add,
    };
  },
});
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <div>
      <button><i class="fas fa-list"></i> Prioritize</button>
      <button @click="clear"><i class="fas fa-eraser"></i> Clear</button>
    </div>
    <table>
      <tr v-for="i in items" :key="i.id">
        <VotingControl :items="items" :item="i"></VotingControl> 

        <td :colspan="items.length - items.indexOf(i)">
          <span class="text-xl font-semibold"
            >{{ items.indexOf(i) + 1 }}.
          </span>
          <input
            v-model="i.title"
            class="border m-1 text-xl p-1 focus:bg-amber-100"
          />
          <button class="icon" @click="remove(i)">
            <i class="fas fa-close"></i>
          </button>
        </td>
      </tr>
    </table>
    <div>
      <button @click="add()"><i class="fas fa-plus"></i> Add New Item</button>
    </div>
    <!-- <pre>{{ JSON.stringify(items, null, "  ") }}</pre> -->
  </div>
</template>
