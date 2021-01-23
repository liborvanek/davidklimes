<script lang="ts">
  import PageTransition from '../components/PageTransition.svelte';
</script>

<svelte:head>
  <title>O mně | David Klimeš</title>
</svelte:head>

<PageTransition>
  <article class="relative leading-7">
    <figure class="mb-16 ml-32 float-right transform rotate-1">
      <picture>
        <source srcset="david-klimes.webp" type="image/webp" />
        <img src="david-klimes.jpg" alt="David Klimeš" width="350" height="350" />
      </picture>
      <figcaption class="mt-8 text-center">
        <h3 class="font-bold text-xl text-gray-900">David Klimeš</h3>
        <span class="text-xs text-gray-400 italic">foto: Václav Vašků</span>
      </figcaption>
    </figure>
    <p class="max-w-lg mt-8 text-2xl text-gray-700 leading-relaxed font-bold">
      Na Aktuálně.cz či v&nbsp;Českém rozhlasu Plus komentuji ekonomické a politické dění.<br />Na
      Fakultě sociálních věd UK vyučuji komunikaci.
    </p>

    <p class="max-w-2xl mt-12">
      Žurnalistiku a mediální studia jsem vystudoval na FSV&nbsp;UK v&nbsp;Praze, historii pak na
      Filozofické fakultě UK. V&nbsp;roce 2012 jsem FSV&nbsp;UK obhájil titul Ph.D za <a href=""
        >práci o&nbsp;infotainmentu</a
      >.
    </p>

    <ul class="list-square mt-8 ml-12 leading-8">
      <li>
        <strong class="text-gray-600">2008&mdash;2014</strong><span class="ml-4"
          >komentátor politiky a ekonomiky v&nbsp;deníku E15</span>
      </li>
      <li>
        <strong class="text-gray-600">2014&mdash;2017</strong><span class="ml-4"
          >komentátor v Hospodářských novinách</span>
      </li>
      <li>
        <strong class="text-gray-600">2017&mdash;2019</strong><span class="ml-4"
          >analytik týdeníku Ekonom</span>
      </li>
      <li>
        <strong class="text-gray-600">od 2019</strong><span class="ml-4"
          >komentuji <a
            href="https://www.aktualne.cz/autori/david-klimes/l~1ba93f023e3b11e8bacfac1f6b220ee8/"
            >na Aktuálně.cz</a
          >, komentáři přispívám i
          <a href="https://plus.rozhlas.cz/nazory-a-argumenty-6504158">na ČRo Plus</a></span>
      </li>
    </ul>

    <p class="max-w-2xl mt-8">
      V&nbsp;roce 2010, 2014 a 2016 jsem byl nominován na Novinářskou cenu v&nbsp;kategorii
      komentáře. V&nbsp;roce 2018 <a
        href="https://www.novinarskacena.cz/dlazdice/sin-slavy/novinarska-cena-2018/"
        >jsem ocenění získal</a
      >. Obdržel jsem i novinářskou
      <a href="https://cs.wikipedia.org/wiki/Cena_Karla_Havl%C3%AD%C4%8Dka_Borovsk%C3%A9ho"
        >Cenu Karla Havlíčka Borovského</a> za rok 2018.
    </p>

    <p class="max-w-2xl mt-8">
      Na FSV&nbsp;UK vyučuji od roku 2014 <a
        href="https://iksz.fsv.cuni.cz/en/contacts/people/59762032"
        >komunikaci, komentář a ekonomiku</a
      >.
    </p>
  </article>
</PageTransition>
