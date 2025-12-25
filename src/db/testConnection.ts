import { pool } from "./pool.js";

const dbTestConnection = async (): Promise<any> => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Neon connected 💾");
    console.log("Server time: ", result.rows[0]);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
};

dbTestConnection();
