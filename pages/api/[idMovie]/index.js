import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * /api/movie/{idMovie}:
 *   get:
 *     tags: [Movies]
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
 *   put:
 *     tags: [Movies]
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
 *     tags: [Movies]
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
 */


export default async function handler(req, res) {
    const { method, query: { idMovie }, body } = req;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (method) {
        case 'GET':
                try {
                    // Récupérer un film par son ID
                    const movie = await db.collection("movies").findOne({ _id: new ObjectId(idMovie) });
                    if (!movie) {
                        return res.status(404).json({ error: "Movie not found" });
                    }
                    return res.status(200).json({ status: 200, data: movie });
                } catch (error) {
                    return res.status(500).json({ error: "Internal Server Error", details: error.message });
                }
        case 'POST':
            try {
                // Ajouter un film
                const newMovie = await db.collection("movies").insertOne(body);
                return res.status(201).json({ status: 201, data: newMovie.ops[0] });
            } catch (error) {
                return res.status(500).json({ error: "Internal Server Error", details: error.message });
            }
        case 'PUT':
            try {
                // Modifier un film
                if (!idMovie) {
                    return res.status(400).json({ error: "Movie ID is required for update" });
                }
                const updatedMovie = await db.collection("movies").updateOne({ _id: new ObjectId(idMovie) }, { $set: body });
                if (updatedMovie.matchedCount === 0) {
                    return res.status(404).json({ error: "Movie not found" });
                }
                return res.status(200).json({ status: 200, message: "Movie updated successfully" });
            } catch (error) {
                return res.status(500).json({ error: "Internal Server Error", details: error.message });
            }
        case 'DELETE':
            try {
                // Supprimer un film
                if (!idMovie) {
                    return res.status(400).json({ error: "Movie ID is required for deletion" });
                }
                const deletedMovie = await db.collection("movies").deleteOne({ _id: new ObjectId(idMovie) });
                if (deletedMovie.deletedCount === 0) {
                    return res.status(404).json({ error: "Movie not found" });
                }
                return res.status(200).json({ status: 200, message: "Movie successfully deleted" });
            } catch (error) {
                return res.status(500).json({ error: "Internal Server Error", details: error.message });
            }
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
