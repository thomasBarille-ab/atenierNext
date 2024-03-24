import clientPromise from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: "Opérations sur les commentaires"
 *
 * /api/comments/{idComment}:
 *   get:
 *     tags: [Comments]
 *     summary: "Récupère un commentaire par son ID"
 *     description: "Renvoie les détails d'un commentaire spécifique par son ID."
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID unique du commentaire à récupérer."
 *     responses:
 *       200:
 *         description: "Détails d'un commentaire."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: "Commentaire non trouvé."
 *
 *   post:
 *     tags: [Comments]
 *     summary: "Ajoute un nouveau commentaire"
 *     description: "Crée un nouveau commentaire dans la base de données."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: "Nouveau commentaire créé avec succès."
 *
 *   put:
 *     tags: [Comments]
 *     summary: "Modifie un commentaire existant"
 *     description: "Met à jour un commentaire existant dans la base de données par son ID."
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID unique du commentaire à mettre à jour."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: "Commentaire mis à jour avec succès."
 *       404:
 *         description: "Commentaire non trouvé."
 *
 *   delete:
 *     tags: [Comments]
 *     summary: "Supprime un commentaire"
 *     description: "Supprime un commentaire spécifique de la base de données par son ID."
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID unique du commentaire à supprimer."
 *     responses:
 *       200:
 *         description: "Commentaire supprimé avec succès."
 *       404:
 *         description: "Commentaire non trouvé."
 */

export default async function handler(req, res) {
    const { method, query: { idComment }, body } = req;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    if (!idComment && method !== 'POST') {
        return res.status(400).json({ status: 400, message: "idComment is required" });
    }

    try {
        switch (method) {
            case 'GET':
                // Récupérer un commentaire par son ID
                const comment = await db.collection('comments').findOne({ _id: new ObjectId(idComment) });
                if (!comment) {
                    return res.status(404).json({ status: 404, message: 'Comment not found' });
                }
                res.status(200).json({ status: 200, data: comment });
                break;
            case 'POST':
                // Ajouter un commentaire
                const newComment = await db.collection('comments').insertOne(body);
                res.status(201).json({ status: 201, data: newComment.ops[0] });
                break;
            case 'PUT':
                // Modifier un commentaire
                const updatedComment = await db.collection('comments').updateOne(
                    { _id: new ObjectId(idComment) },
                    { $set: body }
                );
                if (updatedComment.matchedCount === 0) {
                    return res.status(404).json({ status: 404, message: 'Comment not found' });
                }
                res.status(200).json({ status: 200, message: 'Comment updated successfully' });
                break;
            case 'DELETE':
                // Supprimer un commentaire
                const deletedComment = await db.collection('comments').deleteOne({ _id: new ObjectId(idComment) });
                if (deletedComment.deletedCount === 0) {
                    return res.status(404).json({ status: 404, message: 'Comment not found' });
                }
                res.status(200).json({ status: 200, message: 'Comment deleted successfully' });
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error", details: error.message });
    }
}
