const http = require('http')

const port = 5000

const serverHandle = require('../app.js')

const serve = http.createServer(serverHandle)

serve.listen(port)