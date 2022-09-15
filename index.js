const server = require('./src/app.js');
const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
    console.log(`listening at ${PORT}`)
  })
  .on("error", (err) => console.log(err))