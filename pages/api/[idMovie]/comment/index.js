import clientPromise from "../../../../lib/mongodb";

/**
 * @swagger
 * /api/movie/comments:
 *   get:
 *     summary: Récupère tous les commentaires
 *     description: Renvoie une liste de tous les commentaires liés à des films disponibles dans la base de données.
 *     responses:
 *       200:
 *         description: Une liste de commentaires.
 *         
 */
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const comments = await db.collection("comments").find({}).toArray();
        res.json({ status: 200, data: comments });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
