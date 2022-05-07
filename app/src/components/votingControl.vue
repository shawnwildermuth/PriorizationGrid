<script lang="ts">
type Pair = {
  first: Item;
  second: Item;
};

import { defineComponent } from "vue";
import Item from "../models/Item";
export default defineComponent({
  props: {
    items: { type: Object as () => Array<Item>, required: true },
    item: { type: Object as () => Item, required: true },
  },
  setup(props) {
    const matrix = new Array<Pair>();

    for (let item of props.items) {
      const rowIndex = props.items.indexOf(props.item);
      const index = props.items.indexOf(item);
      if (index >= rowIndex) break;
      const pair: Pair = { first: item, second: props.item };

      matrix.push(pair);
    }

    return {
      matrix,
    };
  },
});
</script>

<template>
  <td v-for="num in Number(items.indexOf(item))">
    <div class="flex flex-col border border-gray-400 p-0.5">
      <div class="flex justify-between align-text-bottom">
        <label for="'item' + num">{{ items.indexOf(i) + num - 1 }}</label>
        <input
          :id="'item' + num"
          type="radio"
          class="icon"
          :value="item.id"
          :name="'choice' + item.id"
        />
      </div>
      <div class="flex justify-between align-text-bottom">
        <label for="'item' + num">{{ items.indexOf(i) + num }}</label>
        <input
          type="radio"
          class="icon"
          :value="i.id"
          :name="'choice' + i.id"
        />
      </div>
    </div>
    <!-- <button class="icon"><i class="fas fa-chevron-up"></i></button>
          <button class="icon"><i class="fas fa-chevron-down"></i></button> -->
  </td>
</template>
