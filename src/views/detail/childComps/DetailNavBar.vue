<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" >
        <span v-for="(item, index) in titles" class="title" :class="{active: index === currentIndex}" @click="titleClick(index)"> {{ item }} </span>
       

      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  export default {
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 1rem;
    margin: 0 0.3rem;
  }
  .active {
    color: var(--color-high-text)
  }
  .back {
    margin-top: 0.3rem;
  }
</style>