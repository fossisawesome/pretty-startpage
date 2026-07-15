<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let settings: { city: string; units: 'metric' | 'imperial' };
  const dispatch = createEventDispatcher<{ change: typeof settings }>();
  function emit() { dispatch('change', settings); }
</script>

<div class="form-group">
  <label for="city">City</label>
  <input id="city" type="text" bind:value={settings.city} on:change={emit} placeholder="London, New York, Tokyo…" />
</div>
<div class="form-group">
  <label for="units">Units</label>
  <select id="units" bind:value={settings.units} on:change={emit}>
    <option value="metric">Metric (°C)</option>
    <option value="imperial">Imperial (°F)</option>
  </select>
</div>
