<template>
  <div ref="wraper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //1,创建BScroll对象
    this.scroll = new BScroll(this.$refs.wraper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })
    //2，监听滚动位置
    if(this.probeType == 2 || this.probeType ==3) {
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
    }
    //3,上拉加载更多
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
    }
    
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('----')
      this.scroll && this.scroll.refresh()
    },
    getCurrentY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>

<style scoped>
</style>