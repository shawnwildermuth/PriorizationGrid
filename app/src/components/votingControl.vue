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
    let votes: Array<Vote> | null  = null;
    if (store.state.votes[id]) {
      const currentVotes = store.state.votes[id];
      if (currentVotes) votes = currentVotes;
    }

    return {
      votes
    };
  },
});
</script>

<template>
  <td v-for="vote in votes">
    <div class="flex flex-col border border-gray-400 p-0.5">
      <div class="flex justify-between align-text-bottom">
        <input
          :id="'item' + vote.first.id + '-' + vote.second.id"
          type="radio"
          class="icon"
          v-model="vote.choice"
          value="true"
          :name="'choice' + vote.first.id + '-' + vote.second.id"
        />
        <label :for="'item' + vote.first.id + '-' + vote.second.id">{{
          vote.first.id
        }}</label>
      </div>
      <div class="flex justify-between align-text-bottom">
        <input
          type="radio"
          class="icon"
          v-model="vote.choice"
          value="false"
          :id="'item' + vote.second.id + '-' + vote.second.id"
          :name="'choice' + vote.first.id + '-' + vote.second.id"
        />
        <label :for="'item' + vote.second.id + '-' + vote.second.id">{{
          vote.first.id
        }}</label>
      </div>
    </div>
    <!-- <button class="icon"><i class="fas fa-chevron-up"></i></button>
          <button class="icon"><i class="fas fa-chevron-down"></i></button> -->
  </td>
</template>
