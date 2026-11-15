<!-- ./pages/blog/[…slug.vue] -->

<script setup>
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, async () => {
  // fetch document where the document path matches with the current route
  const article = await queryCollection('content').path(path).first()
  // get the surround information,
  // which is an array of documents that come before and after the current document
  const surround = await queryCollectionItemSurroundings('content', path, {
    fields: ['path', 'title', 'description'],
  })

  return {
    article,
    surround,
  }
})

// destructure `prev` and `next` value from data
const [prev, next] = data.value.surround || []
console.log({ data, prev, next })

// v3: fallback dla pustej treści (zamiast slotu #empty)
function hasContent(article) {
  const body = article?.body
  if (!body) return false
  return body.children?.length > 0 || body.toc?.links?.length > 0
}

useMySEO(
  data.value.article.title,
  data.value.article.description,
  data.value.article.tags,
  `/${data.value.article.img}`,
)
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 border-right mb-3 pt-1 pr-4">
        <article id="main" class="article-main">
          <header v-if="data.article" class="article-header">
            <div class="img-cont h-72 mb-12">
              <nuxt-img
                preload
                format="webp"
                :src="`/${data.article.img}`"
                :alt="data.article.title"
                :title="data.article.title"
                class="img-fluid"
              />
            </div>
            <h1 class="heading">{{ data.article.title }}</h1>
            <div>
              <span>Tagi:</span>
              <span v-for="(tag, n) in data.article.tags" :key="n" class="mx-1">
                <NuxtLink
                  class="mr-1 mb-1 btn"
                  :class="
                    $colorMode.preference == 'light'
                      ? 'btn-primary'
                      : 'btn-primary'
                  "
                  :to="'/blog/tags/' + tag"
                  :title="'Zobacz wszystkie posty w ' + tag"
                  >{{ tag }}</NuxtLink
                >
              </span>
            </div>
            <!-- <p class="supporting">{{ data.article.description }}</p> -->
          </header>
          <hr />
          <section class="article-section">
            <aside class="aside">
              <!-- ArticleToc Component -->
              <ArticleToc
                v-if="data.article?.body?.toc?.links?.length > 0"
                :links="data.article.body.toc.links"
              />
            </aside>
            <article class="article">
              <!-- render document (Nuxt Content v3: ContentRenderer sam renderuje treść, bez ContentRendererMarkdown) -->
              <ContentRenderer
                v-if="data.article && hasContent(data.article)"
                :value="data.article"
              />
              <p v-else-if="data.article">Artykuł jest (jeszcze?) pusty.</p>
            </article>
          </section>

          <!-- PrevNext Component -->
          <PrevNext :prev="prev" :next="next" />
        </article>
      </div>
      <div class="col-md-4 pt-5 pb-5"></div>
    </div>
  </div>
</template>

<style scoped>
.article-main {
  max-width: 64rem;
  padding: 1rem;
  margin: auto;
}

.article-header {
  padding: 1rem 1rem 3rem;
}

.article-header .heading {
  font-size: 3rem;
  font-weight: 800;
}

.article-header .supporting {
  font-size: 1.125rem;
  font-weight: 500;
}

.article-section {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
}

.aside {
  grid-column: 1 / -1;
  grid-row-start: 1;
  width: 100%;
  padding-top: 3.5rem;
}

.aside .toc {
  position: sticky;
  top: 5rem;
}

.article {
  grid-column: 1 / -1;
  width: 100%;
  max-width: 48rem;
  padding: 1rem;
  margin: auto;
}

@media (width >= 768px) {
  .aside {
    grid-column: span 2 / span 2;
  }

  .article {
    grid-column: span 6 / span 6;
    grid-column-start: 1;
    grid-row-start: 1;
  }
}
</style>
