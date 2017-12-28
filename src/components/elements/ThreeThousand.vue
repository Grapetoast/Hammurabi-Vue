<template>
  <div class="main">
    <h1 class="title">Hammurabi 3000</h1>
    <transition name="fade">
      <div class="report" v-if="report">
        <strong>Overlord Hammurabi</strong>! I beg to report to you,
        <span v-if="plague">An enemy incursion has swept over your demense! <strong><span class="plagueNumber">{{this.plagueNumber}}</span> Citizens have perished!!</strong></span>
        In the <strong>Year <span class="year">{{this.year}}</span></strong>,
        <strong><span class="starved">{{this.starved}}</span></strong> civilians starved.
        <strong><span class="immigrants">{{this.immigrants}}</span></strong> civilians came to the city.
        You harvested <strong><span class="harvest">{{this.harvest}}</span></strong> rations per quadrant.
        Space crabs ate <strong><span class="spaceCrabs">{{this.spaceCrabs}}</span></strong> rations.<br/>
        <button v-on:click="next">Next</button>
      </div><br/>
    </transition>
    <transition name="fade">
      <div class="resource" v-if="resource">
        <div class="population">Population: {{this.population}}</div>
        <div class="land">Land: {{this.land}}</div>
        <div class="rations">Rations: {{this.rations}}</div>
        <div class="landTrade">Landtrade: {{this.landTrade}}</div>
      </div>
    </transition>
    <transition name="fade">
      <div class="input" v-if="input">
        <span class="question">How many quadrants do you wish to appropriate?</span><br/>
        <input v-model="inputs.landBuy" placeholder="enter negative to barter" class="landBuy" rows="1" cols="25" type="number"></input><br/>
        <span class="question">How many rations do you wish to feed your citizens?</span><br/>
        <input v-model="inputs.bushelFeed" placeholder="each citizen needs 20/year" class="food" rows="1" cols="25" type="number"></input><br/>
        <span class="question">How many quadrants do you wish to inseminate?</span><br/>
        <input v-model="inputs.planted" placeholder="quadrant = 1ration" class="plant" rows="1" cols="25" type="number"></input>
        <button class="quit" v-on:click="saveMenuToggle">Quit Game</button>
      </div>
    </transition>
    <threeThousandPeasant></threeThousandPeasant>
    <button v-bind:class="makeItSoLogic" v-if="makeItSo" v-on:click="turnChange">Make It So!</button>
    <div v-bind:class="makeItSoHide">Not Allowed</div>
    <button v-if="input" v-on:click="backReport">Report</button>
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
import ThreeThousandPeasant from './ThreeThousandPeasant'
export default {
  name: 'threethousand',
  props: [ 'year', 'starved', 'immigrants', 'population', 'land', 'bushelsPerAcre', 'rats', 'store', 'landRate' ],
  components: {
    'threeThousandPeasant': ThreeThousandPeasant
  },
  created () {
    let vue = this
    this.totalCost = (this.store - parseInt(this.inputs.bushelFeed) - parseInt(this.inputs.planted) - (parseInt(this.inputs.landBuy) * this.landRate))
    this.plantRule = ((parseInt(this.inputs.planted) / 10) - this.population)
    this.totalLand = (this.land + parseInt(vue.inputs.landBuy))
    this.plantable = (this.activeLand - parseInt(this.inputs.planted))
    document.addEventListener('keyup', function () {
      vue.totalCost = (vue.store - parseInt(vue.inputs.bushelFeed) - parseInt(vue.inputs.planted) - (parseInt(vue.inputs.landBuy) * vue.landRate))
      vue.plantRule = ((parseInt(vue.inputs.planted) / 10) - vue.population)
      vue.totalLand = (vue.land + parseInt(vue.inputs.landBuy))
      vue.plantable = (vue.activeLand - parseInt(vue.inputs.planted))
      vue.activeStore = (vue.store - parseInt(vue.inputs.bushelFeed) - parseInt(vue.inputs.planted) - (parseInt(vue.inputs.landBuy) * vue.landRate))
      vue.activeLand = (vue.land + parseInt(vue.inputs.landBuy))
    })
  },
  data () {
    return {
      year: 3001,
      starved: 0,
      immigrants: 5,
      population: 100,
      land: 1000,
      harvest: 3,
      spaceCrabs: 200,
      rationsStore: 2800,
      landTrade: 22,
      rations: 2800,
      starvedTotal: 0,
      points: 0,
      landRatio: 10,
      rationCounter: 2800,
      plagueNumber: 0,
      report: true,
      resource: false,
      input: false,
      makeItSo: false,
      saveMenu: false,
      saveQuestion: true,
      activeStore: 2800,
      activeLand: 1000,
      totalCost: 0,
      plantRule: 0,
      totalLand: 0,
      plantable: 0,
      inputs: {
        landBuy: 0,
        bushelFeed: 0,
        planted: 0
      }
    }
  },
  computed: {
    makeItSoLogic: function () {
      return {
        allowed: (this.totalCost >= 0) && (this.plantRule <= 0) && (this.totalLand >= 0) && (this.plantable >= 0),
        hidden: (this.totalCost < 0) || (this.plantRule > 0) || (this.totalLand <= 0) || (this.plantable < 0) || (this.inputs.landBuy === '-') || (this.inputs.planted === '-') || (this.inputs.bushelFeed === '-') || ((this.inputs.landBuy === '') || (this.inputs.planted === '') || (this.inputs.bushelFeed === ''))
      }
    },
    makeItSoHide: function () {
      return {
        notAllowed: (this.totalCost < 0) || (this.plantRule > 0) || (this.totalLand <= 0) || (this.plantable < 0) || (this.inputs.landBuy === '-') || (this.inputs.planted === '-') || (this.inputs.bushelFeed === '-') || ((this.inputs.landBuy === '') || (this.inputs.planted === '') || (this.inputs.bushelFeed === '')),
        hidden: ((this.totalCost >= 0) && (this.plantRule <= 0) && (this.totalLand >= 0) && (this.plantable >= 0))
      }
    }
  },
  methods: {
    next: function () {
      this.report = false
      this.resource = true
      this.input = true
      this.makeItSo = true
      this.seeReport = true
      this.activeStore = this.store
      this.activeLand = this.land
      this.inputs.landBuy = 0
      this.inputs.bushelFeed = 0
      this.inputs.planted = 0
    },
    turnChange: function () {
      this.$emit('turnChange', this.inputs)
      this.report = true
      this.resource = false
      this.input = false
      this.makeItSo = false
      this.seeReport = false
    },
    saveMenuToggle: function () {
      this.saveMenu = !this.saveMenu
      this.report = false
      this.resource = false
      this.input = false
      this.makeItSo = false
      this.quit = false
      this.seeReport = false
    },
    saveQuestionToggle: function () {
      this.saveQuestion = !this.saveQuestion
    },
    saveGame: function () {
      this.$emit('saveGame', this.name)
    },
    quitGame: function () {
      this.$router.push('/')
    },
    backReport: function () {
      this.report = true
      this.resource = false
      this.input = false
      this.makeItSo = false
    }
  }
}
</script>

<style scoped lang="less">
@primary-color:#7071b5;
@accent-color:#29005d;
@background-color:#000024;
@bold-font:'Bungee';
@light-font:'Aldrich', sans-serif;

.main {

}

.title {
  text-align: center;
  color: #fff;
  font-size: 2.4em;
  font-family: @bold-font;
  text-shadow: 2px 2px 1px #7071b5;
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
.reportButton {
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  margin-left: 35px;
  height: 30px;
  width: 40%;
  font-family: @bold-font;
}
.makeIt {
  margin-left: 12px;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  height: 30px;
  width: 40%;
  font-family: @bold-font;
}
.report {
  height: 200px;
  color: #fff;
  font-size: 1em;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  position: relative;
  text-align: center;
  background: rgba(112,113,181,0.5);
  border: 5px solid #7071b5;
  font-family: @light-font;

}
.nextButton {
  font-family: @bold-font;
  background-color: transparent;
  color: #fff;
  margin-top: 15px;
  border-style: solid;
  font-size: 1.2em;
  width: 40%;
}
.resource {
  display: grid;
  grid-template-columns: 30px 1fr 1fr 1fr 30px;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  background: rgba(112,113,181,0.5);
  border: 4px solid #7071b5;
  border-bottom: 0;
  margin-left: 10px;
  margin-right: 10px;
  color: #fff;
}

.population {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 2;

}

.land {
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 2;
  grid-row-end: 2;
}

.rations {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 4;
}

.landTrade {
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 4;
  grid-row-end: 4;
}

.input {
 background: rgba(112,113,181,0.5);
 border: 4px solid #7071b5;
 border-top: 0;
 margin-bottom: 10px;
 margin-left: 10px;
 margin-right: 10px;
 padding-bottom: 5px;
}

.quit {
  margin-top: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 20px;
  width: 80%;
  height: 30px;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  margin-left: 35px;
  font-family: @bold-font;
}
.question {
  margin-left: 10px;
  background-color: transparent;
  color: #fff;
  padding-left: 10px;
}
.saveQuestion {
  font-size: .7em;
}
.yesSave {
  width: 40%;
  position: absolute;
  left: 5%;
  top: 300px;
  height: 60px;
  line-height: 60px;
  font-size: 1.6em;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  font-family: @bold-font;
  text-shadow: 2px 2px 1px #7071b5;
  box-shadow: 2px 2px 1px #7071b5;
}

.noSave {
  width: 40%;
  position: absolute;
  right: 5%;
  top: 300px;
  height: 60px;
  line-height: 60px;
  font-size: 1.6em;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  font-family: @bold-font;
  text-shadow: 2px 2px 1px #7071b5;
  box-shadow: 2px 2px 1px #7071b5;
}

.saveName {
  margin-bottom: 30px;
  text-align: center;
  width: 80%;
  height: 1.8em;
  font-size: 1.4em;
  margin-left: 10%;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  font-family: @bold-font;
  text-shadow: 2px 2px 1px #7071b5;
  box-shadow: 2px 2px 1px #7071b5;
}

.saveGame {
  text-align: center;
  width: 80%;
  height: 60px;
  line-height: 60px;
  margin-top: 20px;
  font-size: 1.4em;
  margin-left: 10%;
  border-style: solid;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  font-family: @bold-font;
  text-shadow: 2px 2px 1px #7071b5;
  box-shadow: 2px 2px 1px #7071b5;
}
</style>
