<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <router-view   v-if="$route.meta.transition"/>
    </transition>
    <transition name="s" mode="out-in">
      <router-view   v-if="!$route.meta.transition"/>
    </transition>
  </div>
</template>



<style lang="stylus">
// TODO: app.vue生命周期钩子无效
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
  .slide-enter, .slide-leave-to
    transform translateY(100%)

  .slide-enter-to, .slide-leave
    transform translateY(0)

  .slide-enter-active, .slide-leave-active
    transition all 0.2s linear
</style>
