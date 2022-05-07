<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="container mx-auto bg-amber-50 min-h-screen p-3">
    <div class="flex justify-between">
      <div>PriorGrid</div>
      <div>
        <router-link to="/" class="button">Home</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
