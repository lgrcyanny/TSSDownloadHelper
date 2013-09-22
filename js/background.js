var background = {
  init: function () {
    this.addMessageListener();
  },

  showPageActionIcon: function () {
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      chrome.pageAction.show(tab.id);
    });
  },

  addMessageListener: function () {
    var self = this;
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      switch(request.message) {
        case 'show-page-action':
          self.showPageActionIcon();
          break;
        // This function is not supported by current Chrome, develop it on later version
        case 'cancle-all-downloads':
          self.cancleAllDownloads();
          break;
      }
    });
  },

  cancleAllDownloads: function () {
    chrome.downloads.search({query: ['tss', 'downloadSlides']}, function (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        chrome.downloads.cancel(item.id, function () { });
      }
    });
  }
}
background.init();