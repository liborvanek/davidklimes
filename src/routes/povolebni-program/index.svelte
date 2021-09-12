<script lang="ts">
  import PageTransition from '../../components/PageTransition.svelte';
  import Meta from '../../components/Meta.svelte';
  import Navigation from '../../components/PovolebniProgram/Navigation.svelte';
</script>

<svelte:head>
  <title>Povolební program – David Klimeš</title>
  <Meta
    title="Povolební program"
    description="Z volebních programů a předvolebních slibů politiků bychom se měli dozvědět, co čeká Česko po
      říjnových sněmovních volbách. Bohužel to příliš nejde." />
</svelte:head>

<PageTransition classes="max-w-screen-lg mx-auto">
  <h1
    class="mt-4 lg:mt-12 mb-8 lg:mb-16 origin-bottom-left transform -rotate-1 inline-block text-5xl sm:text-7xl xl:text-8xl leading-none font-bold bg-black bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-dark-gray-100 to-blue-1000 dark:to-dark-gray-200 pb-2">
    <span class="md:block">Povolební</span> <span class="">program</span>
  </h1>
  <!-- <div class="element">
    <img src="/urna.png" width="200" alt="" />
    <div class="topics">
      <span class="topic">daně</span>
      <span class="topic">výdaje</span>
      <span class="topic">pandemie</span>
      <span class="topic">střet zájmů</span>
      <span class="topic">plán obnovy</span>
      <span class="topic">tendr Dukovany</span>
      <span class="topic">dluhy</span>
    </div>
  </div> -->
  <div class="mb-8 lg:mb-20 space-y-6">
    <p class="perex xl:pr-32 mb-8 text-2xl leading-relaxed">
      Z volebních programů a předvolebních slibů politiků bychom se měli dozvědět, co čeká Česko po
      říjnových sněmovních volbách. Bohužel to příliš nejde.
    </p>
    <p class="text-xl leading-relaxed">
      V programech nelze najít hodnověrné řešení akutních problémů republiky, někdy jde rovnou o
      lži, které mají jen přilákat co nejvíce hlasů ve volbách. Vzniká tak toxická situace, kdy není
      možné před volbami vést racionální debatu o nejnaléhavějších problémech Česka, protože jejich
      popírání je pro politiky nejvýhodnější předvolební strategií. Popírání ovšem nic nevyřeší.
    </p>
    <p class="text-xl leading-relaxed">
      Zkusme proto místo pročítání nerealistických předvolebních programů sepsat na občanském
      základě reálný povolební program. Určit problémy není zas tak těžké, těžké je však se shodnout
      na řešení. V následujících kapitolách předkládám k debatě celou řadu bolavých míst republiky,
      některé jsou trvalky, jiné vznikly teprve nedávno.
    </p>
  </div>
  <Navigation />
</PageTransition>

<style>
  /* .element {
    float: right;
    margin-right: -10rem;
    width: 700px;
    height: 700px;
    shape-outside: circle();

    border-radius: 100%;
  }
  .element img {
    display: block;
    position: relative;
    left: 12rem;
    top: 5rem;
  }
  .topic {
    text-transform: uppercase;
    font-weight: 800;
    writing-mode: vertical-lr;
  }
  .perex {
    shape-outside: circle();
  } */
</style>
