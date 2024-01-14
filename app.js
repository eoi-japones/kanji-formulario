const express = require("express")

const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "docs")))

app.listen(process.env["PUERTO"] || '3000')
