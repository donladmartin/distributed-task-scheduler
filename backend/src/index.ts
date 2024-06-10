import express from "express";
import mongoose from "mongoose";
import taskRouter from "./routes/taskRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", taskRouter);

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));
