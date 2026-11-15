<!-- ./components/ArticleTags.vue -->

<script setup>
// tag list state
const expanded = ref(false)

// helper function to flatten tags array
const flatten = (tags, key) => {
  console.log(tags)

  const _tags = tags
    .map((tag) => {
      let _tag = tag
      if (tag[key]) {
        const flattened = flatten(tag[key])
        _tag = flattened
      }
      return _tag
    })
    .flat(1)

  console.log({ _tags })

  return _tags
}

// function to toggle expanded state
const toggleExpand = () => {
  expanded.value = !expanded.value
}

// get only tags data from `/blog`
const { data } = await useAsyncData('tags', () =>
  queryCollection('content').select('tags').all(),
)

// generate array without duplicates from flattened array
const articleTags = [...new Set(flatten(data.value, 'tags'))]

console.log({ articleTags })
</script>
<template>
  <div class="tag-list" :class="{ active: expanded }">
    <!-- Button to toggle expand -->
    <button class="cta w-icon" @click="toggleExpand">
      <BootstrapIcon icon="tag-fill" />
      <span>Tags</span>
    </button>
    <ul class="article-tags" :class="{ expanded: expanded }">
      <!-- list out tags with links -->
      <li v-for="(tag, n) in articleTags" :key="n" class="tag">
        <NuxtLink :to="`/blog/tags/${tag}`" class="font-semibold">
          {{ tag }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tag-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
}

.tag-list.active {
  border-color: #e2e8f0;
}

.article-tags {
  max-width: 0;
  overflow: hidden;
  transition: all;
}

.article-tags.expanded {
  max-width: 100%;
}
</style>
