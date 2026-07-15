<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import quotes from '../quotes.json';

  export let settings: { index: number };
  const dispatch = createEventDispatcher<{ change: typeof settings }>();

  $: quote = quotes[settings.index % quotes.length] ?? quotes[0];

  function next() {
    const newIndex = Math.floor(Math.random() * quotes.length);
    dispatch('change', { index: newIndex });
  }
</script>

<div class="w-quote">
  <p class="w-quote-text">"{quote.text}"</p>
  <p class="w-quote-author">— {quote.author}</p>
  <button class="btn-ghost w-quote-next" on:click={next}>Next</button>
</div>

<style lang="scss">
  .w-quote {
    width: 100%; height: 100%; background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; padding: 14px 16px; display: flex; flex-direction: column;
    justify-content: center; gap: 6px; overflow: auto;
  }
  .w-quote-text { color: var(--text); font-size: 14px; font-style: italic; margin: 0; }
  .w-quote-author { color: var(--subtext); font-size: 12px; margin: 0; }
  .w-quote-next { align-self: flex-start; padding: 4px 10px; font-size: 12px; margin-top: 4px; }
</style>
