import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * /api/movie/{idMovie}:
 *   get:
 *     summary: Récupère un film par son ID
 *     description: Renvoie les détails d'un film spécifique par son ID.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: ID unique du film à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails d'un film.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       405:
 *         description: Méthode non autorisée
 * 
 *   post:
 *     summary: Ajoute un nouveau film
 *     description: Insère un nouveau film dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Nouveau film créé.
 * 
 *   put:
 *     summary: Modifie un film existant
 *     description: Met à jour les détails d'un film existant par son ID.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: ID unique du film à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Film mis à jour.
 * 
 *   delete:
 *     summary: Supprime un film
 *     description: Supprime un film de la base de données par son ID.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: ID unique du film à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Film supprimé.
 * 
 */

export default async function handler(req, res) {
    const {
        query: { idMovie },
        method,
    } = req;

    const client = await clientPromise;
    const db = client.db("sample_mflix");
    
    switch (method) {
        case 'GET':
            // Récupérer un film par son ID
            const movie = await db.collection("movies").findOne({ _id: new ObjectId(idMovie) });
            res.json({ status: 200, data: movie });
            break;
            case 'POST':
                // Ajouter un film (exemple simplifié, normalement vous auriez des données dans req.body)
            const newMovie = await db.collection("movies").insertOne(req.body);
            res.json({ status: 201, data: newMovie });
            break;
            case 'PUT':
                // Modifier un film
            const updatedMovie = await db.collection("movies").updateOne({ _id: new ObjectId(idMovie) }, { $set: req.body });
            res.json({ status: 200, data: updatedMovie });
            break;
            case 'DELETE':
                // Supprimer un film
            const deletedMovie = await db.collection("movies").deleteOne({ _id: new ObjectId(idMovie) });
            res.json({ status: 200, data: deletedMovie });
            break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
    }
}
