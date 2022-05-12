<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import Vote from "../models/Vote";
import Task from "../models/Task";
import { getStore } from "../store";

export default defineComponent({
  props: {
    item: { type: Object as () => Task, required: true },
  },
  setup(props) {
    const store = getStore();

    const id = props.item.id;
    let votes: Array<Vote> | null = null;
    if (store.state.votes[id]) {
      const currentVotes = store.state.votes[id];
      if (currentVotes) votes = currentVotes;
    }

    function markAsHighlight(vote: Vote, clear: Boolean = false) {
      store.state.highlightedIds.length = 0;
      store.state.highlightedIds.push(...[vote.first.id, vote.second.id]);
    }

    function clearAsHighlight() {
      store.state.highlightedIds.length = 0;
    }

    return {
      votes,
      markAsHighlight,
      clearAsHighlight
    };
  },
});
</script>

<template>
  <td v-for="vote in votes">
    <div class="flex flex-col border border-gray-200 rounded p-0.5" @mouseover="markAsHighlight(vote)" @mouseout="clearAsHighlight()">
      <div class="flex justify-between align-text-bottom" >
        <input
          :id="'item' + vote.first.id + '-' + vote.second.id"
          type="radio"
          class="mt-1.5 mr-1"
          v-model="vote.choice"
          value="true"
          tabindex="-1"
          :name="'choice' + vote.first.id + '-' + vote.second.id"
        />
        <label
          :for="'item' + vote.first.id + '-' + vote.second.id"
          tabindex="-1"
          >{{ vote.first.id }}</label
        >
      </div>
      <div class="flex justify-between align-text-bottom">
        <input
          type="radio"
          class="mt-1.5 mr-1"
          v-model="vote.choice"
          value="false"
          tabindex="-1"
          :id="'item' + vote.second.id + '-' + vote.second.id"
          :name="'choice' + vote.first.id + '-' + vote.second.id"
        />
        <label
          tabindex="-1"
          :for="'item' + vote.second.id + '-' + vote.second.id"
          >{{ vote.second.id }}</label
        >
      </div>
    </div>
    <!-- <button class="icon"><i class="fas fa-chevron-up"></i></button>
          <button class="icon"><i class="fas fa-chevron-down"></i></button> -->
  </td>
</template>
