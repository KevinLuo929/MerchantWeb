const enums = {
  FilePrintStatus: {
    0: "None",
    1: "Waiting",
    2: "Printing",
    3: "Done",
    5: "Error",
  },
  PageOrientation: {
    0: "未知纸张方向",
    1: "横向",
    2: "纵向",
    3: "反向横向",
    4: "反向纵向",
  },
  PaperKind: {
    0: "None",
    9: "A4",
  },
  PageColor: {
    0: "黑白",
    1: "彩色",
  },
  PageDuplex: {
    0: "无",
    1: "单面",
    2: "长边双面",
    3: "短边双面",
  },
  PageType: {
    0: "无",
    1: "文档打印机",
    2: "图片打印机",
  },
};

export { enums };
