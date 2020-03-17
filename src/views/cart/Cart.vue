<template>
  <div class="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
  
  <!-- 商品列表 -->
  <cart-list/>
  <!-- 商品汇总 -->
  <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartList from "./childComps/CartList"
  import CartBottomBar from "./childComps/CartBottomBar"
  import { mapGetters } from "vuex"
  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 两种方法
      // ...mapGetters(['cartList', 'cartLength'])
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .navbar {
    background: var(--color-tint);
    color: #fff;
  }
</style>