<script lang="ts">
  import { fly } from 'svelte/transition';
  import { goto } from '@sapper/app';
  import promiseMinDelay from 'p-min-delay';

  import { showNewsletterIntro, email, isSubscribed } from '../stores';
  import Button from './Button.svelte';
  import ErrorMessage from '../components/ErrorMessage.svelte';

  let jmeno: string | null = null;
  let prijmeni: string | null = null;
  let note: string | null = null;

  let formState = {
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  };

  const onSubmit = async () => {
    if ((jmeno || prijmeni || note) && $email) {
      formState.isSubmitting = true;
      formState.isError = false;
      try {
        await promiseMinDelay(
          fetch('/api/newsletter/update', {
            method: 'PUT',
            body: JSON.stringify({ email: $email, jmeno, prijmeni, note }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((body) => body.json()),
          1200,
        );
      } catch (error) {
        formState.isSubmitting = false;
        formState.isError = true;
        return;
      }
      formState.isSubmitting = false;
      formState.isSuccess = true;
      formState.isError = false;
    }
    isSubscribed.set(true);
    showNewsletterIntro.set(false);
    goto('/');
  };
</script>

<div
  class="max-w-screen-lg mx-auto p-4 lg:p-16 bg-gray-50 dark:bg-dark-gray-700 rounded shadow-2xl"
  in:fly={{ y: 100, duration: 750, delay: 300 }}>
  <p
    class="mt-6 text-lg lg:text-2xl text-gray-700 dark:text-dark-gray-200 leading-normal font-bold">
    Moc mě těší, že máte zájem o můj newsletter.<br />Píšu v&nbsp;něm o událostech v politice a
    ekonomice, které nejsou na první pohled zjevné, ale zasluhují pozornost.
  </p>
  <p class="mt-6 lg:text-lg leading-relaxed">
    Jeden z hlavních důvodů, proč ho každý týden píšu je přímý kontakt s vámi a&nbsp;bezprostřední
    zpětná vazba. Hodně mi na ní záleží.
  </p>
  <p class="my-6 lg:text-lg leading-relaxed">
    Máte-li chuť, napište mi, prosím, pár řádků o tom, čemu se profesně věnujete a&nbsp;třeba
    i&nbsp;o&nbsp;čem by se mělo víc mluvit, ale nemluví.
  </p>
  <form on:submit|preventDefault={onSubmit}>
    <textarea
      placeholder="Pište sem..."
      name="note"
      bind:value={note}
      class="w-full h-20 py-2 px-3 bg-brown-100 dark:bg-dark-gray-600 inline-block appearance-none placeholder-gray-400 dark:placeholder-gray-100 rounded-md text-gray-700 dark:text-dark-gray-100 leading-5 focus:outline-none border-2 border-brown-100 dark:border-dark-gray-600  focus:border-blue-500 dark:focus:border-blue-700" />
    <p class="mt-6 text-lg leading-relaxed">
      Doplňte, prosím, ještě svoje
      <input
        type="text"
        placeholder="jméno"
        name="jmeno"
        bind:value={jmeno}
        class="w-48 xs-only:mb-2 py-2 px-3 bg-brown-100 dark:bg-dark-gray-600 inline-block appearance-none placeholder-gray-400 dark:placeholder-gray-100 rounded-md text-gray-700 dark:text-dark-gray-100 leading-5 focus:outline-none border-2 border-brown-100 focus:border-blue-500 dark:focus:border-blue-700   dark:border-dark-gray-600 " />
      a
      <input
        type="text"
        placeholder="příjmení"
        name="prijmeni"
        bind:value={prijmeni}
        class="w-48 py-1 px-3 bg-brown-100 dark:bg-dark-gray-600 inline-block appearance-none placeholder-gray-400 dark:placeholder-gray-100 rounded-md text-gray-700 dark:text-dark-gray-100 focus:outline-none border-2 border-brown-100 dark:border-dark-gray-600 focus:border-blue-500 dark:focus:border-blue-700" />,
      pokud vám to není proti srsti.
    </p>
    {#if formState.isError}
      <ErrorMessage classes="mt-4"
        >Při odesílání došlo k chybě, zkuste to, prosím, znovu.</ErrorMessage>
    {/if}

    {#if jmeno || prijmeni || note}
      <Button {...formState} classes="mt-16">Aktualizovat</Button>
    {:else}
      <Button classes="mt-16">Pokračovat</Button>
    {/if}
  </form>
</div>
