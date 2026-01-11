<template>
  <div class="page">
    <Paper />
    <ArticleHero
      :title="page.title"
    />
    <RichText
      v-if="page.content"
      :richText="page.content.content"
    />
    <BigCta
      path="/zine"
      label="Back to Zine"
    />
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();
const params = { slug: route.params.slug };
const articleQuery = groq`*[_type == 'article' && slug.current == $slug][0]{
  title,
  slug,
  content {
    content[] {
      ...,
      _type == 'singleImage' => {
        image ${imageProps}
      }
    }
  }
}`;

// Async data
const { data } = await useSanityQuery(articleQuery, { slug: params.slug });
const page = data.value;
</script>
