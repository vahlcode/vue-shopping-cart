<template>
  <section class='products'>
    <Product v-for='product in products' :key='product.id' :product='product' />
  </section>
</template>

<script>
import Product from './product';

export default {
  components: {
    Product,
  },
  computed: {
    products: function () {
      return this.$store.state.products
    },
  },
  created: function() {
    this.$store.dispatch('getProducts')
  },
};
</script>

<style scoped>
.products {
  background: #e2e6e3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 50px 16px;
  min-height: 60vh;
}
@media only screen and (min-width: 768px) {
  .products {
    background: #e2e6e3;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
    padding: 50px;
  }
}
</style>