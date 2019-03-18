  // Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}
function todayDate() {
  todayDate = new Date();
  month = todayDate.getMonth();
	month = (month * 1) + 1;
	day = todayDate.getDate();
	year = todayDate.getFullYear();
	todayDate = month+"/"+day+"/"+year;
	document.getElementById("todayDate").innerHTML = todayDate;
	GetData();
}
var Urls = ["https://raw.githubusercontent.com/brynan/brynan.github.io/master/GData.txt?callback=?", "https://raw.githubusercontent.com/brynan/brynan.github.io/master/SData.txt?callback=?"];
var GData = [];
var SData = [];
var GTransactions = [];
var STransactions = [];

function GetData() {
	for (i = 0; i < Urls.length; i++){
		console.log(Urls[i])
		var DataRequest = new XMLHttpRequest();
		DataRequest.open('GET', Urls[i], false);
		DataRequest.send(null);
		if(DataRequest.readyState == 4 && DataRequest.status == 200){
			var Data = DataRequest.responseText;
			var Data = Data.replace(/[\n\r]/g, ",").replace(/[ ]/g, "");
			var Data = Data.split(",");
		}
		if(i==0){
			GData = Data;
		}
		if(i==1){
			SData = Data;
		}
	}
	getBalances();
}

function getBalances(){
	document.getElementById("GBalance").innerHTML = GData[GData.length-2]
	document.getElementById("SBalance").innerHTML = SData[SData.length-2]
}

function addTable(name) {
	document.getElementById("metric_results").innerHTML = "<br>"
	if(name=="Garrit") {
		var Transactions = GData;
	}
	if(name=="Seth") {
		var Transactions = SData;
	}
    console.log(Transactions.length);
	
	var myTableDiv = document.getElementById("metric_results")
    var table = document.createElement('TABLE')
    var tableBody = document.createElement('TBODY')

    table.border = '1'
    table.appendChild(tableBody);

	//TABLE HEADINGS
	var heading = new Array(Transactions[0], Transactions[1], Transactions[2], Transactions[3]);
	//TABLE ROW Data
	var stock = new Array();
	for (i = 4; i < Transactions.length-1; i+=4){
		stock.push(new Array(Transactions[i+0], Transactions[i+1], Transactions[i+2], Transactions[i+3]));
	}
    //TABLE COLUMNS
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
      var th = document.createElement('TH')
      th.width = '125';
      th.appendChild(document.createTextNode(heading[i]));
      tr.appendChild(th);
      }
    //TABLE ROWS
    for (i = 0; i < stock.length; i++) {
      var tr = document.createElement('TR');
      for (j = 0; j < stock[i].length; j++) {
      var td = document.createElement('TD')
      td.appendChild(document.createTextNode(stock[i][j]));
      tr.appendChild(td)
      }
      tableBody.appendChild(tr);
     }  
    myTableDiv.appendChild(table)
}
