import { monthAxis, dayAxis, weekAxis } from "./fetchChartData";
export function getRankingList(list, range) {
  let oldList = [];
  list.forEach((item, index) => {
    oldList.push({ key: index, value: item });
  });
  let arr = oldList.sort(function (a, b) {
    return b.value - a.value;
  });
  let indexArr = [];

  arr.forEach((item) => {
    indexArr.push(item.key);
  });
  let rankingList = [];
  indexArr.forEach((item) => {
    rankingList.push({
      title:
        range === "year"
          ? monthAxis()[item]
          : range === "week"
          ? weekAxis()[item]
          : dayAxis()[item],
      total: list[item],
    });
  });
  return rankingList.splice(0, 7);
}
