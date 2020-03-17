import {POP, NEW, SELL} from "./const";
import {debounce} from "./utils"
import BackTop from "components/content/backTop/BackTop"
import {BACKTOP_POSITION} from "components/common/utils/const"
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
    
  },
  mounted() {
    // this.$refs.scroll.refresh对这个函数进行防抖操作
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    // 对监听事件进行保存
    this.itemImgListener = () => {
      newRefresh()
    },
    // 监听图片加载完毕
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('混入内容')
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return{
      isShowBackTop: false
    }
    
  },
  methods: {
    listenerBackTop(position) {
      this.isShowBackTop = position.y < BACKTOP_POSITION
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
  }
}


export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
