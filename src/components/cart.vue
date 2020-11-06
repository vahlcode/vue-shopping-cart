<template>
  <section :class='`cart ${showCart ? "show" : ""} ${products ? " has-products" : ""}`'>
    <div class='cart-overlay'></div>
    <div class='cart-inner'>
      <header class='cart-header'>
        <div class='draw-cart'>
          <button @click='closeCart'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 492.004 492.004'
              style='height: 15px; width: 10px; fill: rgb(43, 46, 43)'
            >
              <path
                d='M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z'
              ></path>
            </svg>
          </button>
        </div>
        <div class='cart-title'>
          <h3>YOUR CART</h3>
        </div>
      </header>
      <div class='currency-switch'>
        <select name='currency' id='currency' @change='updateCurrency'>
          <option
            v-for='currency in currencies'
            :key='currency'
            :value='currency'
          >
            {{ currency }}
          </option>
        </select>
      </div>
      <div v-if='products' class='cart-items'>
        <CartItem
          v-for='product of products'
          :key='product.id'
          :product='product'
        />
      </div>
      <div v-else class='no-items'>
        No items in the cart. Please add products.
      </div>
    </div>
    <div class='cart-footer'>
      <div class='heading-and-price'>
        <h4>Subtotal</h4>
        <div class='total-amou'>{{ subTotal | formatCurrency(defaultCurrency) }}</div>
      </div>
      <div class='actions'>
        <button class='one-time-purchase'>REVERT TO ONE TIME PURCHASE</button>
        <button type='submit' class='checkout'>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  </section>
</template>

<script>
import CartItem from './cart-item';

export default {
  components: {
    CartItem,
  },
  computed: {
    showCart: function () {
      return this.$store.state.cartOpen;
    },
    currencies: function () {
      return this.$store.state.currencies;
    },
    defaultCurrency: function () {
      return this.$store.state.currency
    },
    products: function () {
      return this.$store.state.products.filter(
        (val) => this.allIdInCart.indexOf(val.id) > -1
      );
    },
    cart: function () {
      return this.$store.state.cart;
    },
    allIdInCart: function () {
      return this.$store.getters.getAllIdInCart;
    },
    subTotal: function() {
      return this.$store.getters.getSubTotal
    },
  },
  created: function () {
    this.$store.dispatch('getCurrencies');
  },
  methods: {
    closeCart() {
      this.$store.commit('closeCart');
      document.querySelector('body').style.overflow = 'auto';
    },
    updateCurrency(e) {
      this.$store.dispatch('updateCurrency', e.target.value);
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
.cart {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  pointer-events: none;
  opacity: 0;
  transition: 0.5s;
}
.cart.show {
  pointer-events: all;
  opacity: 1;
}
.cart > .cart-overlay {
  display: none;
  width: 60%;
  height: 100%;
  background-color: #6e7b70;
  opacity: 0;
  transition: 0.5s;
}
.cart.show > .cart-overlay {
  opacity: 0.38;
}
.cart > .cart-inner {
  width: 100%;
  background: #f2f2ef;
  transition: 0.8s;
  transform: translateX(100%);
}
.cart.show > .cart-inner {
  transform: translateX(0%);
}
.cart.has-products > .cart-inner {
  padding-bottom: 200px;
}
.cart > .cart-inner > .cart-header {
  display: flex;
  align-items: center;
  padding: 20px 20px 0 20px;
}
.cart > .cart-inner > .cart-header > .draw-cart {
  display: flex;
  align-items: center;
  width: 30%;
}
.cart > .cart-inner > .cart-header > .draw-cart > button {
  border-radius: 50%;
  border: 1px solid rgb(198, 204, 199);
  background: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.cart > .cart-inner > .cart-header > .cart-title {
  display: flex;
  align-items: center;
  width: 70%;
}
.cart > .cart-inner > .cart-header > .cart-title > h3 {
  color: #696969;
  font-weight: 400;
  letter-spacing: 1px;
  font-style: normal;
  font-size: 10px;
  text-align: center;
  line-height: 1.2;
}
.cart > .cart-inner > .currency-switch {
  padding: 20px;
}
.cart > .cart-inner > .currency-switch > select {
  width: 30%;
  background: #fff
    url(//cdn.shopify.com/s/files/1/2960/5204/t/4/assets/select.png?5997012569058552034)
    no-repeat right center;
  background-size: 17px 5px;
  border-radius: 0;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 2em 10px 8px;
  -webkit-padding-end: 30px;
  -moz-appearance: none;
  appearance: none;
  text-indent: 0.01px;
  text-overflow: '';
}
.cart.show > .cart-inner > .cart-items {
  max-height: 85%;
  overflow: auto;
}
.cart > .cart-inner > .cart-items {
  padding: 0px 20px 20px 20px;
}
.cart > .cart-footer {
  background: #f2f2ef;
  padding: 25px 20px 20px 20px;
  border-top: 1px solid #d0d0d0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  transition: 0.8s;
  transform: translateX(100%);
}
.cart.show > .cart-footer {
  transform: translateX(0%);
}
.cart > .cart-footer > .heading-and-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.cart > .cart-footer > .actions {
  display: flex;
  flex-direction: column;
}
.cart > .cart-footer > .actions > .one-time-purchase {
  color: #2b2e2b;
  letter-spacing: 0.96px;
  border: 1px solid #2b2e2b;
  background-color: #fff;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  padding: 16px 20px;
  text-align: center;
  text-decoration: none;
  margin-bottom: 15px;
}
.cart > .cart-footer > .actions > .checkout {
  color: #fff;
  letter-spacing: 0.96px;
  border: 1px solid transparent;
  background-color: var(--primary-color);
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  padding: 16px 20px;
  text-align: center;
  text-decoration: none;
}
@media only screen and (min-width: 768px) {
  .cart > .cart-overlay {
    display: block;
}
.cart > .cart-inner {
  width: 40%;
  background: #f2f2ef;
  transition: 0.8s;
  transform: translateX(100%);
}
.cart > .cart-footer {
  padding: 25px 20px 20px 20px;
  border-top: 1px solid #d0d0d0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 40%;
}
}
</style>