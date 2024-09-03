document.addEventListener('DOMContentLoaded', function() {
  const dataDiv = document.getElementById('data');

  fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec')
    .then(response => response.json())
    .then(data => {
      let content = '';
      data.forEach(item => {
        content += item + '<br>'; // 改行を追加
      });
      dataDiv.innerHTML = content; // innerHTMLを使ってHTMLタグを解釈させる
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      dataDiv.textContent = 'データの取得に失敗しました。';
    });
});
