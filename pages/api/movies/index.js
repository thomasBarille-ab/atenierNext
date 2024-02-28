import clientPromise from "../../lib/mongodb";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Récupère tous les films
 *     description: Renvoie une liste de tous les films disponibles dans la base de données. 
*/
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db.collection("movies").find({}).limit(10).toArray();
    res.json({ status: 200, data: movies });
}