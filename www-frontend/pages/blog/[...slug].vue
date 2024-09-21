<!-- ./pages/blog/[…slug.vue] -->

<script setup>
const { path } = useRoute();
const { data } = await useAsyncData(`content-${path}`, async () => {
  // fetch document where the document path matches with the cuurent route
  let article = queryContent().where({ _path: path }).findOne();
  // get the surround information,
  // which is an array of documeents that come before and after the current document
  let surround = queryContent().only(["_path", "title", "description"]).sort({ date: 1 }).findSurround(path);

  return {
    article: await article,
    surround: await surround,
  };
});

// destrucure `prev` and `next` value from data
const [prev, next] = data.value.surround;
console.log({ data, prev, next });

useMySEO(
  data.value.article.title,
  data.value.article.description,
  data.value.article.tags,
  `/${data.value.article.img}`
)
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 border-right mb-3 pt-1 pr-4">
        <article id="main" class="article-main">
          <header v-if="data.article" class="article-header">
            <div class="img-cont h-72 mb-12">
              <nuxt-img preload format="webp" :src="`/${data.article.img}`" :alt="data.article.title"
                :title="data.article.title" class="img-fluid" />
            </div>
            <h1 class="heading">{{ data.article.title }}</h1>
            <div>
              <span>Tagi:</span>
              <span v-for="(tag, n) in data.article.tags" :key="n" class="mx-1">
                <NuxtLink class="mr-1 mb-1 btn" :class="$colorMode.preference == 'light' ? 'btn-primary' : 'btn-primary'"
                  :to="'/blog/tags/' + tag" :title="'Zobacz wszystkie posty w ' + tag">{{ tag }}</NuxtLink>
              </span>
            </div>
            <!-- <p class="supporting">{{ data.article.description }}</p> -->
          </header>
          <hr />
          <section class="article-section">
            <aside class="aside">
              <!-- Toc Component -->
              <Toc v-if="data.article.body.toc.links.length > 0" :links="data.article.body.toc.links" />
            </aside>
            <article class="article">
              <!-- render document coming from query -->
              <ContentRenderer :value="data.article">
                <!-- render rich text from document -->
                <ContentRendererMarkdown :value="data.article" />

                <!-- display if document content is empty -->
                <template #empty>
                  <p>Artykuł jest (jeszcze?) pusty.</p>
                </template>
              </ContentRenderer>
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
  @apply p-4 max-w-5xl m-auto;
}

.article-header {
  @apply p-4 pb-12;
}

.article-header .heading {
  @apply font-extrabold text-5xl;
}

.article-header .supporting {
  @apply font-medium text-lg;
}

.article-section {
  @apply grid grid-cols-8;
}

.aside {
  @apply col-span-full md: col-span-2 row-start-1 w-full pt-14;
}

.aside .toc {
  @apply sticky top-20;
}

.article {
  @apply col-span-full md: col-span-6 md:col-start-1 md:row-start-1 prose w-full p-4 max-w-3xl m-auto;
}
</style>
