const output = process.stdout
const input = process.stdin
const readline = require('readline');
const endOfLine = require('os').EOL

const writeLine = (obj) => {
  const type = typeof obj
  let text = ''
  switch (type) {
    case 'object': text = JSON.stringify(obj); break;
    default: text = obj.toString()
  }

  output.write(text + endOfLine)
}

const rewriteLine = (obj, toLineNo) => {
  readline.cursorTo(output, 0, 0)
  readline.clearScreenDown(output)

  writeLine(obj)
}

const waitForKey = (onKeyPressed) => {
  readline.emitKeypressEvents(input);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else {
      onKeyPressed(key)
    }
  })
}

const applyColor = (words, colorCode) => `${colorCode}${words}${Color.Reset}`

const Color = {
  Reset : "\x1b[0m"
  , Bright : "\x1b[1m"
  , Dim : "\x1b[2m"
  , Underscore : "\x1b[4m"
  , Blink : "\x1b[5m"
  , Reverse : "\x1b[7m"
  , Hidden : "\x1b[8m"
  , FgBlack : "\x1b[30m"
  , FgRed : "\x1b[31m"
  , FgGreen : "\x1b[32m"
  , FgYellow : "\x1b[33m"
  , FgBlue : "\x1b[34m"
  , FgMagenta : "\x1b[35m"
  , FgCyan : "\x1b[36m"
  , FgWhite : "\x1b[37m"
  , BgBlack : "\x1b[40m"
  , BgRed : "\x1b[41m"
  , BgGreen : "\x1b[42m"
  , BgYellow : "\x1b[43m"
  , BgBlue : "\x1b[44m"
  , BgMagenta : "\x1b[45m"
  , BgCyan : "\x1b[46m"
  , BgWhite : "\x1b[47m"
}

module.exports = { writeLine, rewriteLine, waitForKey, applyColor, Color }