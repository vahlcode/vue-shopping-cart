<template>
  <div class='product'>
    <div class='product-details'>
      <h3 class='product-title'>{{ product.title }}</h3>
      <div class='price-and-actions'>
        <div class='cart-actions'>
          <button @click='dec'>-</button>
          <span>{{ amount }}</span>
          <button @click='inc'>+</button>
        </div>
        <div class='product-price'>
          <h4>From {{ product.price | formatCurrency(currency) }}</h4>
        </div>
      </div>
    </div>
    <div class='product-image'>
      <img
        :src='product.image_url'
        :alt='product.title'
        :title='product.title'
      />
    </div>
    <button @click='remove' class='remove-item'>X</button>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    product: Object,
  },
  computed: {
    amount: function () {
      return this.$store.getters.getItemAmountInCart(this.product.id);
    },
    currency: function () {
      return this.$store.state.currency
    },
  },
  methods: {
    remove: function () {
      this.$store.dispatch('removeItem', this.product.id);
    },
    inc: function () {
      this.$store.dispatch('increaseItemSize', this.product.id);
    },
    dec: function () {
      this.$store.dispatch('reduceItemSize', this.product.id);
    },
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
  },
};
</script>

<style scoped>
.product {
  display: flex;
  position: relative;
  margin-bottom: 20px;
  background: #fff;
  min-height: 150px;
}
.product > .product-details {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 15px 13px 13px 21px;
  color: #1e2d2b;
  width: 65%;
  line-height: 18px;
  font-size: 10px;
  padding: 15px 13px 13px 21px;
  letter-spacing: 0.02px;
  width: 65%;
}
.product > .product-details > .product-title {
  color: #1e2d2b;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.03px;
  padding: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}
.product > .product-details > .price-and-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product > .product-details > .price-and-actions > .cart-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.5px solid #bcbcbc;
  padding: 7px;
  width: 76px;
  
  color: #1e2d2b;
}
.product > .product-details > .price-and-actions > .cart-actions > button {
  background: none;
  font-size: 15px;
  border: none;
  cursor: pointer;
}
.product > .product-details > .price-and-actions > .cart-actions > span {
  font-size: 13px;
}
.product > .product-details > .price-and-actions > .product-price {
  font-size: 13px;
  letter-spacing: 0.03px;
  color: #1e2d2b;
  font-weight: 400;
}
.product > .product-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35%;
}
.product > .product-image > img {
  width: 30%;
  height: auto;
}
.product > .product-details > .product-title {
  color: var(--dark-font-color);
  font-size: 13px;
  line-height: 25px;
  margin-bottom: 6px;
}
.product > .product-details > .product-price>h4 {
  color: var(--dark-paragraph-color);
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  margin-bottom: 19px;
}
.product > .remove-item {
  background: none;
  font-size: 20px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>