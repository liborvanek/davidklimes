<script>
  export let href = '';
  export let classes = '';
</script>

<a
  {href}
  class="inline-block py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white visited:text-white hover:text-white text-lg font-bold no-underline uppercase focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-md transition-shadow {classes}"
  ><slot /></a>
