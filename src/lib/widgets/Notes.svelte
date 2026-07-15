<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let settings: { text: string };
  const dispatch = createEventDispatcher<{ change: typeof settings }>();

  let timer: ReturnType<typeof setTimeout>;
  function onInput(e: Event) {
    const value = (e.target as HTMLTextAreaElement).value;
    clearTimeout(timer);
    timer = setTimeout(() => dispatch('change', { text: value }), 400);
  }
</script>

<div class="w-notes">
  <textarea placeholder="Jot something down…" value={settings.text} on:input={onInput}></textarea>
</div>

<style lang="scss">
  .w-notes { width: 100%; height: 100%; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; }
  textarea {
    width: 100%; height: 100%; resize: none; border: none; background: transparent; color: var(--text);
    font: inherit; padding: 10px 12px; outline: none;
  }
</style>
