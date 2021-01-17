<script>
  import { fly } from 'svelte/transition';

  import Button from './Button.svelte';
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
  <textarea
    placeholder="Pište sem..."
    class="w-full h-20 py-2 px-3 bg-brown-100 inline-block appearance-none placeholder-gray-400 rounded-md text-gray-700 leading-5 focus:outline-none border-2 border-brown-100 focus:border-blue-500 transition-colors" />
  <p class="mt-6 text-lg leading-relaxed">
    Doplňte, prosím, ještě svoje
    <input
      type="text"
      placeholder="jméno"
      name="jmeno"
      class="w-48 py-2 px-3 bg-brown-100 inline-block appearance-none placeholder-gray-400 rounded-md text-gray-700 leading-5 focus:outline-none border-2 border-brown-100 focus:border-blue-500 transition-colors" />
    a
    <input
      type="text"
      placeholder="příjmení"
      name="prijmeni"
      class="w-48 py-1 px-3 bg-brown-100 inline-block appearance-none placeholder-gray-400 rounded-md text-gray-700  focus:outline-none border-2 border-brown-100 focus:border-blue-500 transition-colors" />,
    pokud vám to není proti srsti.
  </p>

  <p class="mt-12 text-lg leading-relaxed">
    Tady bude text o tom, že newsletter bude vždycky zdarma, ale zároveň jeho provoz je financován z
    darů. Vysvětlení co to znamená a na co se peníze použijí.
  </p>
  <Button classes="mt-16">Odeslat</Button>
</div>
