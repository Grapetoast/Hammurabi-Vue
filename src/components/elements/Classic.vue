<template>
  <div class="main">
    <div class="report" v-if="report">
      <h1 class="title">Classic Hammurabi</h1>
      Hammurabi: I beg to report to you,
      In Year {{this.year}}, {{this.starved}} people starved.
      {{this.immigrants}} people came to the city.
      The city population is now {{this.population}}.
      The city now owns {{this.land}} acres.
      You harvested {{this.bushelsPerAcre}} bushels per acre.
      Rats ate {{this.rats}} bushels.
      You now have {{this.store}} bushels in store.
      Land is trading at {{this.landRate}} bushels per acre.
      <button class="endReport" v-on:click="report = false">Next</button>
    </div>
    <div class="game" v-if="!report && !saveMenu">
      <h1 class="title">Classic Hammurabi</h1>
      <div class="resourcesPane">
        <div class="bushels">{{this.activeStore}} Bushels</div>
        <div class="land">{{this.activeLand}} Land</div>
        <div class="population">{{this.population}} Population</div>
        <div class="landRate">{{this.landRate}} Bushels/Acre</div>
      </div>
      <div class="gameInputs">
        <input class="landBuy" v-model="inputs.landBuy" placeholder="Land to trade"></input>
        <input class="bushelFeed" v-model="inputs.bushelFeed" placeholder="Bushels to feed Citizens"></input>
        <input class="planted" v-model="inputs.planted" placeholder="Bushels to plant"></input><br/>
        <button class="makeItSo" v-on:click="turnChange">Make it So!</button>
        <button class="quit" v-on:click="saveMenuToggle">Quit Game</button>
      </div>
    </div>
    <div class="saveMenu" v-if="saveMenu">
      <div class="saveQuestion" v-if="saveQuestion">
        <h1 class="title">Do you wish to save your progress?</h1>
        <button class="yesSave" v-on:click="saveQuestionToggle">Yes</button>
        <button class="noSave" v-on:click="quitGame">No</button>
      </div>
      <div class="saveInput" v-else>
        <h1 class="title">Name Your Save</h1>
        <input class="saveName" v-model="name" placeholder="Save Name"></input>
        <button class="saveGame" v-on:click="saveGame">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classic',
  props: [ 'year', 'starved', 'immigrants', 'population', 'land', 'bushelsPerAcre', 'rats', 'store', 'landRate' ],
  data () {
    return {
      name: '',
      saveMenu: false,
      saveQuestion: true,
      report: true,
      activeStore: 2800,
      activeLand: 1000,
      inputs: {
        landBuy: '',
        bushelFeed: '',
        planted: ''
      }
    }
  },
  methods: {
    turnChange: function () {
      this.$emit('turnChange', this.inputs)
    },
    saveMenuToggle: function () {
      this.saveMenu = !this.saveMenu
    },
    saveQuestionToggle: function () {
      this.saveQuestion = !this.saveQuestion
    },
    saveGame: function () {
      this.$emit('saveGame', this.name)
    },
    quitGame: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
  .main {
    background-color: #FFFFBB;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .title {
    text-align: center;
    font-size: 2.4em;
  }

  .game {
    text-align: center;
  }

  .yesSave {
    width: 40%;
    position: absolute;
    left: 5%;
    top: 300px;
    height: 60px;
    line-height: 60px;
    font-size: 1.6em;
  }

  .noSave {
    width: 40%;
    position: absolute;
    right: 5%;
    top: 300px;
    height: 60px;
    line-height: 60px;
    font-size: 1.6em;
  }

  .saveName {
    text-align: center;
    width: 80%;
    height: 1.8em;
    font-size: 1.4em;
    margin-left: 10%;
  }

  .saveGame {
    text-align: center;
    width: 80%;
    height: 60px;
    line-height: 60px;
    margin-top: 20px;
    font-size: 1.4em;
    margin-left: 10%;
  }
</style>
