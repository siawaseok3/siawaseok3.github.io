document.addEventListener('DOMContentLoaded', function() {
  const dataDiv = document.getElementById('data');

  fetch('https://script.google.com/macros/s/AKfycbxX8bZwwjvjv-nHC2u7n7Zxl5G4jDACD2moBJWX4NyglzWHVLEzRi09Wubgj89dpP5KEw/exec')
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