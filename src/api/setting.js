import http from "@/utils/request";

export default {
  async getPrinterSettingsData() {
    return await http.get("/api/PrintShop/PrinterSettings");
  },
  async savePrinterSettings(params) {
    return await http.post("/api/PrintShop/PrinterSettings", params);
  },
};
