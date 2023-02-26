const app = require("./app");
require("./clients/mongo");
app.listen(app.get('port'))
console.log('server on port', app.get('port'))