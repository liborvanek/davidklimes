<script lang="ts">
  import { stores } from '@sapper/app';

  const { page } = stores();

  export let title;
  export let description;

  const site = `https://${$page.host}`;
  const url = `${site}${$page.path}`;
</script>

<meta name="description" content={description} />

<!-- Facebook Meta Tags -->
<meta property="og:url" content={url} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={`${site}/david-klimes-card.jpg`} />

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:domain" content="davidklimes.cz" />
<meta property="twitter:url" content={url} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={`${site}/david-klimes-card.jpg`} />
