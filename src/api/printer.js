import http from "@/utils/request";

export default {
  async getOrder(params) {
    return await http.post("/api/PrintOrder/Search", params);
  },
};
