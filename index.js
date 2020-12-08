const app = require("./src/app");
const sequalize = require("./src/config/database");

sequalize.sync();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));