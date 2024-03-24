import clientPromise from "../../../../lib/mongodb";
import {ObjectId} from "mongodb";
/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Opérations sur les commentaires
 *
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - text
 *         - movieId
 *       properties:
 *         _id:
 *           type: string
 *           description: L'ID unique du commentaire.
 *         text:
 *           type: string
 *           description: Le contenu du commentaire.
 *         movieId:
 *           type: string
 *           description: L'ID du film associé au commentaire.
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         text: "C'est un super film !"
 *         movieId: "507f1f77bcf86cd799439011"
 *
 * /api/{idMovie}/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Récupère tous les commentaires liés à un film spécifique
 *     description: Renvoie une liste de tous les commentaires associés à l'ID d'un film fourni en paramètre de requête.
 *     parameters:
 *       - in: query
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du film pour lequel récupérer les commentaires.
 *     responses:
 *       200:
 *         description: Une liste de commentaires associés au film a été récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       400:
 *         description: movieId est requis
 *       500:
 *         description: Erreur interne du serveur
 */


export default async function handler(req, res) {
    const { method, query: { movieId } } = req;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (method) {
        case 'GET':
            try {
                const comments = await db.collection("comments").find({ movieId: new ObjectId(movieId) }).toArray();
                return res.status(200).json({ status: 200, data: comments });
            } catch (error) {
                if (error.message.includes('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')) {
                    return res.status(400).json({ message: "Invalid movieId format" });
                }
                return res.status(500).json({ message: "Internal Server Error", error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
