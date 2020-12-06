<template>
  <div class="calendar">
    <div class="input-wrap">
      <input type="text" class="input middle-input" @focus="foc" v-model="sel" />
    </div>
    <div class="dp" v-show="show">
      <div class="dp-header">
        <a class="dp-h-1" @click="cy(-1)">«</a>
        <a class="dp-h-2" @click="cm(-1)">‹</a>
        <span class="dp-ym">{{y}}年 {{m}}月</span>
        <a class="dp-h-3" @click="cm(1)">›</a>
        <a class="dp-h-4" @click="cy(1)">»</a>
      </div>
      <table class="dp-table">
        <thead>
          <tr>
            <th>
              <span>一</span>
            </th>
            <th>
              <span>二</span>
            </th>
            <th>
              <span>三</span>
            </th>
            <th>
              <span>四</span>
            </th>
            <th>
              <span>五</span>
            </th>
            <th>
              <span>六</span>
            </th>
            <th>
              <span>日</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            is="calendar-line"
            v-for="(cell, index) in data"
            :key="index"
            :items="cell"
            :month="m"
            :cur="cur"
            :sel="sel"
          ></tr>
        </tbody>
      </table>
      <div class="dp-footer">
        <a @click="clickNow">{{sel}}</a>
        <span class="btn btn-ok" @click="show=false">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import calendarLine from './calendarLine'
import getCalendar from '../../static/js/getCalendar'
import Utils from '../../static/js/utils'
export default {
  props: ['date'],
  data() {
    var d = '' //用于显示的日历
    var len = ('' + this.date).length

    if (!this.date || (len != 13 && len != 10)) {
      //为空
      d = new Date()
    } else {
      d = len == 13 ? new Date(parseInt(this.date)) : new Date(this.date * 1000)
    }

    var sel = ''

    if (Object.prototype.toString.call(d) === '[object Date]') {
      // it is a date
      if (isNaN(d.getTime())) {
        // d.valueOf() could also work
        // date is not valid
        d = new Date()
      } else {
        // date is valid
        sel = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      }
    } else {
      // not a date
      d = new Date()
    }

    if (!this.date) {
      sel = ''
    }

    var curTime = new Date()
    var cur =
      '' +
      curTime.getFullYear() +
      '-' +
      (curTime.getMonth() + 1) +
      '-' +
      curTime.getDate() //当前日期
    var y = d.getFullYear()
    var m = d.getMonth() + 1
    var data = getCalendar(d.getFullYear(), d.getMonth() + 1) //显示的日历
    return {
      cur: cur,
      sel: sel,
      y: y,
      m: m,
      data: data,
      show: false
    }
  },
  mounted() {
    let _this = this;
    Utils.$on('clickDay', function(data) {
      //点击事件
      _this.sel = data
      var ar = data.split('-')
      var m = ar[1]
      var y = ar[0]
      _this.date = new Date(ar[0], ar[1] - 1, ar[2]).getTime() //更新时间错
      if (m == _this.m) {
      } else {
        _this.y = y
        _this.m = m
        _this.data = getCalendar(y, m)
      }
    })
  },
  methods: {
    cm(flag) {
      //前进后退月
      if (flag == -1) {
        if (this.m == 1) {
          this.init(parseInt(this.y) - 1, 12)
        } else {
          this.init(parseInt(this.y), parseInt(this.m) - 1)
        }
      } else {
        if (this.m == 12) {
          this.init(parseInt(this.y) + 1, 1)
        } else {
          this.init(this.y, parseInt(this.m) + 1)
        }
      }
    },
    cy(flag) {
      //前进后退年
      if (flag == -1) {
        this.init(parseInt(this.y) - 1, this.m)
      } else {
        this.init(parseInt(this.y) + 1, this.m)
      }
    },
    clickNow() {
      var t = new Date()
      var y = t.getFullYear()
      var m = t.getMonth() + 1
      var d = t.getDate()
      this.init(y, m)
    },
    foc() {
      this.show = true
    },
    init(y, m) {
      //切换日历
      this.data = getCalendar(y, m)
      this.y = y
      this.m = m
    }
  },
  components: {
    calendarLine
  }
}
</script>

<style scoped>
</style>
