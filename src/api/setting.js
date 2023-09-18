import http from "@/utils/request";

export default {
  async getPrinterSettingsData() {
    return await http.get("/api/PrintShop/PrinterSettings");
  },
  async addPrinterSettings(params) {
    return await http.post("/api/PrintShop/PrinterSettings", params);
  },
  async updatePrinterSettings(params) {
    return await http.put("/api/PrintShop/PrinterSettings", params);
  },
  async deletePrinterSettings(params) {
    return await http.delete("/api/PrintShop/PrinterSettings", params);
  },

  async getPrintPriceSettings() {
    return await http.get("/api/PrintShop/PrintPriceSettings");
  },
  async addPrintPriceSettings(params) {
    return await http.post("/api/PrintShop/PrintPriceSettings", params);
  },
  async updatePrintPriceSettings(params) {
    return await http.put("/api/PrintShop/PrintPriceSettings", params);
  },
  async deletePrintPriceSettings(params) {
    return await http.delete("/api/PrintShop/PrintPriceSettings", params);
  },

  async getPrintShop() {
    return await http.get("/api/PrintShop");
  },
  async updatePrintShop(params) {
    return await http.put("/api/PrintShop", params);
  },
};
