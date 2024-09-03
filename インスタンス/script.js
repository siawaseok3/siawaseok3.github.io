async function fetchSpreadsheetData() {
  document.getElementById('data').textContent = 'データを取得中...';
  
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbymf6ycp2s1AJxWHU9CutenLeqxnEnX7_R_s_H1psMQiQtEDTIrfAeUylzgFOMAAAal/exec');
    if (!response.ok) throw new Error('ネットワークエラー');
    
    const data = await response.json();
    const output = data.join('<br>');
    document.getElementById('data').innerHTML = output;
  } catch (error) {
    document.getElementById('data').textContent = 'データの取得に失敗しました。';
    console.error('データ取得中にエラーが発生しました:', error);
  }
}

window.onload = fetchSpreadsheetData;