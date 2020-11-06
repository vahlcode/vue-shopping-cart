<template>
  <div class='product'>
    <div class='product-image'>
      <img
        :src='product.image_url'
        :alt='product.title'
        :title='product.title'
      />
    </div>
    <h3 class='product-title'>{{ product.title }}</h3>
    <h4 class='product-price'>From {{ product.price | formatCurrency(currency) }}</h4>
    <button @click='addToCart(product.id, product.price)'>Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: 'Products',
  props: {
    product: Object,
  },
  computed: {
    currency: function () {
      return this.$store.state.currency
    }
  },
  methods: {
    addToCart(id, price) {
      this.$store.dispatch('addToCart', {
        id:id,
        amount: 1,
        price: price
        })
    }
  },
  filters: {
    formatCurrency: function (value, currency) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
      })

      return formatter.format(value)
    }
  }
};
</script>

<style scoped>
.product {
  padding: 40px 10px;
  text-align: center;
  min-height: 50px;
}
.product > .product-image {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 10px;
}
.product > .product-image > img {
  max-height: 70%;
  object-fit: cover;
}
.product > .product-title {
  color: var(--dark-font-color);
  font-size: 13px;
  font-weight: 400;
  line-height: 25px;
  margin-bottom: 6px;
}
.product > .product-price {
  color: var(--dark-paragraph-color);
  font-size: 13px;
  font-weight: 400;
  line-height: 25px;
  margin-bottom: 19px;
}
.product > button {
  background: var(--primary-color);
  color: var(--theme-white-color);
  padding: 14px 11px;
  border: 0.5px solid #4b5548;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  width: 100%;
}
.product > button:hover {
  background: var(--button-hover-color);
}
@media only screen and (min-width: 768px) {
  .product {
  padding: 50px 30px;
  text-align: center;
  min-height: 50px;
}
.product > .product-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 10px;
}
.product > .product-image > img {
  max-height: 70%;
  object-fit: cover;
}
.product > .product-title {
  color: var(--dark-font-color);
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  margin-bottom: 6px;
}
.product > .product-price {
  color: var(--dark-paragraph-color);
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  margin-bottom: 19px;
}
.product > button {
  background: var(--primary-color);
  color: var(--theme-white-color);
  padding: 14px 11px;
  border: 0.5px solid #4b5548;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  width: 50%;
}
.product > button:hover {
  background: var(--button-hover-color);
}
}
</style>