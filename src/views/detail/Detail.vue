<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <h2>{{$route.query.iid}}</h2>
      <!-- <div>{{$store.state.cartList}}</div> -->
      <!-- <ul>
        <li v-for="item in $store.state.cartList">
          {{item}}
        </li>
      </ul> -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-params-info ref="params" :params-info="itemParams" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods-list="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"
  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
  import Scroll from "components/common/scroll/Scroll"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamsInfo from "./childComps/DetailParamsInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import GoodsList from "components/content/goods/GoodsList"
  import BackTop from "components/content/backTop/BackTop"
  import {debounce} from "components/common/utils/utils"
  import {itemListenerMixin, backTopMixin} from "components/common/utils/mixin"
  import { mapActions } from "vuex"
  // import Toast from "components/common/toast/Toast"
  
 
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      BackTop,
      // Toast,
      Scroll,

    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // message: '',
        // show: false
        
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // 1,保存传入的iid
      
      this.iid = this.$route.params.iid
      console.log(this.iid)
      //2,根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res)
        // 2,获取轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 3,获取商品信息
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 4,创建商铺信息的对象
        this.shopInfo = data.shopInfo
        // 5,保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 6,获取商品参数
        this.itemParams = data.itemParams
        // 7,获取评论信息
        if(data.rate.cRate !=0) {
          this.commentInfo = data.rate.list[0]
        }
      }) 
      // 3,获取推荐信息
      getRecommend().then(res => {
        this.recommends = res.data.list
      })


      // 4,给getThemeTopY赋值（对给this.themeTopY赋值的操作进行防抖）
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log('----')
        console.log(this.themeTopYs)
      }, 100)
    },
    mounted() {
      
        
    },

    methods: {
      ...mapActions(['addCart']),
      detailImageLoad() {
        // this.$refs.scroll.refresh()
        this.newRefresh()
        this.getThemeTopY()
         console.log('----')
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
        console.log(index)
      },
      contentScroll(position) {
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0; i < length-1; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
          
        }
        // 是否显示回到顶部
        this.listenerBackTop(position)
      },
      addToCart() {
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.realPrice
        product.iid = this.iid

        // 将商品添加到购物车
        // this.$store.commit('addCart', product)
        // this.$store.dispatch('addCart', product)
        this.addCart(product).then(res => {
        //   this.show = true
        //   this.message = res
        //   setTimeout(() => {
        //     this.show = false
        //     this.message = ''
        //   }, 1500)
        this.$toast.show(res, 1000)
        
        })
        

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        // })
      }
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background: #fff;
    height: 100vh;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background: #fff;
  }

  .content {
    height: calc(100% - 6rem);
   
  }

</style>>
