<template>
  <div class="main">
    <h1 class="title">Screen Art Games</h1>
    <button v-on:click="$router.push('/')">Back</button>
  </div>
</template>

<script>
export default {
  name: 'screenartgames',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  @backgroundColor: #7071b5;
  @accentColor: #29005d;

  button {
    text-align: center;
    width: 80%;
    height: 80px;
    line-height: 80px;
    font-size: 1.5em;
    margin-left: 10%;
    margin-top: 20px;
    border-radius: 14px;
    background-color: @backgroundColor;
  }

  .title {
    text-align: center;
    color: #fff;
    width: 80%;
    font-size: 2.4em;
    margin-left: 10%;
    margin-top: 20px;
  }
</style>
