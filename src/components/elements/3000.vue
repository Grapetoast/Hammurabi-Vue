<template>
  <div class="main">
    <h1 class="title">Hammurabi 3000</h1>
    <div class="report" v-if="report">
      <strong>Overlord Hammurabi</strong>: I beg to report to you,
      <span v-if="plague">An enemy incursion has swept over your demense! <strong><span class="plagueNumber">{{this.plagueNumber}}</span> Citizens have perished!!</strong></span>
      In the <strong>Year <span class="year">{{this.year}}</span></strong>,
      <strong><span class="starved">{{this.starved}}</span></strong> civilians starved.
      <strong><span class="immigrants">{{this.immigrants}}</span></strong> civilians came to the city.
      You harvested <strong><span class="harvest">{{this.harvest}}</span></strong> rations per quadrant.
      Space crabs ate <strong><span class="spaceCrabs">{{this.spaceCrabs}}</span></strong> rations.<br/>
      <button v-on:click="next">Next</button>
    </div><br/>
    <div class="resource" v-if="resource">
      <div class="population">Population: {{this.population}}</div>
      <div class="land">Land: {{this.land}}</div>
      <div class="rations">Rations: {{this.rations}}</div>
      <div class="landTrade">Landtrade: {{this.landTrade}}</div>
    </div>
    <div class="input" v-if="input">
      <span class="question">How many quadrants do you wish to appropriate?</span> </br><textarea placeholder="enter negative to barter" class="landBuy" rows="1" cols="25" type="number"></textarea></br>
      <span class="question">How many rations do you wish to feed your citizens?</span> </br><textarea placeholder="each citizen needs 20/year" class="food" rows="1" cols="25" type="number"></textarea></br>
      <span class="question">How many quadrants do you wish to inseminate?</span> </br><textarea placeholder="quadrant = 1ration" class="plant" rows="1" cols="25" type="number"></textarea>
    </div>
    <button v-if="makeItSo" v-on:click="">Make It So!</button>
    <button class="quit">Quit Game</button>
  </div>
</template>

<script>
export default {
  name: 'threethousand',
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
      makeItSo: false
    }
  },
  methods: {
    next: function () {
      this.report = false
      this.resource = true
      this.input = true
      this.makeItSo = true
    }
  }
}
</script>

<style scoped lang="less">
.main {

}

.title {
  text-align: center;
  color: #fff;
  font-size: 2.4em;
}

.report {
  font-size: .9em;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  position: relative;
  text-align: center;
  background-color: #fff;
  border: 8px solid #29005d;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
  -webkit-box-shadow: 2px 2px 4px #29005d;
  -moz-box-shadow: 2px 2px 4px #29005d;
  box-shadow: 2px 2px 4px #29005d;
}

.report:before {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 32px;
  top: 127px;
  border: 25px solid;
  border-color: #29005d transparent transparent #29005d;
}

.report:after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 40px;
  top: 127px;
  border: 15px solid;
  border-color: #fff transparent transparent #fff;
}

.resource {
  display: grid;
  grid-template-columns: 30px 1fr 1fr 1fr 30px;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  background: #fff;
  margin-bottom: 30px;
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
 background: #fff;
}

.quit {
  margin-top: 30px;
}
</style>
