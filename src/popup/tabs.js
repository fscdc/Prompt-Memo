// tabs.js
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.style.display = 'none'; 
    });
    document.getElementById(tabName).style.display = 'block'; // 显示当前分区
}
  
document.addEventListener('DOMContentLoaded', () => {
document.querySelector('button[onclick="showTab(\'memo\')"]').addEventListener('click', () => showTab('memo'));
document.querySelector('button[onclick="showTab(\'about\')"]').addEventListener('click', () => showTab('about'));
document.querySelector('button[onclick="showTab(\'starred\')"]').addEventListener('click', () => showTab('starred'));
});