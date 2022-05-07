<script lang="ts">
type Pair = {
  first: Item;
  second: Item;
};

import { defineComponent, onMounted, watch, watchEffect } from "vue";
import Item from "../models/Item";
export default defineComponent({
  props: {
    items: { type: Object as () => Array<Item>, required: true },
    item: { type: Object as () => Item, required: true },
  },
  setup(props) {
    const voting = new Array<Pair>();

    watchEffect(() => {
      voting.length = 0;
      for (let item of props.items) {
        const rowIndex = props.items.indexOf(props.item);
        const index = props.items.indexOf(item);
        if (index >= rowIndex) break;
        const pair: Pair = { first: item, second: props.item };

        voting.push(pair);
      }
    });

    return {
      voting,
    };
  },
});
</script>

<template>
  <td v-for="pair in voting">
    <div class="flex flex-col border border-gray-400 p-0.5">
      <div class="flex justify-between align-text-bottom">
        <label :for="'item' + pair.first.id + '-' + pair.second.id">{{
          items.indexOf(pair.first) + 1
        }}</label>
        <input
          :id="'item' + pair.first.id + '-' + pair.second.id"
          type="radio"
          class="icon"
          :name="'choice' + pair.first.id + '-' + pair.second.id"
        />
      </div>
      <div class="flex justify-between align-text-bottom">
        <label :for="'item' + pair.second.id + '-' + pair.second.id">{{
          items.indexOf(pair.second) + 1
        }}</label>
        <input
          type="radio"
          class="icon"
          :id="'item' + pair.second.id + '-' + pair.second.id"
          :name="'choice' + pair.first.id + '-' + pair.second.id"
        />
      </div>
    </div>
    <!-- <button class="icon"><i class="fas fa-chevron-up"></i></button>
          <button class="icon"><i class="fas fa-chevron-down"></i></button> -->
  </td>
</template>
