<template>
    <tr id="calendarLine">
      <td
        v-for="(item, index) in items" :key="index"
        v-bind:class="{'dp-last': month!= item.month, 'dp-today': cur == item.data, 'dp-select': sel == item.data}"
      >
        <span @click="clickDay(item)">{{ item.day }}</span>
      </td>
    </tr>
</template>

<script>
import Utils from '../../static/js/utils'
export default {
  name: 'calendarLine',
  props: ['items', 'cur', 'sel', 'month'],
  data() {
    return {}
  },
  methods: {
    clickDay(item) {
			Utils.$emit('clickDay', item.data)
    }
  }
}
</script>

<style scoped>
</style>
