<template>
  <div class="main">
    <transition name="fade">
      <div class="menu" v-if="menu">
        <h1 class="title">Hammurabi 3000</h1>
        <button class="newGame" v-on:click="newGame">New Game</button>
        <button class="loadGame" v-on:click="loadMenuToggle">Load Game</button>
        <button class="options" v-on:click="optionsToggle">Options</button>
        <button class="screenArtGames" v-on:click="screenArtGames">Screen Art Games</button>
      </div>
    </transition>
    <transition name="fade">
      <div class="optionsPane" v-if="options">
        <h1 class="title">Options</h1>
        <button class="audio" v-if="audio" v-on:click="muteAudio">Mute Audio</button>
        <button class="audio" v-if="!audio" v-on:click="unmuteAudio">Unmute Audio</button>
        <button class="music" v-if="music" v-on:click="muteMusic">Mute Music</button>
        <button class="music" v-if="!music" v-on:click="unmuteMusic">Unmute Music</button>
        <button class="back" v-on:click="optionsToggle">Back</button>
      </div>
    </transition>
    <transition name="fade">
      <div class="loadMenu" v-if="loadMenu">
        <h1 class="title">Saves</h1>
        <button class="save" v-for="save in saves" v-on:click="loadGame(save)">{{save.name}}:{{save.time}}</button>
        <button class="back" v-on:click="loadMenuToggle">Back</button>
      </div>
    </transition>
    <transition name="fade">
      <div class="gameModeMenu" v-if="gameModeMenu">
        <h1 class="title">Game Mode</h1>
        <button class="3000" v-on:click="newGame(false)">Hammurabi 3000</button>
        <button class="classic" v-on:click="newGame(true)">Classic Hammurabi</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'gamemenu',
  props: ['audio', 'music', 'beaten'],
  data () {
    return {
      menu: true,
      options: false,
      loadMenu: false,
      gameModeMenu: false,
      saves: [{name: 'save1', time: '1122pm', classic: true}]
    }
  },
  methods: {
    newGame: function (classic) {
      if (this.beaten === true && this.gameModeMenu === false) {
        this.gameModeMenuToggle()
      }
      else if (classic === true || classic === false) {
        this.$emit('newGame', classic)
      }
      else {
        this.$emit('newGame')
      }
    },
    gameModeMenuToggle: function () {
      this.gameModeMenu = !this.gameModeMenu
      this.menu = !this.menu
    },
    loadGame: function (save) {
      let saveData = [{name: save.name, time: save.time, classic: save.classic}]
      this.$emit('loadGame', saveData)
    },
    loadMenuToggle: function () {
      this.loadMenu = !this.loadMenu
      this.menu = !this.menu
    },
    screenArtGames: function () {
      this.$router.push('/screenartgames')
    },
    muteAudio: function () {
      this.$emit('toggleAudio')
    },
    unmuteAudio: function () {
      this.$emit('toggleAudio')
    },
    muteMusic: function () {
      this.$emit('toggleMusic')
    },
    unmuteMusic: function () {
      this.$emit('toggleMusic')
    },
    optionsToggle: function () {
      this.options = !this.options
      this.menu = !this.menu
    }
  }
}
</script>

<style scoped lang="less">
  @backgroundColor: #7071b5;
  @accentColor: #29005d;
  .main {
    height: 100%;
    width: 100%;
  }

  .title {
    text-align: center;
    color: #fff;
    width: 100%;
    font-size: 2.4em;
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
  }

  .newGame {
    margin-top: 120px;
  }

  .gameModeMenu {
    margin-top: 120px;
  }

  .save {
    margin-top: 120px;
  }

  .audio {
    margin-top: 120px;
  }

  .music {

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

  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .16s;
  }

  .fade-enter-active {
    transition-delay: .16s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .switch-enter-active, .switch-leave-active {
    transition-property: opacity;
    transition-duration: .16s;
  }

  .switch-enter-active {
    transition-delay: .16s;
  }

  .switch-enter, .switch-leave-to {
    opacity: 0;
  }
</style>
