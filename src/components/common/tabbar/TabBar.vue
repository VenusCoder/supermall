<template>
  <div class="tab-bar">
    <slot></slot>

  </div>
</template>

<script>
export default {

}
</script>

<style>
.tab-bar {
  height: 3.5rem;
  background: #f5f5f5;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>