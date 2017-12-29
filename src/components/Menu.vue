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
        <button class="save" v-for="save in saves" v-on:click="loadGame(save)">{{save.name}}/{{save.time}}</button>
        <button class="back" v-on:click="loadMenuToggle">Back</button>
      </div>
    </transition>
    <transition name="fade">
      <div class="gameModeMenu" v-if="gameModeMenu">
        <h1 class="title">Game Mode</h1>
        <button class="threeThousand" v-on:click="newGame(false)">Hammurabi 3000</button>
        <button class="classic" v-on:click="newGame(true)">Classic Hammurabi</button>
        <div class="slider">
          <div class="leftButton" v-on:click="sliderLeft">&#10094;</div>
          <div v-bind:class="easy">Easy</div>
          <div v-bind:class="normal">Normal</div>
          <div v-bind:class="hard">Hard</div>
          <div class="rightButton" v-on:click="sliderRight">&#10095;</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'gamemenu',
  props: ['audio', 'music', 'beaten', 'saves'],
  data () {
    return {
      menu: true,
      options: false,
      loadMenu: false,
      gameModeMenu: false,
      gameDifficulty: 'easy',
      difficultyDirection: ''
    }
  },
  computed: {
    easy: function () {
      return {
        hidden: (this.gameDifficulty === 'hard' && this.difficultyDirection === 'right') || (this.gameDifficulty === 'normal' && this.difficultyDirection === 'left'),
        centerSlider: this.gameDifficulty === 'easy' && this.difficultyDirection === '',
        leftSliderCenter: this.gameDifficulty === 'easy' && this.difficultyDirection === 'left',
        rightSliderCenter: this.gameDifficulty === 'easy' && this.difficultyDirection === 'right',
        centerSliderleft: this.gameDifficulty === 'normal' && this.difficultyDirection === 'right',
        centerSliderRight: this.gameDifficulty === 'hard' && this.difficultyDirection === 'left'
      }
    },
    normal: function () {
      return {
        hidden: (this.gameDifficulty === 'easy' && this.difficultyDirection === '') || (this.gameDifficulty === 'easy' && this.difficultyDirection === 'right') || (this.gameDifficulty === 'hard' && this.difficultyDirection === 'left'),
        leftSliderCenter: this.gameDifficulty === 'normal' && this.difficultyDirection === 'left',
        rightSliderCenter: this.gameDifficulty === 'normal' && this.difficultyDirection === 'right',
        centerSliderleft: this.gameDifficulty === 'hard' && this.difficultyDirection === 'right',
        centerSliderRight: this.gameDifficulty === 'easy' && this.difficultyDirection === 'left'
      }
    },
    hard: function () {
      return {
        hidden: (this.gameDifficulty === 'easy' && this.difficultyDirection === '') || (this.gameDifficulty === 'normal' && this.difficultyDirection === 'right') || (this.gameDifficulty === 'easy' && this.difficultyDirection === 'left'),
        leftSliderCenter: this.gameDifficulty === 'hard' && this.difficultyDirection === 'left',
        rightSliderCenter: this.gameDifficulty === 'hard' && this.difficultyDirection === 'right',
        centerSliderleft: this.gameDifficulty === 'easy' && this.difficultyDirection === 'right',
        centerSliderRight: this.gameDifficulty === 'normal' && this.difficultyDirection === 'left'
      }
    }
  },
  methods: {
    newGame: function (classic) {
      if (this.beaten === true && this.gameModeMenu === false) {
        this.gameModeMenuToggle()
      }
      else if (classic === true || classic === false) {
        let x = [{classic: classic, difficulty: this.gameDifficulty}]
        this.$emit('newGame', x)
      }
      else {
        this.$emit('newGame', [{difficulty: this.gameDifficulty}])
      }
    },
    gameModeMenuToggle: function () {
      this.gameModeMenu = !this.gameModeMenu
      this.menu = !this.menu
    },
    loadGame: function (gameData) {
      let saveData = [{name: gameData.name, time: gameData.time, classic: gameData.classic, gameDifficulty: gameData.gameDifficulty, population: gameData.population, land: gameData.land, store: gameData.store, year: gameData.year, starved: gameData.starved, starvedTotal: gameData.starvedTotal, rats: gameData.rats, landRate: gameData.landRate, immigrants: gameData.immigrants, bushelsPerAcre: gameData.bushelsPerAcre, harvest: gameData.harvest, plague: gameData.plague}]
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
    },
    sliderLeft: function () {
      this.difficultyDirection = 'left'
      if (this.gameDifficulty === 'easy') {
        this.gameDifficulty = 'hard'
      }
      else if (this.gameDifficulty === 'normal') {
        this.gameDifficulty = 'easy'
      }
      else if (this.gameDifficulty === 'hard') {
        this.gameDifficulty = 'normal'
      }
    },
    sliderRight: function () {
      this.difficultyDirection = 'right'
      if (this.gameDifficulty === 'easy') {
        this.gameDifficulty = 'normal'
      }
      else if (this.gameDifficulty === 'normal') {
        this.gameDifficulty = 'hard'
      }
      else if (this.gameDifficulty === 'hard') {
        this.gameDifficulty = 'easy'
      }
    }
  }
}
</script>

<style scoped lang="less">
  @backgroundColor: #78138A;
  @accentColor: #29005d;
  .main {
    height: 100%;
    width: 100%;
    font-family: 'Bungee', cursive;
    text-shadow: 2px 2px 1px #78138A;
  }

  .title {
    text-align: center;
    color: #fff;
    width: 100%;
    font-size: 2em;
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    text-shadow: 2px 2px 2px #78138A;
  }

  .newGame {
    margin-top: 120px;
    background-color: transparent;
    color: #fff;
  }
  .loadGame {
    background-color: transparent;
    color: #fff;
  }
  .options {
    background-color: transparent;
    color: #fff;
  }
  .screenArtGames {
    background-color: transparent;
    color: #fff;
    font-size: 1.2em;
  }
  .gameModeMenu {
    margin-top: 120px;
    color: #fff;
  }

  .save:first-of-type {
    margin-top: 120px;
    color: #fff;
  }

  .audio {
    margin-top: 120px;
    color: #fff;
  }

  .music {
    background-color: transparent;
    color: #fff;
    font-size: 1.5em;
  }
  .threeThousand {
    background-color: transparent;
    color: #fff;
  }
  .classic {
    background-color: transparent;
    color: #fff;
    font-size: 1.2em;
  }
  .audio {
    background-color: transparent;
    color: #fff;
    font-size: 1.5em;
  }
  .back {
    margin-top: 120px;
    background-color: transparent;
    color: #fff;
    font-size: 1.5em;
  }
  .save {
    background-color: transparent;
    color: #fff;
    font-size: 1.5em;
  }
  button {
    text-align: center;
    width: 80%;
    height: 80px;
    line-height: 80px;
    font-size: 1.5em;
    margin-left: 10%;
    margin-top: 20px;
    border-style: solid;
    border-radius: 8px;
    text-shadow: 2px 2px 1px #78138A;
    -webkit-box-shadow: 0 0 5px 1px #78138A, 0 0 5px 1px #78138A inset;
    box-shadow: 0 0 5px 3px #78138A, 0 0 5px 3px #78138A inset;
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

  .slider {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 80px;
    width: 80%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    margin-left: 10%;
    margin-top: 90px;
    border-radius: 14px;
    font-size: 1.4em;
    background-color: transparent;
  }

  .leftButton {
    grid-column: 1;
    grid-row: 1;
    z-index: 3;
    font-size: 2em;
  }

  .rightButton {
    grid-column: 5;
    grid-row: 1;
    z-index: 3;
    font-size: 2em;
  }

  .centerSlider {
    grid-column: 3;
    grid-row: 1;

  }
  .hidden {
    display: none;
  }

  @keyframes leftSlideCenter {
    0% {grid-column: 2; opacity: 0; grid-row: 1;}
    100% {grid-column: 3; opacity: 1; grid-row: 1;}
  }

  .leftSliderCenter {
    animation-name: leftSlideCenter;
    animation-duration: .8s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  @keyframes rightSlideCenter {
    0% {grid-column: 4; opacity: 0; grid-row: 1;}
    100% {grid-column: 3; opacity: 1; grid-row: 1;}
  }

  .rightSliderCenter {
    animation-name: rightSlideCenter;
    animation-duration: .8s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  @keyframes centerSlideLeft {
    0% {grid-column: 3; opacity: 1; grid-row: 1;}
    100% {grid-column: 2; opacity: 0; grid-row: 1;}
  }

  .centerSliderleft {
    animation-name: centerSlideLeft;
    animation-duration: .8s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  @keyframes centerSlideRight {
    0% {grid-column: 3; opacity: 1; grid-row: 1;}
    100% {grid-column: 4; opacity: 0; grid-row: 1;}
  }

  .centerSliderRight {
    animation-name: centerSlideRight;
    animation-duration: .8s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

</style>
