function doGet(e) {
  var output = ContentService.createTextOutput("hoge");
  output.setMimeType(ContentService.MimeType.TEXT);
  return output;
}

function doPost(e) {
  if (e == null || e.postData == null || e.postData.contents == null) {
    return;
  }
  var requestJSON = e.postData.contents;
  var requestObj = JSON.parse(requestJSON);
  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getActiveSheet();
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  var values = [];
  for (i in headers){
    var header = headers[i];
    var val = "";
    switch(header) {
      case "date":
        val = new Date();
        break;
      case "mimeType":
        val = e.postData.type;
        break;
      default:
        val = requestObj;
        break;
    }
    values.push(val);
  }
  sheet.appendRow(values);
}

function doPostTest() {
  var e = new Object();
  var postData = new Object();
  postData.type = "application/json";
  postData.contents = '{"key1":100, "key2":"string", "key3":"string", "key4":"string"}';
  e.postData = postData;

  doPost(e);
}
