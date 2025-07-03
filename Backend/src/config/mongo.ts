import { connect } from "mongoose";


const URI_DB = process.env.URI_DB || "mongodb://localhost:27017/db-api-utn";

const connectMongoDB = async () => {
    try {
        await connect(URI_DB)
        console.log("✅ Conexión a MongoDb exitosa");
    } catch (error) {
        console.error("📛 No se pudo conectar a MongoDb:", error);
    }
}

export { connectMongoDB };
