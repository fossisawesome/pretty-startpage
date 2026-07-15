<script lang="ts">
  import { onDestroy } from 'svelte';

  export let settings: { city: string; units: 'metric' | 'imperial' };

  type State =
    | { kind: 'loading' }
    | { kind: 'error'; message: string }
    | { kind: 'ready'; temp: number; desc: string; city: string; country: string; wind: number };

  let state: State = { kind: 'loading' };
  let controller: AbortController | null = null;

  const CODE_MAP: Record<number, string> = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Icy fog', 51: 'Light drizzle', 61: 'Light rain',
    63: 'Moderate rain', 65: 'Heavy rain', 71: 'Light snow', 73: 'Moderate snow',
    75: 'Heavy snow', 80: 'Rain showers', 81: 'Moderate showers', 82: 'Heavy showers',
    95: 'Thunderstorm', 99: 'Thunderstorm with hail',
  };

  async function load() {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;
    state = { kind: 'loading' };
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(settings.city)}&count=1`, { signal });
      if (!geoRes.ok) throw new Error('geocoding failed');
      const geo = await geoRes.json();
      if (!geo.results?.length) {
        state = { kind: 'error', message: `City not found: ${settings.city}` };
        return;
      }
      const { latitude, longitude, name, country } = geo.results[0];
      const unit = settings.units === 'imperial' ? 'fahrenheit' : 'celsius';
      const wxRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=${unit}&wind_speed_unit=kmh`, { signal });
      if (!wxRes.ok) throw new Error('weather fetch failed');
      const wx = await wxRes.json();
      const cw = wx.current_weather;
      state = {
        kind: 'ready',
        temp: Math.round(cw.temperature),
        desc: CODE_MAP[cw.weathercode] ?? 'Unknown',
        city: name,
        country,
        wind: cw.windspeed,
      };
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        state = { kind: 'error', message: 'Unable to load weather' };
      }
    }
  }

  $: settings, load();
  onDestroy(() => controller?.abort());
</script>

<div class="w-weather">
  {#if state.kind === 'loading'}
    <div class="w-weather-loading">Loading…</div>
  {:else if state.kind === 'error'}
    <div class="w-weather-error">{state.message}</div>
  {:else}
    <div class="w-weather-inner">
      <div class="w-weather-info">
        <div class="w-weather-temp">{state.temp}{settings.units === 'imperial' ? '°F' : '°C'}</div>
        <div class="w-weather-desc">{state.desc}</div>
        <div class="w-weather-city">{state.city}, {state.country}</div>
        <div class="w-weather-wind">Wind {state.wind} km/h</div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .w-weather {
    width: 100%; height: 100%; background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 12px 16px;
  }
  .w-weather-inner { display: flex; align-items: center; gap: 16px; width: 100%; }
  .w-weather-info { display: flex; flex-direction: column; gap: 2px; }
  .w-weather-temp { font-size: 32px; font-weight: 700; color: var(--text); line-height: 1; }
  .w-weather-desc { font-size: 13px; color: var(--accent2); }
  .w-weather-city { font-size: 12px; color: var(--subtext); }
  .w-weather-wind { font-size: 11px; color: var(--subtext); }
  .w-weather-loading, .w-weather-error { font-size: 13px; color: var(--subtext); }
  .w-weather-error { color: var(--red); }
</style>
