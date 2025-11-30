<template>
  <header class="julekalender-header">
    <h2>UNIL Forretningsdrifts</h2>
    <h1>JULEKALENDER</h1>
  </header>
</template>

<script setup>

</script>

<style scoped>
.julekalender-header {
  background: transparent;
  color: #F9F3E9;
  text-align: center;
  padding: 3rem 1rem;
  border-radius: 12px;
  /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); */
  position: relative;
  overflow: visible;
  font-family: 'Baskerville', sans-serif;
  min-height: 200px;
}

.julekalender-header h1 {
  /* font-size: 3rem; */
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  position: relative;
  z-index: 2;
}

@media (max-width: 600px) {
  .julekalender-header {
    padding: 3.0rem 0.5rem;
    height: auto;
  }

  .julekalender-header h1 {
    font-size: 2.2rem;
  }

  .julekalender-header h2 {
    font-size: 1.8rem;
  }
}
</style>


