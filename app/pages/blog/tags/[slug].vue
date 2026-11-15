<!-- ./pages/blog/tags/[slug].vue -->

<script setup>
// get current route
const {
  params: { slug },
} = useRoute()

const filter = slug.split(',')
console.log({ filter })

const { data } = await useAsyncData(`blog-tags-${slug}`, async () => {
  const allArticles = await queryCollection('content')
    .select('title', 'excerpt', 'tags', 'path', 'img')
    .all()

  // Filter articles by tags on client side since v3 doesn't support array contains directly
  return allArticles.filter((article) => {
    if (!article.tags || !Array.isArray(article.tags)) return false
    return filter.some((tag) => article.tags.includes(tag))
  })
})

useMySEO(
  `Wszystkie wpisy z tagiem "${slug}"`,
  `Zapraszam do zapoznania się z wpisami mojej strony "MojeZapiski.pl" związanych z tagiem "${slug}"! Tutaj odkryjesz fascynujący świat programowania, opisany z perspektywy pasjonata, który kocha kodowanie. Dołącz do podróży ze mną, aby razem będziemy odkrywać nowe horyzonty, tworzyć, eksperymentować i dzielić się wiedzą.`,
  ['Nuxt.js', 'Java', 'Spring'],
  '/logo.png',
)
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 border-right mb-3 pt-1 pr-4">
        <h1 class="text-5xl font-extrabold">
          Wszystkie wpisy z tagiem "{{ slug }}"
        </h1>
        <p class="font-medium text-lg">
          Poniżej lista wpisów zawierających wskazany tag
        </p>
        <h2>Wpisy</h2>
        <!-- Render list of all articles in ./content/blog using `path` -->
        <div v-if="data && data.length > 0">
          <div v-for="article in data" :key="article.path" class="mb-5">
            <PostItem :article="article" />
          </div>
        </div>
        <p v-else>Nie znaleziono wpisów.</p>
      </div>
      <div class="col-md-4 pt-5 pb-5"></div>
    </div>
  </div>
</template>
