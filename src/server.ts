import { app } from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`UTP Match Backend running on http://localhost:${env.port}${env.apiPrefix}`);
});
