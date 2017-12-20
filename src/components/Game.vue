<template>
  <div class="main">
    <threethousand v-if="!classic"></threethousand>
    <classicmode v-if="classic"></classicmode>
  </div>
</template>

<script>
import ThreeThousand from './elements/3000'
import Classic from './elements/Classic'
export default {
  name: 'game',
  props: ['classic', 'game', 'difficulty'],
  components: {
    'threethousand': ThreeThousand,
    'classicmode': Classic
  },
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
</style>
