# gasGetGithubInsights
Google Apps Script (GAS) to get Traffic Data using Github API

## Scripts Folder
* getGithubInsightsTrafficViews  
  Get the **views (Traffic / Visitor / views & unique visitors)** information from GitHub Insights and add it to the spreadsheet you create for each public repository.
* getGithubInsightsTrafficClones  
  Get the **Visitors (Traffic / Git clones / clone & unique cloners)** information from GitHub Insights and add it to the spreadsheet you create for each public repository.

## Usage
### Note
If you encounter scope setting errors, please refer to the comments in the source code and the official documentation.  
Details: https://developers.google.com/apps-script/reference

### Github Setting
#### Obtain a GitHub API key and set permissions
* From the account icon in the upper right corner of GitHub, select [Settings] → [Developer settings] → [Personal access token].
Click [Generate new token] to issue a new token.
* In [Select scopes], check only [public_repo] to target Traffic data in public repositories.
* Details: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

### GAS Setting
#### Create .gs files
* Copy and paste the .gs file from the folder(ex. getGithubInsightsTrafficViews) under the scripts folder to create it.

#### Set personal access token to GAS
* Define in ```spreadSheetID``` in ```getGithubInsights/config.gs```

#### Set Github access token and Request URL to GAS
* Define in ```personalAccessToken``` and ```username``` in ```getGithubInsights/config.gs```

#### Set permissions from script to Google account
* Execute ```main()``` to allow access to your Google account from scripts
  * Browse, edit, create, and delete Google Spreadsheets
  * Connect to external services
  * Allow this application to run when you are not present
* If you are using Japanese language settings, 「シート1」 will be displayed when creating a spreadsheet. This depends on the language setting, but if you do not need it, delete it manually.
* Set project to periodic execution (If periodic execution is enabled.)
  * Set from "Edit" -> "Triggers for current project". set to retrieve once a day)

#### [OPTION] Enable ```main()``` function execution from smart phones
If you want to enable ```main()``` function execution from smartphones, you must register an Event handler (InstallableTriggers) yourself.

 Step1. Enable the following commented out functions below from ```spreadSheet.gs```.  
  * ```createEditTrigger()```
  * ```onEditCell(e)```
  * ```onEdit(e)```
  * ```enableSmartPhoneActionSupport()```
 
 Step2. Execute ```enableSmartPhoneActionSupport()```  
  * If the function execution is successful, the ```onEditCell(e)``` function is added to the list of added triggers.  
  * If you wish to delete ```onEditCell(e)```, please delete it from the "Delete Trigger" menu.

 Step3. Remove or comment out ```function onEdit(e)```  
  * Thereafter, when a user changes a value in a spreadsheet, ```onEditCell(e)``` will be executed.
 

