// 保存当前页面链接和自定义标题
document.getElementById('starButton').addEventListener('click', () => {
    const pageTitle = document.getElementById('pageTitle').value || 'Untitled';
    
    // 获取当前活动标签页的URL
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const currentTab = tabs[0];
      const pageURL = currentTab.url;
      
      // 获取已保存的starred页面
      chrome.storage.sync.get('starredPages', (data) => {
        const starredPages = data.starredPages || [];
        // 添加新页面到starred列表
        starredPages.push({ title: pageTitle, url: pageURL });
        // 保存到Chrome存储中
        chrome.storage.sync.set({ starredPages }, () => {
          displayStarredPages(); // 刷新页面
          document.getElementById('pageTitle').value = ''; // 清空输入框
        });
      });
    });
  });
  
  // 显示已保存的starred页面
function displayStarredPages() {
  chrome.storage.sync.get('starredPages', (data) => {
    const starredList = document.getElementById('starredList');
    starredList.innerHTML = ''; // 清空列表

    // 遍历已保存的starred页面，只显示标题，不显示URL
    data.starredPages.forEach((page, index) => {
      const li = document.createElement('li');
      li.textContent = page.title; // 只显示标题

      // 创建打开页面的按钮
      const openButton = document.createElement('button');
      openButton.textContent = 'Open';
      openButton.style.marginLeft = '10px';
      openButton.addEventListener('click', () => {
        chrome.tabs.create({ url: page.url });
      });

      // 创建删除按钮
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.style.marginLeft = '10px';
      deleteButton.addEventListener('click', () => {
        deleteStarredPage(index);
      });

      // 将按钮添加到列表项
      const buttonGroup = document.createElement('div');
      buttonGroup.classList.add('button-group');
      buttonGroup.appendChild(openButton);
      buttonGroup.appendChild(deleteButton);
      
      li.appendChild(buttonGroup);
      starredList.appendChild(li);
    });
  });
}
  
  // 删除已保存的starred页面
  function deleteStarredPage(index) {
    chrome.storage.sync.get('starredPages', (data) => {
      const starredPages = data.starredPages || [];
      starredPages.splice(index, 1); // 删除指定的页面
  
      // 保存更新后的列表
      chrome.storage.sync.set({ starredPages }, () => {
        displayStarredPages(); // 刷新列表
      });
    });
  }
  
  // 页面加载时显示已保存的starred页面
  document.addEventListener('DOMContentLoaded', () => {
    displayStarredPages();
  });
  //   // 获取当前页面的URL并显示在页面上
  // chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  //   const currentTab = tabs[0];
  //   const currentURL = currentTab.url;
    
  //   // 显示在页面的特定区域
  //   document.getElementById('currentURL').textContent = currentURL;
  // });