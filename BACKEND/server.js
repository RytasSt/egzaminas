const mongoose = require("mongoose");
const app = require("./app");
//qImAXViQtpzFLFvN
const mongoURI =
  "mongodb+srv://RytasSt:qImAXViQtpzFLFvN@cluster0.kfses36.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURI).then(console.log("DB connection established."));

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
