<template>

  <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div class="detaction" :style="activeStyle"><slot name="item-text"></slot></div>
   </div>
 

</template>

<script>
export default {
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
        
    }
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemClick() {
      if(this.$route.path !==this.path){
        this.$router.replace(this.path)
      }
      
    }
  }

}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height:3.5rem;
}

.tab-bar-item img {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.5rem;
}
.detaction {
  font-size: 0.8rem;
}

</style>