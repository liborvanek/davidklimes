<script lang="ts">
  import PageTransition from '../components/PageTransition.svelte';
  import Link from '../components/Link.svelte';
</script>

<svelte:head>
  <title>O mně – David Klimeš</title>
  <meta
    name="description"
    content="Komentuji ekonomické a politické dění. Na Fakultě sociálních věd UK vyučuji komunikaci. Jsem držitelem novinářské Ceny Karla Havlíčka Borovského." />
</svelte:head>

<PageTransition>
  <article class="relative flex flex-col lg:block leading-7">
    <figure
      class="order-last max-w-xs mx-auto mt-12 lg:mt-0 lg:mb-16 lg:ml-12 xl:ml-32 lg:float-right transform rotate-1">
      <picture>
        <source srcset="david-klimes.webp" type="image/webp" />
        <img src="david-klimes.jpg" alt="Portrét Davida Klimeš" width="350" height="350" />
      </picture>
      <figcaption class="mt-8 text-center">
        <h3 class="font-bold text-xl text-gray-900">David Klimeš</h3>
        <span class="block text-xs text-gray-500 mb-6">* 1982</span>
        <span class="block text-xs text-gray-400 italic">foto: Václav Vašků</span>
      </figcaption>
    </figure>
    <p class="max-w-lg  lg:mt-8 text-xl lg:text-2xl text-gray-700 leading-relaxed font-bold">
      Na Aktuálně.cz či v&nbsp;Českém rozhlasu Plus komentuji ekonomické a politické dění.<br />Na
      Fakultě sociálních věd UK vyučuji komunikaci.
    </p>

    <p class="max-w-2xl mt-6 lg:mt-12">
      Žurnalistiku a mediální studia jsem vystudoval na FSV&nbsp;UK v&nbsp;Praze, historii pak na
      Filozofické fakultě UK. V&nbsp;roce 2012 jsem FSV&nbsp;UK obhájil titul Ph.D za <Link
        href="https://www.cupress.cuni.cz/ink2_ext/index.jsp?include=podrobnosti&id=257866"
        >práci o&nbsp;infotainmentu</Link
      >.
    </p>

    <ul class="list-square list-inside mt-4 lg:mt-8 lg:ml-12 lg:leading-8">
      <li>
        <strong class="inline-block lg:w-28 text-gray-600 ">2008&mdash;2014</strong><span
          class="block mb-4 lg:mb-0 lg:inline lg:ml-4"
          >komentátor politiky a ekonomiky v&nbsp;deníku E15</span>
      </li>
      <li>
        <strong class="inline-block lg:w-28 text-gray-600">2014&mdash;2017</strong><span
          class="block mb-4 lg:mb-0 lg:inline lg:ml-4">komentátor v Hospodářských novinách</span>
      </li>
      <li>
        <strong class="inline-block lg:w-28 text-gray-600">2017&mdash;2019</strong><span
          class="block mb-4 lg:mb-0 lg:inline lg:ml-4">analytik týdeníku Ekonom</span>
      </li>
      <li>
        <strong class="inline-block lg:w-28 text-gray-600">od 2019</strong><span
          class="block mb-4 lg:mb-0 lg:inline lg:ml-4"
          >komentuji <Link
            href="https://www.aktualne.cz/autori/david-klimes/l~1ba93f023e3b11e8bacfac1f6b220ee8/"
            >na Aktuálně.cz</Link
          >, komentáři přispívám i
          <Link href="https://plus.rozhlas.cz/nazory-a-argumenty-6504158">na ČRo Plus</Link></span>
      </li>
    </ul>

    <p class="max-w-2xl mt-8">
      V&nbsp;roce 2010, 2014 a 2016 jsem byl nominován na Novinářskou cenu v&nbsp;kategorii
      komentáře. V&nbsp;roce 2018 <Link
        href="https://www.novinarskacena.cz/dlazdice/sin-slavy/novinarska-cena-2018/"
        >jsem ocenění získal</Link
      >. Obdržel jsem i novinářskou
      <Link href="https://cs.wikipedia.org/wiki/Cena_Karla_Havl%C3%AD%C4%8Dka_Borovsk%C3%A9ho"
        >Cenu Karla Havlíčka Borovského</Link> za rok 2018.
    </p>

    <p class="max-w-2xl mt-8">
      Na FSV&nbsp;UK vyučuji od roku 2014 <Link
        href="https://iksz.fsv.cuni.cz/en/contacts/people/59762032"
        >komunikaci, komentář a ekonomiku</Link
      >.
    </p>
    <p class="max-w-2xl mt-4">Žiju v Praze.</p>
  </article>
</PageTransition>
