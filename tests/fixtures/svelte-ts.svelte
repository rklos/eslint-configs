<script lang="ts">
  let count: number = 0;
  const increment = (): void => { count += 1; };
</script>

<button on:click={increment}>
  Count: {count}
</button>

<style lang="scss">
  button {
    padding: 8px;
  }
</style>
