<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isCheckedAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      总价：<span>{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">
      去计算：({{ checkLength }})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"
  import { mapGetters } from "vuex"
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isCheckedAll() {
      if(this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if(this.isCheckedAll) {//全部选中
        return this.cartList.forEach(item => item.checked = false);
      } else{
        return this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isCheckedAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 2.5rem;
    color: #666;
    background: #eee;
    position: relative;
    bottom: 3rem;
    line-height: 2.5rem;
    display: flex;
  }
  .check-content {
    display: flex;
    align-items: center;
  }
  .check-button {
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.7rem;
    text-align: center;
    margin: 0 0.8rem;
  }
  .price {

    flex: 1;
  }
  .price span {
    color: var(--color-tint);
  }
  .calculate {
    width: 6rem;
    color: #fff;
    background: var(--color-tint);
    text-align: center;
  }
</style>