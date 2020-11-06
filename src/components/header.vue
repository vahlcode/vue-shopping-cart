<template>
  <header>
    <div class='branding'>
      <img src='../assets/logo.png' alt='' />
    </div>
    <div class='header-row'>
      <div class='menu'>
        <ul>
          <li>
            <a href=''>Shop</a>
          </li>
          <li>
            <a href=''>Help</a>
          </li>
          <li>
            <a href=''>Blog</a>
          </li>
        </ul>
      </div>
      <div class='account-cart'>
        <ul>
          <li>
            <a href=''>Account</a>
          </li>
          <li>
            <button @click='openCart'>
              <img src='../assets/cart.png' alt='' />
              <span>{{ totalInCart }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    totalInCart: function () {
      return this.$store.getters.getTotalItemsInCart;
    },
  },
  methods: {
    openCart() {
      this.$store.commit('openCart');
      document.querySelector('body').style.overflow = 'hidden';
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  padding: 18px 20px 12px;
  background: var(--theme-white-color);
  box-shadow: 0 2px 3px -3px grey;
}
header .menu,
header .branding {
  display: none;
}
header > .branding {
  width: 14%;
  margin-right: 50px;
}
header > .header-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}
header ul {
  display: flex;
  align-items: center;
}
header ul > li {
  list-style: none;
  margin-right: 20px;
}
header ul > li:last-of-type {
  margin-right: 0;
}
header ul > li:last-of-type {
  margin-right: 0;
}
header ul > li > a {
  color: var(--primary-color);
}
header ul > li > button {
  display: flex;
  align-items: flex-start;
  background: none;
  border: none;
  padding: 0;
  position: relative;
}
header ul > li > button > img {
  width: 50%;
}
header ul > li > button > span {
  display: inline-block;
  font-size: 16px;
  margin-top: -6px;
}
@media only screen and (min-width: 768px) {
  header {
    padding: 5px 40px;
  }
  header .menu,
  header .branding {
    display: block;
  }
  header > .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 79%;
  }
}
</style>