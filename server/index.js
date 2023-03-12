import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "150mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from OpenAI");
});

(async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (err) {
    console.log(err);
  }
})();
