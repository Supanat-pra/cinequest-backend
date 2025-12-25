import { app } from "./app.js";
import { env } from "./config/env.js";

app.get("/", (req, res) => {
  res.send("CineQuest");
});

const startServer = async (): Promise<void> => {
  try {
    app.listen(env.PORT, () => {
      console.log(`✅Server is running on port: ${env.PORT}`);
    });
  } catch (err) {
    console.error("❌Start up error:", err);
    process.exit(1);
  }
};

startServer();
