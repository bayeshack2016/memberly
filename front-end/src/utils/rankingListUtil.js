import { monthAxis, dayAxis, weekAxis } from "./fetchChartData";
export function getRankingList(list, range) {
  let oldList = [];
  list.forEach((item) => {
    oldList.push(item);
  });
  let arr = oldList.sort(function (a, b) {
    return b - a;
  });
  let indexArr = [];

  arr.forEach((item) => {
    indexArr.push(list.indexOf(item));
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
