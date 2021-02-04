<script lang="ts">
  import { fly } from 'svelte/transition';
  import { goto } from '@sapper/app';

  import { showNewsletterIntro, email, isSubscribed } from '../stores';
  import Button from './Button.svelte';

  let jmeno: string | null = null;
  let prijmeni: string | null = null;
  let note: string | null = null;

  const onSubmit = async () => {
    if ((jmeno || prijmeni || note) && $email) {
      try {
        await fetch('/api/newsletter/update', {
          method: 'PUT',
          body: JSON.stringify({ email: $email, jmeno, prijmeni, note }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((body) => body.json());
        // TODO: proper error and success handling
      } catch (error) {
        console.log('error: ', error);
      }
      isSubscribed.set(true);
      showNewsletterIntro.set(false);
      goto('/');
    }
  };
</script>

<div
  class="max-w-screen-lg mx-auto p-16 bg-gray-50 rounded shadow-2xl font-light"
  in:fly={{ y: 100, duration: 750, delay: 300 }}>
  <p class="mt-6 text-2xl text-gray-700 leading-normal font-bold">
    Moc mě těší, že máte zájem o můj newsletter.<br />Píšu v&nbsp;něm o událostech v politice a
    ekonomice, které nejsou na první pohled zjevné, ale zasluhují pozornost.
  </p>
  <p class="mt-6 text-lg leading-relaxed">
    Jeden z hlavních důvodů, proč ho každý týden píšu je přímý kontakt s vámi a&nbsp;bezprostřední
    zpětná vazba. Hodně mi na ní záleží.
  </p>
  <p class="my-6 text-lg leading-relaxed">
    Máte-li chuť, napište mi, prosím, pár řádků o tom, čemu se profesně věnujete a&nbsp;třeba
    i&nbsp;o&nbsp;čem by se mělo víc mluvit, ale nemluví.
  </p>
  <form on:submit|preventDefault={onSubmit}>
    <textarea
      placeholder="Pište sem..."
      name="note"
      bind:value={note}
      class="w-full h-20 py-2 px-3 bg-brown-100 inline-block appearance-none placeholder-gray-400 rounded-md text-gray-700 leading-5 focus:outline-none border-2 border-brown-100 focus:border-blue-500 transition-colors" />
    <p class="mt-6 text-lg leading-relaxed">
      Doplňte, prosím, ještě svoje
      <input
        type="text"
        placeholder="jméno"
        name="jmeno"
        bind:value={jmeno}
        class="w-48 py-2 px-3 bg-brown-100 inline-block appearance-none placeholder-gray-400 rounded-md text-gray-700 leading-5 focus:outline-none border-2 border-brown-100 focus:border-blue-500 transition-colors" />
      a
      <input
        type="text"
        placeholder="příjmení"
        name="prijmeni"
        bind:value={prijmeni}
        class="w-48 py-1 px-3 bg-brown-100 inline-block appearance-none placeholder-gray-400 rounded-md text-gray-700  focus:outline-none border-2 border-brown-100 focus:border-blue-500 transition-colors" />,
      pokud vám to není proti srsti.
    </p>

    {#if jmeno || prijmeni || note}
      <Button classes="mt-16">Aktualizovat</Button>
    {:else}
      <Button classes="mt-16">Pokračovat</Button>
    {/if}
  </form>
</div>
