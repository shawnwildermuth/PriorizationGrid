<script lang="ts">
import { defineComponent, effect, reactive, ref} from "vue";
import Vote from "../models/Vote";
import Task from "../models/Task";
import { getStore } from "../store";

export default defineComponent({
  props: {
    item: { type: Object as () => Task, required: true },
  },
  setup(props) {
    const store = getStore();
    let votes = reactive(Array<Vote>());

    effect(() => setVotes());

    function setVotes() {
      const newVotes = store.state.votes[props.item.id];
      if (newVotes) {
          votes.length = 0;
          votes.push(...newVotes);
      }
    }

    function markAsHighlight(vote: Vote, clear: Boolean = false) {
      store.state.highlightedIds.length = 0;
      store.state.highlightedIds.push(...[vote.first.id, vote.second.id]);
    }

    function clearAsHighlight() {
      store.state.highlightedIds.length = 0;
    }

    function tasksLabel(first: Task, second: Task) {
      const firstIndex = store.state.tasks.indexOf(first);
      const secondIndex = store.state.tasks.indexOf(second);
      return `${firstIndex}-${secondIndex}`;
    }

    return {
      votes,
      markAsHighlight,
      clearAsHighlight,
      store,
      tasksLabel
    };
  },
});

</script>

<template>
  <td v-for="vote in votes">
    <div
      class="flex flex-col border border-gray-200 rounded p-0.5"
      @mouseover="markAsHighlight(vote)"
      @mouseout="clearAsHighlight()"
    >
      <div class="flex justify-between align-text-bottom">
        <input
          :id="'item' + tasksLabel(vote.first, vote.second)"
          type="radio"
          class="mt-1.5 mr-1"
          v-model="vote.choice"
          value="true"
          tabindex="-1"
          :name="'choice' + tasksLabel(vote.first, vote.second)"
        />
        <label
          :for="'item' + store.state.tasks.indexOf(vote.first) + '-' + store.state.tasks.indexOf(vote.second)"
          tabindex="-1"
          >{{ store.state.tasks.indexOf(vote.first) + 1}}</label
        >
      </div>
      <div class="flex justify-between align-text-bottom">
        <input
          type="radio"
          class="mt-1.5 mr-1"
          v-model="vote.choice"
          value="false"
          tabindex="-1"
          :id="'item' + tasksLabel(vote.second, vote.second)"
          :name="'choice' + tasksLabel(vote.first, vote.second)"
        />
        <label
          tabindex="-1"
          :for="'item' + tasksLabel(vote.second, vote.second)"
          >{{ store.state.tasks.indexOf(vote.second) + 1 }}</label
        >
      </div>
    </div>
  </td>
</template>
