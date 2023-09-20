const enums = {
  OrderStatus: {
    0: "待支付",
    1: "等待处理",
    2: "下载文件中",
    3: "等待打印",
    4: "正在打印",
    5: "打印成功",
    6: "打印失败",
  },
  FilePrintStatus: {
    0: "None",
    1: "Waiting",
    2: "Printing",
    3: "Done",
    4: "Error",
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
  FileType: {
    doc: "word",
    docx: "word",
    xls: "excel",
    xlsx: "excel",
    pdf: "pdf",
    ppt: "ppt",
  },
};

export { enums };
