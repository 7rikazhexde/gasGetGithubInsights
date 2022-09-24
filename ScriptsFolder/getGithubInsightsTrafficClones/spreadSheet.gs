/**
 * [Option] Function to register an event handler when a cell in a spreadsheet is edited
 * @todo Manual execution only once when registering (select createEditTrigger from "Select a function to execute" under the menu bar and click execute on the left)
 * @see https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getactive
 * @todo If you get an error, set the following scope in appsscript.json and approve it
 * https://www.googleapis.com/auth/spreadsheets
 * @see https://developers.google.com/apps-script/reference/script/script-app#newTrigger(String)
 * @todo If error occurs, set the following scope to appsscript.json and approve
 * https://www.googleapis.com/auth/script.scriptapp
 */
/*
function createEditTrigger() { 
  var sheet = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('onEditCell') // Specify the function name to register as a new trigger
          .forSpreadsheet(sheet)
          .onEdit() // Set to trigger on change
          .create();
  return;
}
*/
  
/**
 * [Option] Event handler(InstallableTriggers) when a cell in a spreadsheet is edited
 * @param {Event} e The onEdit event.
 * @see https://developers.google.com/apps-script/guides/triggers#onedite
 * @see https://qiita.com/neras_1215/items/5dea01aecda9f93935bd
 */
/*
function onEditCell(e) {
  if ( e.source.getSheetName() == 'control'){ 
    if (e.value === 'TRUE') {
      main();
    }
  }
  // Exit if the checkbox is not TRUE
  return;
}
*/

/**
 * [Option] Event handler(SimpleTriggers) when a cell in a spreadsheet is edited
 * @todo createEditTrigger() and remove or commen out onEdit(e) after execution.
 * @param {Event} e The onEdit event.
 * @see https://developers.google.com/apps-script/guides/triggers#onedite
 */
/*
function onEdit(e) {
  if ( e.source.getSheetName() == 'control'){ 
    if (e.value === 'TRUE') {
      main();
    }
  }
  // Exit if the checkbox is not TRUE
  return;
}
*/

/**
 * [OPTION] Function to allow main() function to be executed from a smart phone
 */
/*
function enableSmartPhoneActionSupport(){
  checkAddSheet('control');
  createEditTrigger();
  return;
}
*/

/**
 * Function to search for a sheet in a spreadsheet and determine if the specified sheet name exists or not.
 * @param {string} sheetName
 * @return {boolean} The specified sheet name exists (true) or does not exist (false)
 */
function isExistingSheet(sheetName) {
  var spreadsheet = SpreadsheetApp.openById(spreadSheetID)
  var mySheets = spreadsheet.getSheets();
  // Execute a for loop for the number of sheets in the spreadsheet
  var flag = false;
  for(var i = 0; i< mySheets.length; i++){
  // If a sheet matching the sheet name exists
  if(sheetName == mySheets[i].getSheetName()){
    // flag is set to true and the loop process is terminated
    flag = true;
    break;
    }
  }
  return flag;
}

/**
 * [Option] function for updating control sheet
 * @desc Change cell A1 on the control sheet to FALSE
 */
function updateControlSheet(){
  var spreadsheet = SpreadsheetApp.openById(spreadSheetID)
  var sheet = spreadsheet.getSheetByName('control');
  sheet.getRange("A1").setValue('FALSE');
  return;
}
  
/**
  * Sheet Creation Functions
  * @param {string} sheetName
  * @desc Add a new sheet to the spreadsheet
  */
function checkAddSheet(sheetName) {
  var spreadsheet = SpreadsheetApp.openById(spreadSheetID)
  if(!isExistingSheet(sheetName)){
    // Add to Sheet
    var newSheet = spreadsheet.insertSheet();
    newSheet.setName(sheetName);
    var sheet = spreadsheet.getSheetByName(sheetName);
    // Initial value addition
    if(sheetName != 'control'){
      sheet.getRange('A1').setValue('timestamp');
      sheet.getRange('B1').setValue('count');
      sheet.getRange('C1').setValue('uniques'); 
    }
    // [OPTION] Initialize 'control' sheet
    else if(sheetName == 'control'){
      if (sheet.getRange('A1').isBlank()){
        sheet.getRange('A1').insertCheckboxes();
      }
    }
  }
  return;
}

/**
 * Function to execute sheet creation functions for a list of sheets
 * @see sheetList
 */
function isUniqueSheet(sheetList){
  for(var i=0; i < sheetList.length; i++){
    checkAddSheet(sheetList[i]);
  }
  return;
}