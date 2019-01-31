const fs = require("fs")
const path = require("path")

const LOGFILEPATH = path.resolve(__dirname, "./confusionLog.txt")

function confusionLog(str, nCommandsMatched) {
  let toLog = "> " + str.padEnd(55)

  toLog += "\t["+new Date().toDateString()+"]"
  if(nCommandsMatched)
    toLog += "\n\t\t[Matched " + nCommandsMatched+" commands]"
  toLog += "\n"
  fs.appendFile(LOGFILEPATH, toLog, callback=>callback)
}
module.exports = confusionLog
