import app from "./app.js";
import { serverConfig } from "./config/server.config.js";

app.listen(serverConfig.PORT, () => {
    console.log("Server started successfully on port", serverConfig.PORT);
})

export default app;