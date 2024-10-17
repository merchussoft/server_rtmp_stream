const app = require('./src/server');


app.listen(app.get('port'), () => console.log(`SERVER RUNNING IIN PORT ${app.get('port')}`));