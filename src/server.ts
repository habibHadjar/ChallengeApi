import Express, { json } from "express";
import RoutesConfig from "./routes";

const app = Express();
const router = Express.Router();

app.use(json());
app.use(Express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send({ status: "Ok" });
});

app.use("/api", router);

RoutesConfig(router);

try {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => console.info(`API Listening on port ${PORT}`));
} catch (error) {
  console.error("An error occurred while starting the server:", error);
}
