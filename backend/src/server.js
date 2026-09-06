import "dotenv/config";
import app from "./app.js";
import { bootstrapAdmin } from "./lib/bootstrapAdmin.js";

const PORT = process.env.PORT || 4000;

const start = async () => {
    await bootstrapAdmin();

    app.listen(PORT, () => {
        console.log(`AiLysium API listening on port ${PORT}`);
    });
};

start();