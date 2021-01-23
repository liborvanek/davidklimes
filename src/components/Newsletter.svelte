<script lang="ts">
  import { showNewsletterIntro, email as emailStore, alreadySubscribed } from '../stores';
  import Button from './Button.svelte';
  import type { SubscribeSuccessResult } from '../routes/api/newsletter/subscribe';

  const isUserAlreadySubscribed = () => {
    if (typeof window !== 'undefined' && document) {
      // TODO: fix once typescript
      const alreadySubscribedCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('alreadySubscribed'));
      const foundCookie = alreadySubscribedCookie ? alreadySubscribedCookie.split('=')[1] : false;

      return foundCookie;
    }

    return false;
  };

  let formState = {
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  };
  let email: string | null = null;

  if (isUserAlreadySubscribed()) {
    alreadySubscribed.set(true);
  }

  const onSubmit = async () => {
    if (email) {
      try {
        const subscribe: SubscribeSuccessResult = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((body) => body.json());
        emailStore.set(email);

        // TODO: proper error and success handling
        if (subscribe.already_subscribed) {
          alreadySubscribed.set(true);
          document.cookie = 'alreadySubscribed=true';
        } else {
          formState.isSubmitting = true;
          setTimeout(() => {
            formState.isSubmitting = false;
            formState.isSuccess = true;
            setTimeout(() => {
              showNewsletterIntro.set(true);
            }, 1200);
          }, 2000);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };
</script>

<div>
  <h2 class="text-3xl font-bold text-gray-700">newsletter o souvislostech v byznysu a politice</h2>
  <p class=" mt-3 text-gray-500">
    každé pondělí <span class="text-blue-500">&bull;</span> jen to podstatné
    <span class="text-blue-500">&bull;</span> kdykoliv se můžete odhlásit
  </p>
  {#if $alreadySubscribed}
    <div class="mt-12 flex w-2/3">
      <Button {...formState}>Jsi již přihlášen k odběru</Button>
    </div>
  {:else}
    <form class="mt-12 flex w-2/3" on:submit|preventDefault={onSubmit}>
      <input
        type="email"
        bind:value={email}
        placeholder="váš e-mail"
        class="w-full py-5 px-6 bg-brown-100 inline-block appearance-none placeholder-gray-500 rounded-md text-gray-700 leading-5 focus:outline-none border border-brown-100 focus:border-blue-500 transition-colors" />
      <Button {...formState}>Přihlásit</Button>
    </form>
  {/if}

  <p class="mt-4 ml-6 text-sm">
    <a href="">archiv všech čísel</a>
    <span class="text-gray-400">&bull;</span>
    <a href="">spravovat členství</a>
  </p>
</div>
