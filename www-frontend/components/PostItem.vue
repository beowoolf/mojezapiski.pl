<template>
    <div>
        <div>
            <div class="img-cont w-32 shrink-0">
                <NuxtLink :to="article._path" :title="article.title">
                    <nuxt-img preload format="webp" :src="`/${article.img}`" :alt="article.title" :title="article.title"
                        width="856" height="601" class="img-fluid rounded-lg max-h-[8rem]"
                        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw" />
                </NuxtLink>
            </div>
            <div>
                <div>
                    <h3>
                        <NuxtLink style="text-decoration: none" :to="article._path" :title="article.title">{{ article.title
                        }}
                        </NuxtLink>
                    </h3>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <span>Tagi:</span>
                        <span v-for="(tag, n) in article.tags" :key="n" class="mx-1">
                            <NuxtLink class="mr-1 mb-1 btn"
                                :class="$colorMode.preference == 'light' ? 'btn-primary' : 'btn-primary'"
                                :to="'/blog/tags/' + tag" :title="'Zobacz wszystkie posty w ' + tag">{{ tag }}</NuxtLink>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <ContentRendererMarkdown :value="article.excerpt" />
        </div>
        <div class="pb-4">
            <NuxtLink class="btn btn-primary btn-sm float-right mr-5"
                :class="$colorMode.preference == 'light' ? 'btn-primary' : 'btn-primary'" :to="article._path"
                :title="article.title + ' - sCzytaj więcej...'">Czytaj więcej...</NuxtLink>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'PostItem',
    props: {
        article: {
            required: true,
        },
    },
}
</script>
  