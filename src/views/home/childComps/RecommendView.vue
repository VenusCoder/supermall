<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
         <div>{{item.title}}</div>
      </a>
     
    </div>

  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }

}
</script>

<style>
  .recommend {
    width: 100%;
    display: flex;
    text-align: center;
    padding:1.2rem 0 1rem;
    border-bottom: 0.8rem solid #eee;
  }
  .recommend-item {
    flex: 1;

  }
  .recommend-item img {
    width:5rem;
    height:5rem;
    margin-bottom: 0.2rem;
  }
</style>