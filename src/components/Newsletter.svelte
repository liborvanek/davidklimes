<script lang="ts">
  import promiseMinDelay from 'p-min-delay';

  import { showNewsletterIntro, email as emailStore, isSubscribed } from '../stores';
  import Button from './Button.svelte';
  import Link from './Link.svelte';
  import ErrorMessage from '../components/ErrorMessage.svelte';

  import type { SubscribeSuccessResult } from '../routes/api/newsletter/subscribe';

  let formState = {
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    isAlreadySubscribed: false,
  };
  let email: string | null = null;

  const onSubmit = async () => {
    if (email) {
      formState.isSubmitting = true;
      formState.isAlreadySubscribed = false;
      formState.isError = false;
      try {
        const subscribe: SubscribeSuccessResult = await promiseMinDelay(
          fetch('/api/newsletter/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((body) => body.json()),
          1200,
        );

        if (subscribe.already_subscribed) {
          formState.isSubmitting = false;
          formState.isAlreadySubscribed = true;
        } else {
          emailStore.set(email);
          formState.isSubmitting = false;
          formState.isSuccess = true;

          setTimeout(() => {
            showNewsletterIntro.set(true);
          }, 1200);
        }
      } catch (error) {
        formState.isError = true;
        console.log('error: ', error);
      } finally {
        formState.isSubmitting = false;
      }
    }
  };
</script>

<h2 class="text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-200 max-w-md ">
  newsletter o&nbsp;souvislostech v&nbsp;byznysu a&nbsp;politice
</h2>
<p class="mt-3 lg:mt-6 mb-8 lg:mb-12 text-gray-500 dark:text-gray-200">
  každé pondělí <span class="text-blue-500">&bull;</span>&nbsp;jen to podstatné
  <span class="text-blue-500">&bull;</span>&nbsp;už je nás <strong>2154</strong>
</p>
{#if formState.isAlreadySubscribed}
  <ErrorMessage>
    Tento e-mail už je k odběru přihlášený, odhlásit se případně můžete kliknutím na odkaz
    v&nbsp;patičce newsletteru.
  </ErrorMessage>
{/if}
{#if formState.isError}
  <ErrorMessage>Při odesílání došlo k chybě, zkuste to, prosím, znovu.</ErrorMessage>
{/if}
{#if $isSubscribed}
  <p class="lg:w-2/3 p-4 lg:p-8 bg-gray-100 text-gray-700">
    Přihlásili jsme vás k&nbsp;odběru newsletteru, odhlásit se můžete kliknutím na odkaz v&nbsp;jeho
    patičce.
  </p>
{:else}
  <form class="flex flex-wrap md:flex-nowrap w-full xl:w-2/3" on:submit|preventDefault={onSubmit}>
    <input
      type="email"
      bind:value={email}
      placeholder="váš e-mail"
      class="w-full py-5 px-6 bg-brown-100 inline-block appearance-none placeholder-gray-500 rounded-md text-gray-700 leading-5 focus:outline-none border border-brown-100 focus:border-blue-500 transition-colors" />
    <Button
      {...formState}
      classes="mt-1 md:mt-0 w-full md:w-auto md:ml-2"
      aria-label="Přihlásit odběr newsletteru">Přihlásit</Button>
  </form>
{/if}

<p class="mt-4 ml-6 text-sm">
  <Link href="/archiv-newsletteru">archiv všech čísel</Link>
</p>
