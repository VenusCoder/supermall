<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>
.nav-bar {
  display: flex;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}
.left, .right {
  width: 20%;
  
}
.center {
  flex: 1;
 
}

</style>