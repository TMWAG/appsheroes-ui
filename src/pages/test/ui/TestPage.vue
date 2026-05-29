<script setup lang="ts">
import VButton from '@/shared/ui/VButton/VButton.vue';
</script>
<template>
  <h1>test page</h1>
  <div style="max-width: fit-content; margin: 0">
    <VButton variant="secondary" href="/" iconLeft="ios">Home</VButton>
    <VButton variant="primary" href="/test" iconLeft="locked" disabled>Test</VButton>
  </div>
</template>
