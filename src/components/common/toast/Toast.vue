<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // },
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration) {
      
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
       
        this.isShow = false;
         this.message = '';
      }, duration);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -15%;
  margin-top: -15%;
  padding: 0.7rem 2rem;
  color: #333;
  background: #ddd;
  opacity: 0.5;
  z-index: 100;
}
</style>