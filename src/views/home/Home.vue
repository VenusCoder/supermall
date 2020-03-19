<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control  
    :titles="['流行', '新款', '精选']" 
    @tabClick="tabClick" 
    ref ="topTabControl" 
    class="tab-control" 
    v-show="isTabFixed"></tab-control>
    <scroll class="wraper" ref="scroll" :probe-type ="3" @scroll="contentScroll" :pull-up-load ="true" @pullingUp ="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref ="tabControl2" v-show="!isTabFixed"></tab-control>
      <goods-list :goods-list="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import BackTop from "components/content/backTop/BackTop"
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

import { getHomeMultidata, getHomeGoods } from "network/home";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { debounce } from "components/common/utils/utils"
import { itemListenerMixin, backTopMixin } from "components/common/utils/mixin"
import { BACKTOP_POSITION } from "components/common/utils/const"

export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      saveY: 0,
      isTabFixed: false
      // result: null
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
    console.log(this.saveY)
  },
  deactivated() {
    // 1,记录下拉位置，进行保存y值
    this.saveY = this.$refs.scroll.getCurrentY()
    console.log(this.saveY)
    
    // 2,取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();
    //  请求商品数据
    this.getHomeGoods("pop", 1);
    this.getHomeGoods("new", 1);
    this.getHomeGoods("sell", 1); 
  },
  mounted() {
    // 手动代码点击一次
    this.tabClick(0)
  },
  methods: {
    /*发送点击事件 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.topTabControl.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      //判断backTop是否显示
      this.listenerBackTop(position)
      // 判断tabcontrol是否吸顶
      
      this.isTabFixed = (-position.y) >= this.tabOffsetTop
      
    },

    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh()
    },
    swiperImgLoad() {
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
       console.log(this.tabOffsetTop)
    },
   
    /*发送网络请求的事件 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list,
          this.recommends = res.data.recommend.list;
        // console.log(JSON.stringify(res));
        // this.result = res
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, 1).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp()
      });
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  /* position: relative; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
 
}

.wraper {
  height: calc(100% - 3.5rem);
  
  overflow: hidden;
  /* position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0; */
}

.tab-control {
  position: relative;
}
</style>