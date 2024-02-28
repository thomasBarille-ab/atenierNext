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

    switch (method) {
     case 'GET':
      // Récupérer tous les films
            try {
             const movies = await db.collection("movies").find({}).toArray();
             res.status(200).json({ status: 200, data: movies });
            } catch (error) {
             res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;
            default:
             res.setHeader('Allow', ['GET']);
             res.status(405).end(`Method ${method} Not Allowed`);
    }
}