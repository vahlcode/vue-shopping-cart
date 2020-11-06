<template>
  <section class='hero'>
    <div class='intro'>
      <h1>All Products</h1>
      <p>A 360° look at Lumin</p>
    </div>
    <div class='filter'>
      <select
        name='filter'
        id='filter'
        disabled='disabled'
        placeholder='Filter By'
      >
        <option value=''>Filter By</option>
      </select>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
};
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 16px 30px 16px;
  background: var(--theme-white-color);
}
.hero > .intro {
  width: 100%;
}
.hero > .intro > h1 {
  font-family: 'Playfair Display';
  font-weight: 500;
  font-size: 48px;
  color: var(--dark-font-color);
  margin-bottom: 16px;
}
.hero > .intro > p {
  font-size: 16px;
  color: var(--dark-font-color);
  letter-spacing: 0.03px;
  margin-bottom: 36px;
}
.hero > .filter {
  width: 100%;
}
.hero > .filter > select {
  padding: 20px;
  border: 1px solid var(--border-color);
  color: var(--dark-font-color);
  cursor: pointer;
  margin-bottom: 35px;
  width: 100%;
}

@media only screen and (min-width: 768px) {
  .hero {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 70px 80px;
    background: var(--theme-white-color);
  }
  .hero > .intro {
    margin-bottom: 0;
  }
.hero > .filter {
  width: 30%;
}
}
</style>