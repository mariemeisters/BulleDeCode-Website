import { Pool } from 'pg';
import { User } from "../types/type"


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;

export async function getAllClients() {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT client FROM test ORDER BY client"
    );
    client.release();
    return result.rows.map((row) => row.client);
  }

export async function getProjectsForClient(client: string) {
    const clientDb = await pool.connect();
    const result = await clientDb.query(
      "SELECT id, title, description, client, annee FROM test WHERE client=$1",
      [client]
    );
    clientDb.release();
    return result.rows;
}
  
export async function getUserByEmail(email: string): Promise<User | null> {
    const client = await pool.connect();
    const result = await client.query({
      text:  `SELECT *
              FROM users
              WHERE email = $1`,
      values: [email]
    });
    client.release();
    if (result.rowCount === 0) {
      return null;
    }
    const user: User = {
      pseudo: result.rows[0].pseudo,
      email: result.rows[0].email,
      motdepasse: result.rows[0].motdepasse,
      role: result.rows[0].role
    };
    return user;
  }

  export async function deleteUserByEmail(email: string): Promise<boolean> {
    const client = await pool.connect();
    try {
      const result = await client.query({
        text: `DELETE FROM users WHERE email = $1`,
        values: [email],
      });
  
      if (result.rowCount === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(`Error deleting user with email: ${email}`, error);
      return false;
    } finally {
      client.release();
    }
  }
  