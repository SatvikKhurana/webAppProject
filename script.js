var id_count;

AWS.config.update({
  region: 'us-east-1',
  "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
  accessKeyId: 'ASIA3DGRPBGGCLOWVHW5',
  secretAccessKey: '/dkWPhmn/NaWHINWA5yex57pqho5ICMT1PcvTnva',
  sessionToken: 'FwoGZXIvYXdzEDYaDEAb2lLfW/3SpxwVSiLDAekm1w9k52wqvp7bSiP3gUqhcxZWIQbzAKjTx+7F+fIdy0BFcCN0s3ptaRSHj04JL6W8ZQObqbqBTuPFhOU1DIbrCgE/sZsC09cXEGjCmUt0F0GHbOvpPG2qdhS5JgBc7s1ss0T52eoik7weFlvCUjiBXxwP1V86SpI5J6/kDasWBf583HWC1RFQcas7mNaizsfnekkSJ+wDoKNbKkjw/TjbpTPGea8fZPXEUDFaVYGLsmb3nIo5hxRblC7cpK1eRO2Sjyik1eP2BTItUtqw/Bvv17RhXwTY45N6mTEcGwTMa/NshHtkoPDiHcWn2fm6n+vgVIwnmhfP'
});
var ddb = new AWS.DynamoDB({
  apiVersion: '2012-08-10'
});

function show_error_block_data_not_found() {
  var error_paragraph = document.getElementById("error");
  error_paragraph.innerHTML = "Disclaimer: No Entry Found. Check Your Data and Try Again!!!";
  document.getElementById("area_for_showing_error_message").style.display = "block";
  document.getElementById("wrapper_around_table").style.display = "none";
}

function show_error_block_other_error() {
  var error_paragraph = document.getElementById("error");
  error_paragraph.innerHTML = "Disclaimer: Some Error Occured. Please Try Again!!!";
  document.getElementById("area_for_showing_error_message").style.display = "block";
  document.getElementById("wrapper_around_table").style.display = "none";
}

function show_table_header() {
  table.innerHTML = table.innerHTML +
    "<tr>" +
    "<th class='normal_header'><b>HashKey</b></th>" +
    "<th class='normal_header'><b>Is Active</b></th>" +
    "<th class='normal_header'><b>Min Range</b></th>" +
    "<th class='normal_header'><b>Max Range</b></th>" +
    "<th class='normal_header'><b>Min Transaction</b></th>" +
    "<th class='normal_header'><b>Time Period</b></th>" +
    "<th class='normal_header'><b>Issuer</b></th>" +
    "<th class='metadata_header'><b>Active Meta Data List</b></th></tr>";

  document.getElementById("wrapper_around_table").style.display = "block";
}

function show_table_structure_and_value(current_object) {

  table.innerHTML =
    table.innerHTML +
    "<tr id='dataEntry" +
    id_count +
    "'><td class='normal_value'>" +
    current_object["hashKey (S)"] +
    "</td><td style='display:none;'>" +
    current_object["rangeKey (S)"] +
    "</td><td style='display:none;'>" +
    current_object["createdAt (S)"] +
    "</td><td class='normal_value'>" +
    current_object["isActive (BOOL)"] +
    "</td><td contenteditable='true' class='normal_value'>" +
    current_object["minRange (N)"] +
    "</td><td contenteditable='true' class='normal_value'>" +
    current_object["maxRange (N)"] +
    "</td><td contenteditable='true' class='normal_value'>" +
    current_object["minTransactions (N)"] +
    "</td><td contenteditable='true' class='normal_value'>" +
    current_object["timePeriod (N)"] +
    "</td><td class='normal_value'>" +
    current_object["issuer (S)"] +
    "</td><td>" +
    "<div class='metadata_value_div' >" +
    current_object["actionMetadataList (S)"] +
    "</div></td>" +
    "</tr>";

  console.log(current_object);
  id_count = id_count + 1;
}

function show_Items_In_Table_With_Range_Key(data) {
  if (data['Responses']['BankDetails'].length == 0) {
    show_error_block_data_not_found();
    return;
  }
  console.log("Success");
  show_table_header();
  for (var i = 0; i < data['Responses']['BankDetails'].length; i = i + 1) {
    var current_object = AWS.DynamoDB.Converter.unmarshall(data['Responses']['BankDetails'][i]);
    show_table_structure_and_value(current_object);
  }
}

function show_Items_In_Table_Without_Range_Key(data) {
  if (data['Items'].length == 0) {
    show_error_block_data_not_found();
    return;
  }
  console.log("Success");
  show_table_header();
  for (var i = 0; i < data['Items'].length; i++) {
    var current_object = AWS.DynamoDB.Converter.unmarshall(data['Items'][i]);
    show_table_structure_and_value(current_object);
  }
}


function Clicking_search_button() {

  document.getElementById("area_for_showing_error_message").style.display = "none";
  document.getElementById("wrapper_around_table").style.display = "block";

  var hashkey;
  var rangekey;
  let entryFound = false;
  id_count = 1;

  var bank_id_in_form = document.getElementById("Bank_id_in_form");
  var marketplace_id_in_form = document.getElementById("Marketplace_id_in_form");
  var payment_method_in_form = document.getElementById("Payment_method_in_form");
  var processor_in_form = document.getElementById("Processor_in_form");
  var range_key_in_form = document.getElementById("Range_key_in_form");
  var table = document.getElementById("table");
  table.innerHTML = "";

  hashkey = marketplace_id_in_form.value + "_" +
    bank_id_in_form.options[bank_id_in_form.selectedIndex].value + "_" +
    processor_in_form.options[processor_in_form.selectedIndex].value + "_" +
    payment_method_in_form.options[payment_method_in_form.selectedIndex].value;
  rangekey = range_key_in_form.value;

  if (rangekey === "") {
    var params = {
      TableName: 'BankDetails',
      KeyConditionExpression: "#hk = :v1",
      ExpressionAttributeNames: {
        "#hk": "hashKey (S)"
      },
      ExpressionAttributeValues: {
        ":v1": {
          S: hashkey
        }
      }
    };
    ddb.query(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        show_error_block_other_error();
      } else {
        entryFound = true;
        show_Items_In_Table_Without_Range_Key(data);
      }
    });
  } else {
    var params = {
      RequestItems: {
        'BankDetails': {
          Keys: [{
            "hashKey (S)": {
              S: hashkey
            },
            "rangeKey (S)": {
              S: rangekey
            }
          }]
        }
      }
    };
    ddb.batchGetItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        show_error_block_other_error();
      } else {
        entryFound = true;
        show_Items_In_Table_With_Range_Key(data);
      }
    });
  }

}

function Clicking_submit_change_button() {
  for (let i = 1; i < id_count; i = i + 1) {
    var entryId = "dataEntry" + i;
    var rowEntry = document.getElementById(entryId);
    var cellsInCurrentRow = rowEntry.getElementsByTagName("td");
    var hashKeyValue = cellsInCurrentRow[0].innerText;
    var rangeKeyValue = cellsInCurrentRow[1].innerText;

    var params = {
      TableName: "BankDetails",
      Key: {
        "hashKey (S)": {
          S: hashKeyValue
        },
        "rangeKey (S)": {
          S: rangeKeyValue
        }
      }
    };
    ddb.deleteItem(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });

    var array = hashKeyValue.split("_");

    var marketplaceIdValue = array[0];
    var bankIdValue = array[1];
    var processorValue = array[2];
    var paymentMethodValue = array[3];
    var createdAtValue = cellsInCurrentRow[2].innerText;
    var isActiveValue;
    if (cellsInCurrentRow[3].innerHTML == true) isActiveValue = true;
    else isActiveValue = false;
    var minRangeValue = '' + Number(cellsInCurrentRow[4].innerText);
    var maxRangeValue = '' + Number(cellsInCurrentRow[5].innerText);
    var minTransactionsValue = '' + Number(cellsInCurrentRow[6].innerText);
    var timePeriodValue = '' + Number(cellsInCurrentRow[7].innerText);
    var issuerValue = cellsInCurrentRow[8].innerText;
    var metadataValue = cellsInCurrentRow[9].innerText;
    var currentDate = new Date();
    var updatedAtValue = currentDate.toJSON();

    rangeKeyValue = minRangeValue + "_" + maxRangeValue;
    var parameter = {
      Item: {
        "hashKey (S)": {
          S: hashKeyValue
        },
        "rangeKey (S)": {
          S: rangeKeyValue
        },
        "actionMetadataList (S)": {
          S: metadataValue
        },
        "bankId (S)": {
          S: bankIdValue
        },
        "createdAt (S)": {
          S: createdAtValue
        },
        "isActive (BOOL)": {
          BOOL: isActiveValue
        },
        "marketplaceId (S)": {
          N: marketplaceIdValue
        },
        "maxRange (N)": {
          N: maxRangeValue
        },
        "minRange (N)": {
          N: minRangeValue
        },
        "minTransactions (N)": {
          N: minTransactionsValue
        },
        "paymentMethod (S)": {
          S: paymentMethodValue
        },
        "processor (S)": {
          S: processorValue
        },
        "timePeriod (N)": {
          N: timePeriodValue
        },
        "updatedAt (S)": {
          S: updatedAtValue
        },
        "issuer (S)": {
          S: issuerValue
        }
      },
      TableName: "BankDetails",
      ReturnConsumedCapacity: "TOTAL"
    };

    ddb.putItem(parameter, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log("success", data);
    });

  }
}
