<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button {
    
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .check {
    background: #f30;
    border-color: #d3e;
  }
</style>