<template>
  <a :href="page" :title="anchor" :class="linkClass" :rel="rel">
    <slot>{{ anchor }}</slot>
  </a>
</template>

<script>
export default {
  name: 'ExternalLink',
  props: {
    anchor: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: false,
      default: '',
    },
    rel: {
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
