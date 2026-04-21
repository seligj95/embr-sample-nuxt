<script setup lang="ts">
// useAsyncData runs on the server during SSR, then its payload is serialized
// into the HTML so the client doesn't re-fetch on hydration. By reading
// `Date.now()` and `Math.random()` on the server *per request*, two curls
// should produce different values — that's the proof that Embr is running
// the Nitro Node server per request and not serving cached HTML.
const { data } = await useAsyncData("render-proof", () => {
  return Promise.resolve({
    renderedAt: new Date().toISOString(),
    nonce: Math.random().toString(36).slice(2, 10),
  });
});

// Client-hydration canary. If clicking the button increments the counter,
// Vue successfully hydrated the SSR tree in the browser.
const count = ref(0);
</script>

<template>
  <div>
    <h1>Embr × Nuxt 3</h1>
    <p>
      This page is rendered by Nuxt's Nitro Node server at request time.
      Refresh and watch the timestamp + nonce change — that's proof that Embr
      is running the Node.js runtime per request, not serving static HTML.
    </p>

    <section class="card">
      <h2>Request-time SSR</h2>
      <p>
        <strong>Rendered at:</strong> <code>{{ data?.renderedAt }}</code>
      </p>
      <p>
        <strong>Nonce:</strong> <code>{{ data?.nonce }}</code>
      </p>
    </section>

    <section class="card">
      <h2>Hydration canary</h2>
      <p>
        The counter below is interactive client-side state. If it increments
        when you click, Vue successfully hydrated the server-rendered tree.
      </p>
      <p>
        <button type="button" @click="count++">
          Clicked {{ count }} time{{ count === 1 ? "" : "s" }}
        </button>
      </p>
    </section>

    <section class="card">
      <h2>Explore</h2>
      <ul>
        <li>
          <a href="/api/health">/api/health</a> — Embr health check target
        </li>
      </ul>
    </section>
  </div>
</template>
