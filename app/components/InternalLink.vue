<template>
  <NuxtLink :to="page" :title="anchor" :class="linkClass">
    <slot>{{ anchor }}</slot>
  </NuxtLink>
</template>

<script>
export default {
  name: 'InternalLink',
  props: {
    anchor: {
      type: String,
      required: true,
    },
    page: {
      type: [String, Object],
      required: true,
    },
    class: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    linkClass() {
      return this.class
    },
  },
}
</script>
