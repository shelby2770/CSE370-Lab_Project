const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();

//middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));

const port = process.env.PORT || 3000;
const adminPassword = encodeURIComponent("FjtC9uLm7q-#-Vt");
const uri = `mongodb+srv://adnanistiaque2770:${adminPassword}@cluster0.lzpc6sb.mongodb.net/?retryWrites=true&w=majority`;

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});
const Image = mongoose.model("Image", imageSchema);

const userDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userDetailsSchema);

app.post("/images", async (req, res) => {
  // const { base64 } = req.body;
  try {
    // Image.create({ image: base64 });
    const newImage = new Image(req.body);
    const result = await newImage.save();
    res.send("received");
  } catch (error) {
    console.error("Error adding image to the gallery:", error.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res.send(result);
  } catch (error) {
    console.error("Error adding image to the gallery:", error.message);
  }
});

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//     const userCollection = client.db("slytherUsers").collection("users");
//     const reviewCollection = client.db("slytherUsers").collection("reviews");
//     const productCollection = client.db("slytherUsers").collection("products");

//     app.post("/users", async (req, res) => {
//       const user = req.body;
//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     });

//     app.get("/users", async (req, res) => {
//       const result = await userCollection.find().toArray();
//       res.send(result);
//     });

//     app.post("/reviews", async (req, res) => {
//       const review = req.body;
//       const result = await reviewCollection.insertOne(review);
//       res.send(result);
//     });

//     app.get("/reviews", async (req, res) => {
//       const result = await reviewCollection.find().toArray();
//       res.send(result);
//     });

//     app.post("/products", async (req, res) => {
//       const review = req.body;
//       const result = await productCollection.insertOne(review);
//       res.send(result);
//     });

//     app.get("/products", async (req, res) => {
//       const result = await productCollection.find().toArray();
//       res.send(result);
//     });
//   } finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Everything is ok...");
});

// app.listen(port, () => {
//   console.log(`Running on port ${port}`);
// });

const connectDB = async () => {
  try {
    await mongoose
      .connect(uri, {
        dbName: "slytherUsers",
      })
      .then(() => {
        console.log("Database connect successfully");
      })
      .catch((err) => {
        console.log("connection fail", error);
      });
  } catch (error) {
    console.log("connection fail", error);
  }
};

const main = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
};
main();
