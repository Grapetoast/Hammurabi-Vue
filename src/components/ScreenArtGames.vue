<template>
  <div class="main">
    <h1 class="title">Screen Art Games</h1>
    <button class="back" v-on:click="$router.push('/')">Back</button>
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
    border-style: solid;
    background-color: transparent;
  }

  .title {
    text-align: center;
    color: #fff;
    width: 80%;
    font-size: 2.4em;
    margin-left: 10%;
    margin-top: 20px;
    font-family: 'Bungee', cursive;
    text-shadow: 2px 2px 1px #7071b5;
  }
  .back {
      background-color: transparent;
      color: #fff;
      font-size: 1.5em;
      font-family: 'Bungee', cursive;
      text-shadow: 2px 2px 1px #7071b5;
  }
</style>
