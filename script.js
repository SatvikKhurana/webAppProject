var id_count;

//data starts here
var arrayOfObjects = [
  {
    actionMetadataList: [
      {
        type: "Suppress",
        emailToId: null,
        subject: null,
        emailFromId: null,
        emailBody: null,
        ticketImpact: null,
        ticketShortDescription: null,
        ticketDetails: null,
        suppressIntervalInMins: null,
      },

      {
        type: "Email",
        emailToId: [
          "in-auto-suppr-notify@amazon.com",
          "in-payx-tech@amazon.com",
          "in-eps-cx@amazon.com",
        ],
        subject: "Amex CC (136321 marketplaceId) is suppressed",
        emailFromId: "in-auto-suppr-dev@amazon.com",
        emailBody:
          "Amex - CC for 136321 marketplaceId is suppressed as the ASR is below 50( min transactions limit set is 5 )",
        ticketImpact: null,
        ticketShortDescription: null,
        ticketDetails: null,
        suppressIntervalInMins: null,
      },
    ],
    bankId: "Amex",
    createdAt: "2019-12-25T12:38:34.658Z",
    hashKey: "136321_Amex_CC",
    isActive: true,
    marketplaceId: "136321",
    maxRange: 50,
    maxTransactions: 2147483647,
    minRange: 0,
    minTransactions: 5,
    paymentMethod: "CC",
    rangeKey: "0_50",
    timePeriod: 6,
    updatedAt: "2019-12-25T12:38:34.658Z",
  },
  {
    actionMetadataList: [
      {
        type: "Suppress",
        emailToId: null,
        subject: null,
        emailFromId: null,
        emailBody: null,
        ticketImpact: null,
        ticketShortDescription: null,
        ticketDetails: null,
        suppressIntervalInMins: null,
      },

      {
        type: "Email",
        emailToId: [
          "in-auto-suppr-notify@amazon.com",
          "in-payx-tech@amazon.com",
          "in-eps-cx@amazon.com",
        ],
        subject: "Amex CC (136321 marketplaceId) is suppressed",
        emailFromId: "in-auto-suppr-dev@amazon.com",
        emailBody:
          "Amex - CC for 136321 marketplaceId is suppressed as the ASR is below 50( min transactions limit set is 5 )",
        ticketImpact: null,
        ticketShortDescription: null,
        ticketDetails: null,
        suppressIntervalInMins: null,
      },
    ],
    bankId: "Amex",
    createdAt: "2019-12-25T12:38:34.658Z",
    hashKey: "136321_Amex_CC",
    isActive: true,
    marketplaceId: "136321",
    maxRange: 50,
    maxTransactions: 2147483647,
    minRange: 2,
    minTransactions: 5,
    paymentMethod: "CC",
    rangeKey: "2_50",
    timePeriod: 6,
    updatedAt: "2019-12-25T12:38:34.658Z",
  },
  {
    actionMetadataList: [
      {
        type: "Suppress",
        emailToId: null,
        subject: null,
        emailFromId: null,
        emailBody: null,
        ticketImpact: null,
        ticketShortDescription: null,
        ticketDetails: null,
        suppressIntervalInMins: null,
      },

      {
        type: "Email",
        emailToId: [
          "in-auto-suppr-notify@amazon.com",
          "in-payx-tech@amazon.com",
          "in-eps-cx@amazon.com",
        ],
        subject: "Amex CC (136321 marketplaceId) is suppressed",
        emailFromId: "in-auto-suppr-dev@amazon.com",
        emailBody:
          "Amex - CC for 136321 marketplaceId is suppressed as the ASR is below 50( min transactions limit set is 5 )",
        ticketImpact: null,
        ticketShortDescription: null,
        ticketDetails: null,
        suppressIntervalInMins: null,
      },
    ],
    bankId: "Hdfc",
    createdAt: "2019-12-25T12:38:34.658Z",
    hashKey: "136321_Hdfc_CC",
    isActive: true,
    marketplaceId: "136321",
    maxRange: 50,
    maxTransactions: 2147483647,
    minRange: 0,
    minTransactions: 5,
    paymentMethod: "CC",
    rangeKey: "0_50",
    timePeriod: 6,
    updatedAt: "2019-12-25T12:38:34.658Z",
  },
];
//Data Ends Here

function Clicking_search_button() {
  document.getElementById("area_for_showing_error_message").style.display =
    "none";
  document.getElementById("wrapper_around_table").style.display = "block";

  var hashkey;
  var form = document.getElementById("form");
  var bank_id_in_form = document.getElementById("Bank_id_in_form");
  var marketplace_id_in_form = document.getElementById(
    "Marketplace_id_in_form"
  );
  var payment_method_in_form = document.getElementById(
    "Payment_method_in_form"
  );
  var range_key_in_form = document.getElementById("Range_key_in_form");

  var entryFound = false;
  id_count = 1;
  var table = document.getElementById("table");
  table.innerHTML = "";
  hashkey =
    marketplace_id_in_form.value +
    "_" +
    bank_id_in_form.options[bank_id_in_form.selectedIndex].value +
    "_" +
    payment_method_in_form.options[payment_method_in_form.selectedIndex].value;

  if (range_key_in_form.value === "") {
    table.innerHTML =
      table.innerHTML +
      "<tr>" +
      "<th class='normal_header'><b>HashKey</b></th>" +
      "<th class='normal_header'><b>Is Active</b></th>" +
      "<th class='normal_header'><b>Min Range</b></th>" +
      "<th class='normal_header'><b>Min Transaction</b></th>" +
      "<th class='normal_header'><b>Max Range</b></th>" +
      "<th class='normal_header'><b>Max Transaction</b></th>" +
      "<th class='normal_header'><b>Time Period</b></th>" +
      "<th class='normal_header'><b>Last Updated</b></th>" +
      "<th class='metadata_header'><b>Meta Data</b></th></tr>";

    document.getElementById("wrapper_around_table").style = "block";
    for (let i = 0; i < arrayOfObjects.length; i = i + 1) {
      if (arrayOfObjects[i]["hashKey"] === hashkey) {
        var current_object = arrayOfObjects[i];
        var metadata_string = "";

        for (let j = 0; j < current_object["actionMetadataList"].length; j++) {
          var subobject = current_object["actionMetadataList"][j];
          metadata_string = metadata_string + "{\n";
          for (const key in subobject) {
            if (subobject.hasOwnProperty(key)) {
              const element = subobject[key];
              metadata_string =
                metadata_string + '"' + key + '":' + '"' + element + '",\n';
            }
          }
          metadata_string = metadata_string + "},\n";
        }
        table.innerHTML =
          table.innerHTML +
          "<tr id='dataEntry" +
          id_count +
          "'><td class='normal_value'>" +
          current_object["hashKey"] +
          "</td><td class='normal_value'>" +
          current_object["isActive"] +
          "</td><td contenteditable='true' class='normal_value'>" +
          current_object["minRange"] +
          "</td><td contenteditable='true' class='normal_value'>" +
          current_object["minTransactions"] +
          "</td><td contenteditable='true' class='normal_value'>" +
          current_object["maxRange"] +
          "</td><td contenteditable='true' class='normal_value'>" +
          current_object["maxTransactions"] +
          "</td><td contenteditable='true' class='normal_value'>" +
          current_object["timePeriod"] +
          "</td><td class='normal_value'>" +
          current_object["updatedAt"] +
          "</td><td style='display:none;'>" +
          current_object["rangeKey"] +
          "</td><td>" +
          "<div class='metadata_value_div' >" +
          metadata_string +
          "</div></td>" +
          "</tr>";
        //not using JSON.stringify to the activeMetaDataList because it is causing some display problems
        entryFound = true;
        id_count++;
      }
    }
  } else {
    table.innerHTML =
      table.innerHTML +
      "<tr>" +
      "<th class='normal_header'><b>HashKey</b></th>" +
      "<th class='normal_header'><b>Is Active</b></th>" +
      "<th class='normal_header'><b>Min Range</b></th>" +
      "<th class='normal_header'><b>Min Transaction</b></th>" +
      "<th class='normal_header'><b>Max Range</b></th>" +
      "<th class='normal_header'><b>Max Transaction</b></th>" +
      "<th class='normal_header'><b>Time Period</b></th>" +
      "<th class='normal_header'><b>Last Updated</b></th>" +
      "<th class='metadata_header'><b>Meta Data</b></th></tr>";
    document.getElementById("wrapper_around_table").style = "block";
    //range_key given, so unique tuple
    for (let i = 0; i < arrayOfObjects.length; i = i + 1) {
      if (
        arrayOfObjects[i]["hashKey"] == hashkey &&
        arrayOfObjects[i]["rangeKey"] === range_key_in_form.value
      ) {
        var current_object = arrayOfObjects[i];
        var metadata_string = "";

        for (let j = 0; j < current_object["actionMetadataList"].length; j++) {
          var subobject = current_object["actionMetadataList"][j];
          metadata_string = metadata_string + "{\n";
          for (const key in subobject) {
            if (subobject.hasOwnProperty(key)) {
              const element = subobject[key];
              metadata_string =
                metadata_string + '"' + key + '":' + '"' + element + '",\n';
            }
          }
          metadata_string = metadata_string + "},\n";
        }
        table.innerHTML =
          table.innerHTML +
          "<tr id='dataEntry" +
          id_count +
          "'><td class='normal_value'>" +
          current_object["hashKey"] +
          "</td><td class='normal_value'>" +
          current_object["isActive"] +
          "</td><td contenteditable='true' class='normal_value'>" +
          current_object["minRange"] +
          "</td><td contenteditable='true' class='normal_value'>" +
          current_object["minTransactions"] +
          "</td><td contenteditable='true' class='normal_value'>" +
          current_object["maxRange"] +
          "</td><td contenteditable='true' class='normal_value'>" +
          current_object["maxTransactions"] +
          "</td><td contenteditable='true' class='normal_value'>" +
          current_object["timePeriod"] +
          "</td><td class='normal_value'>" +
          current_object["updatedAt"] +
          "</td><td style='display:none;'>" +
          current_object["rangeKey"] +
          "</td><td>" +
          "<div class='metadata_value_div' >" +
          JSON.stringify(current_object["actionMetadataList"]) +
          "</div></td>" +
          "</tr>";
        entryFound = true;
        id_count++;
      }
    }
  }

  if (entryFound == false) {
    var error_paragraph = document.getElementById("error");
    error_paragraph.innerHTML =
      "Disclaimer: No Entry Found. Check Your Data and Try Again!!!";
    document.getElementById("area_for_showing_error_message").style.display =
      "block";
    document.getElementById("wrapper_around_table").style.display = "none";
  }
}

function Clicking_submit_change_button() {
  for (let i = 1; i < id_count; i = i + 1) {
    var entryId = "dataEntry" + i;
    var rowEntry = document.getElementById(entryId);
    var cellsInCurrentRow = rowEntry.getElementsByTagName("td");
    var hashKeyValue = cellsInCurrentRow[0].innerText;
    var rangeKeyValue = cellsInCurrentRow[8].innerText;
    var time = Date();
    for (let j = 0; j < arrayOfObjects.length; j = j + 1) {
      if (
        arrayOfObjects[j]["hashKey"] == hashKeyValue &&
        arrayOfObjects[j]["rangeKey"] == rangeKeyValue
      ) {
        arrayOfObjects[j]["minRange"] = cellsInCurrentRow[2].innerText;
        arrayOfObjects[j]["minTransactions"] = cellsInCurrentRow[3].innerText;
        arrayOfObjects[j]["maxRange"] = cellsInCurrentRow[4].innerText;
        arrayOfObjects[j]["maxTransactions"] = cellsInCurrentRow[5].innerText;
        arrayOfObjects[j]["timeLimit"] = cellsInCurrentRow[6].innerText;
        arrayOfObjects[j]["updatedAt"] = time;
        arrayOfObjects[j]["rangeKey"] =
          arrayOfObjects[j]["minRange"] + "_" + arrayOfObjects[j]["maxRange"];
      }
    }
  }
}
