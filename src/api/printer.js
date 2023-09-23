import http from "@/utils/request";

export default {
  async getOrder(params) {
    return await http.post("/api/PrintOrder/ShopOrders", params);
  },
  async updateOrderStatus(params) {
    return await http.put("/api/PrintOrder/UpdateStatus", params);
  },
  async getOrderByTakeNumber(params) {
    return await http.getRestApi("/api/PrintOrder", params);
  },
};
