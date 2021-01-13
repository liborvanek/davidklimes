<script>
  export let size = 'md';
</script>

<h1
  class="origin-bottom-left transform -rotate-1 inline-block {size === 'lg'
    ? 'text-8xl leading-none'
    : 'text-6xl leading-normal'}  font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black to-blue-1000"
><slot /></h1>
