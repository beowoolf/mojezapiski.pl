<script setup>
// const skip = ref(0);
// const limit = ref(10);
const title = ref('Wszystkie wpisy');
const description = ref('Zapraszam do zapoznania się z archiwum wpisów mojej strony "MojeZapiski.pl"! Tutaj odkryjesz fascynujący świat programowania, opisany z perspektywy pasjonata, który kocha kodowanie. Dołącz do podróży ze mną, aby razem będziemy odkrywać nowe horyzonty, tworzyć, eksperymentować i dzielić się wiedzą.');

// const { data, refresh } = await useAsyncData('homepage', () => {
//   return queryContent('/blog').sort({ ident: -1, $numeric: true }).skip(skip.value).limit(limit.value).find()
// })

// watch([skip, limit], () => {
//   refresh()
// })
useMySEO(title.value, description.value, ['Nuxt.js', 'Java', 'Spring'], '/logo.png')
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 border-right mb-3 pt-1 pr-4">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <h2>Archiwum</h2>
        <ContentList path="/blog" :query="{
          sort: { ident: -1, $numeric: true },
        }">
          <template v-slot="{ list }">
            <div v-for="article in list" :key="article._path" class="mb-5">
              <PostItem :article="article" />
            </div>
          </template>
          <template #not-found>
            <p>Brak opublikowanych artykułów.</p>
          </template>
        </ContentList>
      </div>
      <div class="col-md-4 pt-5 pb-5">
      </div>
    </div>
  </div>
</template>
