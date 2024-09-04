document.addEventListener('DOMContentLoaded', function() {
  const dataDiv = document.getElementById('data');

  fetch('https://script.googleusercontent.com/macros/echo?user_content_key=fArFKZAwzLdxtBAoap6luxyBfK3DZrpkVhWwAjqgsIqpQDAKWmWuIO86tz122fSIvHImqBK4cNB_Ie3W0CqAzvp9Z3QtvBbvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDq7Klo9diylEnoHYBt8gXADshTmvUuET4QGSFfMxK7mkYaONqetJN5AmyedGeufVTj41k2QWkuvR8bi-QdjzoaBxsds2exfrQ&lib=M4MDCoyBn1LAAZxAfgA_Ws71kaubNz8aS')
    .then(response => response.json())
    .then(data => {
      let content = '';
      data.forEach(item => {
        content += item + '<br>'; 
      });
      dataDiv.innerHTML = content; 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      dataDiv.textContent = 'データの取得に失敗しました。';
    });
});