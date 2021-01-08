<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <!-- :key="$route.fullPath" router-link跳转当前页面内容不刷新问题 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive"
      :key="$route.fullPath"
    ></router-view>
  </div>
</template>

<style lang="scss">
@import url('./styles/reset.css');

</style>
