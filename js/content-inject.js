$(function () {
 var downloader = {
  files: $('td.bodyText ul a'),

  init: function () {
    this.showPageAction();
    this.showDownloadBtn();
  },

  sendMessage: function (message) {
    chrome.runtime.sendMessage({message: message}, function (response) {});
  },

  showPageAction: function () {
    this.sendMessage('show-page-action');
  },

  showDownloadBtn: function () {
    if (this.files.length === 0) return;
    var self = this;
    $('ul>select#orderList').parent()
    .prepend('<div id="tss-dl-helper"><button id="tss-dl-download-btn">下载全部资料</button></div>');
    $('#tss-dl-download-btn').click(function () {
      self.download();
    });
  },

  isLegalFile: function (filePath) {
    var filePatten = /tss\/en\/c\d*\/slide\/downloadSlides\/*\.*/ig;
    return filePatten.test(filePath);
  },

  download: function () {
    for (var i = 0; i < this.files.length; i++) {
      var file = this.files[i];
      var filepath = file.href;
      if (this.isLegalFile(filepath)) {
        var link = document.createElement('a');
        link.href = filepath;
        link.download = filepath;
        link.click();
      }
    }
  }
 }

 downloader.init();
});