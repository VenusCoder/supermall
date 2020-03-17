<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item" />
     
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import cartListItem from "./CartListItem"
export default {
  components: {
    Scroll,
    cartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 3.5rem - 2.5rem);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>