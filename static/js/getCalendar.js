function getCalendar(y, m) {
  //输出一个日历数据源  月份不必减1
  y = parseInt(y);
  m = parseInt(m);
  var time = new Date(y, m - 1, 1); // 获取上个月1号的时间戳
  var lastDate, nextDate;
  var lastMonth = m - 1;
  var nextMonth = m + 1;
  if (m == 1) {
    lastDate = "" + (y - 1) + "-" + +12 + "-";
    nextDate = "" + y + "-" + 2 + "-";
    lastMonth = 12;
  } else if (m == 12) {
    lastDate = "" + y + "-" + 11 + "-";
    nextDate = "" + (y + 1) + "-" + 1 + "-";
    nextMonth = 1;
  } else {
    lastDate = "" + y + "-" + (m - 1) + "-";
    nextDate = "" + y + "-" + (m + 1) + "-";
  }
  var maxNumber = 42;
  var r1 = [],
    r2 = [],
    r3 = [];
  var lastFix = time.getDay() - 1; // 上个月1号前一天的星期，也就是上上个月月底的星期
  lastFix = lastFix < 0 ? lastFix + 7 : lastFix;
  var lastMaxDate = new Date(y, m - 1, 0).getDate(); //上个月份最大天数
  var maxDate = new Date(y, m, 0).getDate(); //当前月份的
  var i, t;
  for (i = 0; i < lastFix; i++) {
    t = lastMaxDate - lastFix + i + 1;
    r1[i] = { month: lastMonth, day: t, data: lastDate + t };
  }
  for (i = 0; i < maxDate; i++) {
    t = i + 1;
    r2[i] = { month: m, day: t, data: "" + y + "-" + +m + "-" + t };
  }
  var nextFix = maxNumber - maxDate - lastFix;
  for (i = 0; i < nextFix; i++) {
    t = i + 1;
    r3[i] = { month: nextMonth, day: t, data: nextDate + t };
  }
  var result = r1.concat(r2, r3);
  var ar = [];
  for (i = 0; i < 6; i++) {
    ar.push(result.splice(0, 7));
  }
  return ar;
}

export default getCalendar;