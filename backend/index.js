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
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));

const port = process.env.PORT || 3000;
const adminPassword = encodeURIComponent("FjtC9uLm7q-#-Vt");
const uri = `mongodb+srv://adnanistiaque2770:${adminPassword}@cluster0.lzpc6sb.mongodb.net/?retryWrites=true&w=majority`;

//models
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
  },
});
const User = mongoose.model("User", userDetailsSchema);

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: true,
  },
  date: {
    type: String,
    default: true,
  },
  capacity: {
    type: String,
    default: true,
  },
  price: {
    type: String,
    default: true,
  },
});
const Event = mongoose.model("Event", eventSchema);

const reviewsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});
const Review = mongoose.model("Review", reviewsSchema);

//CRUD operations
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.send(reviews);
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.post("/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const result = await newEvent.save();
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.post("/events_many", async (req, res) => {
  try {
    // const newEvent = new Event(req.body);
    const result = await Event.insertMany(req.body);
    res.send(result);
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.post("/reviews", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    console.log(newReview);
    const result = await newReview.save();
    console.log("got review");
    res.send(result);
  } catch (error) {
    console.error("Error: ", error.message);
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
