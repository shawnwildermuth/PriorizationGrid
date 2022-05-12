<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="container mx-auto bg-white min-h-screen">
    <div class="flex justify-between p-2 bg-amber-700 text-white">
      <div class="text-2xl font-bold">Priority Grid</div>
      <div>
        <router-link to="/" class="button bg-slate-200 text-black hover:bg-slate-500">Home</router-link>
      </div>
    </div>
    <router-view class="p-2"></router-view>
  </div>
</template>
