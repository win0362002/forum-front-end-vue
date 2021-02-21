import moment from "moment"

export const fromNowFilter = {
  filters: {
    fromNow(time) {
      if (!time) {
        return "-";
      }
      return moment(time).fromNow();
    },
  }
}