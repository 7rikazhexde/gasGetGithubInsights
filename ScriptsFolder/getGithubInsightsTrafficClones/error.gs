/**
 * Error log output function
 * @param {Error} error Error instance
 * @return {string} Error Name and Stack Trace
 */
function printError(error){
  return "[Error     ] "  + error.name + "\n" + 
         "[StackTrace]\n" + error.stack;
}