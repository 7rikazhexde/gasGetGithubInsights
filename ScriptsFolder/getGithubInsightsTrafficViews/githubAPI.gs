/**
 * Function to get views (Traffic - Visitor - Views) information from GitHub Insights
 * @param {string} repositry_name
 */
function getGithubInsightsTrafficViews (repositry_name) {
  // Get sheet with specified name
  const mySheet = SpreadsheetApp.openById (spreadSheetID).getSheetByName (repositry_name);

  // Set GitHub token in header
  const headers = {
    Authorization: authorizeInfo,
  };
  const options = {
    headers: headers,
  };
  // Request to GitHub
  const requestUrl = 'https://api.github.com/repos/' + username + '/' + repositry_name + '/traffic/views';
  const response = UrlFetchApp.fetch (requestUrl, options);
  const jsonData = JSON.parse (response);
  const rows = jsonData.views.length;
  Logger.log ('Response Data: %s',jsonData);

  // Write timestamp, views, Unique
  for (var i = 0; i < rows; i++) {
    mySheet.insertRows (2, 1);
    // Extract the first 10 digits of timestamp
    mySheet.getRange (2, 1, 1, 1).setValue (jsonData.views[i].timestamp.substr(0, 10));
    mySheet.getRange (2, 2, 1, 1).setValue (jsonData.views[i].count);
    mySheet.getRange (2, 3, 1, 1).setValue (jsonData.views[i].uniques);
  }

  // Merge duplicate data
  var data = mySheet.getDataRange ().getValues ();
  var newData = [];
  for (var i in data) {
    var row = data[i];
    var duplicate = false;
    for (var j in newData) {
      if (row.join () == newData[j].join ()) {
        duplicate = true;
      }
    }
    if (!duplicate) {
      newData.push (row);
    }
  }
  mySheet.clearContents ();
  mySheet
    .getRange (1, 1, newData.length, newData[0].length)
    .setValues (newData);

  return;
}

/**
 * Function to get a list of Github repositories
 * @return {Array} repoList Array containing repository name (string)
 */
function getRepo(){
  // Set GitHub token in header
  const headers = {
    Authorization: authorizeInfo,
  };
  const options = {
    headers: headers,
  };
  // Request to GitHub
  const requestUrl = 'https://api.github.com/users/' + username + '/repos';
  const response = UrlFetchApp.fetch (requestUrl, options);
  const jsonData = JSON.parse (response);
  const length = Object.keys(jsonData).length;
  var repoList = [];
  for(i = 0; i < length; i++){
    // add repository name to array
    repoList.push(jsonData[i].name);
  }
  //Logger.log(repoList);
  return repoList;
}

/**
 * main function
 * @desc Function to search a sheet from a spreadsheet to determine if the specified sheet name exists
 * @returns {boolean} The specified sheet name exists (true) or does not exist (false)
 */
function main(){
  // Get an array of repository names
  var repoList = getRepo();
  // Process to add a sheet of repository name (if the sheet exists, it is not processed)
  isUniqueSheet(repoList);
  var repoList_length = repoList.length;
  for(i=0; i<repoList_length; i++){
    Logger.log ('Repository: %s',repoList[i]);
    getGithubInsightsTrafficViews(repoList[i]);
  }
  // [OPTION] Update process if 'control' sheet is available.
  if(isExistingSheet('control')){
    updateControlSheet();
  }
  return;
}
