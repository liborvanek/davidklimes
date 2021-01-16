<script>
  import Button from './Button.svelte';

  let formState = {
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  };

  function onSubmit() {
    formState.isSubmitting = true;
    setTimeout(() => {
      formState.isSubmitting = false;
      formState.isSuccess = true;
    }, 2000);
  }
</script>

<div>
  <h2 class="text-3xl font-bold text-gray-700">newsletter o souvislostech v byznysu a politice</h2>
  <p class=" mt-3 text-gray-500">
    každé pondělí <span class="text-blue-500">&bull;</span> jen to podstatné
    <span class="text-blue-500">&bull;</span> kdykoliv se můžete odhlásit
  </p>
  <form class="mt-12 flex w-2/3" on:submit|preventDefault={onSubmit}>
    <input
      type="email"
      placeholder="váš e-mail"
      class="w-full py-5 px-6 bg-brown-100 inline-block appearance-none placeholder-gray-500 rounded-md text-gray-700 leading-5 focus:outline-none border border-brown-100 focus:border-blue-500 transition-colors" />
    <Button {...formState} />
  </form>
  <p class="mt-4 ml-6 text-sm">
    <a href="" class="text-blue-500 underline">archiv všech čísel</a>
    <span class="text-gray-400">&bull;</span>
    <a href="" class="text-blue-500 underline">spravovat členství</a>
  </p>
</div>
