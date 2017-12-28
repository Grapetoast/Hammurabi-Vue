<template>
  <div class="main">
    <h1 class="title">Screen Art Games</h1>
    <div class="loginBox">
      <h1>Log - In</h1>
      <input class="topLogin" v-model="user.email" placeholder="example@address.net" type="email" required></input>
      <input class="bottomLogin" v-model="user.password" placeholder="*********" type="password" required></input>
      <div v-if="wrongInput">Wrong Username/Password</div>
      <button class="signIn" v-on:click="submit()">Sign - in</button>
    </div>
    <button class="back" v-on:click="$router.push('/')">Back</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'screenartgames',
  data () {
    return {
      user: {
        email: '',
        password: '',
        wrongInput: false
      }
    }
  },
  methods: {
    wrongInput: function () {
      this.wrongInput = true
    },
    submit () {
      axios.post('', {
        email: this.user.email.toLowerCase(),
        password: this.user.password
      })
        .then(response => {
          if (response.status !== 401) {
            this.user.token = response.data.token
            this.user.id = response.data.userId
            this.$emit('login', this.user)
          }
        })
        .catch(response => {
          console.log(response)
          this.wrong = true
        })
    }
  }
}
</script>

<style scoped lang="less">
  @backgroundColor: #7071b5;
  @accentColor: #29005d;
h1 {
  color: #29005d;
}
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
