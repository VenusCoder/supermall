<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load ="imgLoad">
    <div class="goods-info">
    <p>{{ product.title}}</p>
    <span class="price">{{ product.price }}</span>
    <span class="collect">{{ product.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'GoodsListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }  
  },
  computed: {
    showImage() {
      return this.product.image || this.product.show.img
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('itemImgLoad')
    },
    itemClick() {
      this.$router.push('/detail/' + this.product.iid)
    }
  }

}
</script>

<style scoped>
.goods-item {
  width: 48%;
}
.goods-item img{
  width: 100%;
}
.goods-info p {
  font-size: 1.1rem;
  text-overflow: ellipsis;
  white-space: nowrap; 
  overflow: hidden;
}
.price {
 color: var(--color-tint)
}

.goods-info .collect::before {
    content: '';
    width: 14px;
    height: 14px;
    display: inline-block;
    margin: 0 0.6rem;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>>
