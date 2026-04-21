<template>
  <div class="page">
    <NuxtPage />
  </div>
</template>

<style>
:root {
  color-scheme: dark;
}
html,
body {
  margin: 0;
  padding: 0;
  background: #0b0d12;
  color: #e6e8ee;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
  line-height: 1.55;
}
a {
  color: #7aa2ff;
}
h1 {
  margin-bottom: 0.25rem;
}
code {
  background: #1b1f2a;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-size: 0.9em;
}
.card {
  background: #141821;
  border: 1px solid #232936;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
}
button {
  background: #2b3550;
  color: #e6e8ee;
  border: 1px solid #3a4566;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font: inherit;
}
button:hover {
  background: #35416a;
}
</style>
