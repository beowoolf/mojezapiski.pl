<!-- ./pages/blog/tags/[slug].vue -->

<script setup>
// get current route
const {
  params: { slug },
} = useRoute();

const filter = slug.split(",");
console.log({ filter });


useMySEO(
  `Wszystkie wpisy z tagiem "${slug}"`,
  `Zapraszam do zapoznania się z wpisami mojej strony "MojeZapiski.pl" związanych z tagiem "${slug}"! Tutaj odkryjesz fascynujący świat programowania, opisany z perspektywy pasjonata, który kocha kodowanie. Dołącz do podróży ze mną, aby razem będziemy odkrywać nowe horyzonty, tworzyć, eksperymentować i dzielić się wiedzą.`,
  ['Nuxt.js', 'Java', 'Spring'],
  '/logo.png'
)
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 border-right mb-3 pt-1 pr-4">
        <h1 class="text-5xl font-extrabold">Wszystkie wpisy z tagiem "{{ slug }}"</h1>
        <p class="font-medium text-lg">Poniżej lista wpisów zawierających wskazany tag</p>
        <h2>Wpisy</h2>
        <!-- Render list of all articles in ./content/blog using `path` -->
        <!-- Provide only defined fieldsin the `:query` prop -->
        <ContentList path="/blog" :query="{
          only: ['title', 'excerpt', 'tags', '_path', 'img'],
          where: {
            tags: {
              $contains: filter,
            },
          },
          $sensitivity: 'base',
        }">
          <!-- Default list slot -->
          <template v-slot="{ list }">
            <div v-for="article in list" :key="article._path" class="mb-5">
              <PostItem :article="article" />
            </div>
          </template>

          <!-- Not found slot to display message when no content us is found -->
          <template #not-found>
            <p>Nie znaleziono wpisów.</p>
          </template>
        </ContentList>
      </div>
      <div class="col-md-4 pt-5 pb-5"></div>
    </div>
  </div>
</template>
