import http from "@/utils/request";

export default {
  async getData(params) {
    return await http.get("/api/getdata", params);
  },
};
