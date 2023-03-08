const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    // const salt = bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // bcrypt automatically generates the salt as well as the hash, 10 is the number of rounds that are generated with the salt
    // adding a salt ensures that the password is unique

    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name == req.body.name);


  if(user==null){
    return res.status(400).send('Cannot find user');
  }
   try {
     if(await bcrypt.compare(req.body.password, user.password) ){
       res.send("Success");
     }
     else{
        res.send("Not allowed");
     }
   } catch (error) {
      res.status(500).send();
   }

});

app.listen(3000, () => {
  console.log("Hello there");
});
