<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app" class="main">
    <transition name="fade">
      <router-view v-on:newGame="newGame" v-on:loadGame="loadGame" v-on:toggleAudio="toggleAudio" v-on:toggleMusic="toggleMusic" :beaten="beaten" :audio="audio" :music="music" :classic="classic" :game="game" :difficulty="gameDifficulty"/>
    </transition>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      beaten: true,
      audio: true,
      music: true,
      classic: false,
      gameDifficulty: 'easy',
      game: []
    }
  },
  methods: {
    newGame: function (x) {
      if (x[0].classic === true) {
        this.classic = true
      }
      else {
        this.classic = false
      }
      if (x[0].difficulty === 'easy' || x[0].difficulty === 'normal' || x[0].difficulty === 'hard') {
        this.gameDifficulty = x[0].difficulty
      }
      console.log(this.classic + this.gameDifficulty)
      console.log(x)
      this.$router.push('/game')
    },
    loadGame: function (game) {
      if (game !== null) {
        this.game = game
        this.classic = game[0].classic
        this.gameDifficulty = game[0].difficulty
      }
      this.$router.push('/game')
    },
    toggleAudio: function () {
      this.audio = !this.audio
    },
    toggleMusic: function () {
      this.music = !this.music
    }
  }
}
</script>

<style scoped lang="less">
  .main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('./assets/BackgroundMobile.png');
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
