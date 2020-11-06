<template>
  <div id='app'>
    <Header />
    <Hero />
    <Products />
    <Cart />
  </div>
</template>

<script>
import Header from './components/header.vue'
import Hero from './components/hero.vue'
import Products from './components/products'
import Cart from './components/cart'

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    Products,
    Cart
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Signika:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
:root {
  --primary-color: #4b5548;
  --theme-white-color: #fcfcf9;
  --dark-font-color: #2B2E2B;
  --dark-paragraph-color: #0B0C0D;
  --border-color: #CDD1CE;
  --button-hover-color: #2B2E2B;
}
::-webkit-scrollbar{
  width: 6px;
}
::-webkit-scrollbar-thumb {
  width: 6px;
  background: var(--primary-color);
}
a {
  text-decoration: none;
}
body {
  font-family: 'Signika', sans-serif;
  font-size: 14px;
  background-color: #f5f5f4;
  color: #1e2d2b;
  -webkit-tap-highlight-color: transparent;
}
button{
  outline: none;
  cursor: pointer;
}
img {
  max-width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
