<script setup>
const skip = ref(0)
const limit = ref(10)
const title = ref('O życiu w IT i nie tylko')
const description = ref(
  'Zapraszam do zapoznania się z moją stroną "MojeZapiski.pl"! Tutaj odkryjesz fascynujący świat programowania, opisany z perspektywy pasjonata, który kocha kodowanie. Dołącz do podróży ze mną, aby razem będziemy odkrywać nowe horyzonty, tworzyć, eksperymentować i dzielić się wiedzą.',
)

const { data, refresh } = await useAsyncData('homepage', () => {
  return queryCollection('content')
    .order('ident', 'DESC')
    .skip(skip.value)
    .limit(limit.value)
    .all()
})

watch([skip, limit], () => {
  refresh()
})

useMySEO(
  title.value,
  description.value,
  ['Nuxt.js', 'Java', 'Spring'],
  '/logo.png',
)
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 border-right mb-3 pt-1 pr-4">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <h2>Nowości na blogu</h2>
        <div v-if="data && data.length > 0">
          <div v-for="article in data" :key="article.path" class="mb-5">
            <PostItem :article="article" />
          </div>
        </div>
        <p v-else>Brak opublikowanych artykułów.</p>
      </div>
      <div class="col-md-4 pt-5 pb-5"></div>
    </div>
  </div>
</template>
