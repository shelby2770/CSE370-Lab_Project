const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const SSLCommerzPayment = require("sslcommerz-lts");
const bodyParser = require("body-parser");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

//middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));

const port = process.env.PORT || 3000;
const adminPassword = encodeURIComponent("FjtC9uLm7q-#-Vt");
const uri = `mongodb+srv://adnanistiaque2770:${adminPassword}@cluster0.lzpc6sb.mongodb.net/?retryWrites=true&w=majority`;
const store_id = "370ev65770ff6936c9";
const store_passwd = "370ev65770ff6936c9@ssl";
const is_live = false;
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
  gender: String,
  contact_no: Array,

  cart: {
    type: Array,
    default: [],
  },
  purchase_info: {
    type: Array,
    default: [],
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
  star_rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});
const Review = mongoose.model("Review", reviewsSchema);

const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  event_list: {
    type: Array,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
});
const OrderCollection = mongoose.model("Order", orderSchema);

const adminSchema = new mongoose.Schema({
  id: String,
});
const Admin = mongoose.model("Admin", adminSchema);

const tran_id = new ObjectId().toString();
//CRUD operations
app.post("/order", async (req, res) => {
  //sslcommerz init
  const data = {
    total_amount: req.body.total_amount,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:${port}/payment/success/${tran_id}`,
    fail_url: "http://localhost:3000/fail",
    cancel_url: "http://localhost:3000/cancel",
    ipn_url: "http://localhost:3000/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: req.body.name,
    cus_email: req.body.email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });

    const finalOrder = {
      user_id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      event_list: req.body.user_item,
      transactionId: tran_id,
    };
    const newOrder = new OrderCollection(finalOrder);
    const result = newOrder.save();
    console.log("Redirecting to: ", GatewayPageURL);
  });

  app.post("/payment/success/:tran_id", async (req, res) => {
    res.redirect(`http://localhost:5173/payment/success/${req.params.tran_id}`);
  });
});

app.get("/orders", async (req, res) => {
  try {
    const Orders = await OrderCollection.find();
    res.send(Orders);
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    res.send(user);
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

app.get("/admins", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.send(admins);
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const Order = await OrderCollection.findOne({
      transactionId: req.params.id,
    });
    res.send({ Order });
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res.send({ success: "saved new user" });
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.post("/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const result = await newEvent.save();
    res.send({ success: "Event added successfully" });
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
    const result = await newReview.save();
    res.send("Got your review");
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.post("/admins", async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const result = await newAdmin.save();
    res.send({ success: "New Admin Added" });
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          cart: req.body.updatedEvent,
        },
      },
      { new: true }
    );
    // console.log(updateUser);
    res.send(updateUser);
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.put("/users2/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          purchase_info: req.body.updatePurchase,
          cart: [],
        },
      },
      { new: true }
    );
    // console.log(updateUser);
    res.send(updateUser);
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.put("/events/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await Event.updateOne(
      { _id: id },
      {
        $set: {
          capacity: req.body.updatedTicket,
        },
      }
    );
    res.send("got event");
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.put("/events_admin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(req.body);
    const updateUser = await Event.updateOne(
      { _id: id },
      {
        $set: {
          title: req.body.title,
          picture: req.body.picture,
          description: req.body.description,
          location: req.body.location,
          date: req.body.date,
          capacity: req.body.capacity,
          price: req.body.price,
        },
      }
    );
    res.send({ success: "Event edited successfully" });
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.delete("/admins/:id", async (req, res) => {
  try {
    const deleteAdmin = await Admin.deleteOne({ _id: req.params.id });
    // console.log(req.params.id);
    // res.send({ success: "Admin deleted successfully" });
    res.send({ deleteAdmin });
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    const deleteEvent = await Event.deleteOne({ _id: req.params.id });
    // console.log(req.params.id);
    // res.send({ success: "Event deleted successfully" });
    res.send({ deleteEvent });
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
