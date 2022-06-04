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
      store.state.highlightedIds.push(...[vote.firstId, vote.secondId]);
    }

    function clearAsHighlight() {
      store.state.highlightedIds.length = 0;
    }

    function tasksLabel(firstId: string, secondId: string) {
      const first = store.state.tasks.find(v => v.id === firstId);
      const second = store.state.tasks.find(v => v.id === firstId);
      const firstIndex = store.state.tasks.indexOf(first!);
      const secondIndex = store.state.tasks.indexOf(second!);
      return `${firstIndex}-${secondIndex}`;
    }

    function taskOrdinal(id: string): Number {
      const task = store.state.tasks.find(v => v.id === id);
      if (!task) throw "Failed to find task";
      return store.state.tasks.indexOf(task) + 1;
    }

    return {
      votes,
      markAsHighlight,
      clearAsHighlight,
      store,
      tasksLabel,
      taskOrdinal
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
          :id="'item' + tasksLabel(vote.firstId, vote.secondId)"
          type="radio"
          class="mt-1.5 mr-1"
          v-model="vote.choice"
          value="true"
          tabindex="-1"
          :name="'choice' + tasksLabel(vote.firstId, vote.secondId)"
        />
        <label
          :for="'item' + tasksLabel(vote.firstId, vote.secondId)"
          tabindex="-1"
          >{{ taskOrdinal(vote.firstId) }}</label
        >
      </div>
      <div class="flex justify-between align-text-bottom">
        <input
          type="radio"
          class="mt-1.5 mr-1"
          v-model="vote.choice"
          value="false"
          tabindex="-1"
          :id="'item' + tasksLabel(vote.secondId, vote.secondId)"
          :name="'choice' + tasksLabel(vote.firstId, vote.secondId)"
        />
        <label
          tabindex="-1"
          :for="'item' + tasksLabel(vote.secondId, vote.secondId)"
          >{{ taskOrdinal(vote.secondId) }}</label
        >
      </div>
    </div>
  </td>
</template>
