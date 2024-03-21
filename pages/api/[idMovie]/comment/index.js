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
 * /api/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Récupère tous les commentaires ou un commentaire spécifique par son ID
 *     description: Renvoie une liste de tous les commentaires ou un commentaire spécifique si un ID est fourni en paramètre de requête.
 *     parameters:
 *       - in: query
 *         name: idComment
 *         required: false
 *         schema:
 *           type: string
 *         description: L'ID unique du commentaire à récupérer.
 *     responses:
 *       200:
 *         description: Une liste de commentaires ou un commentaire spécifique a été récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Erreur interne du serveur
 */

export default async function handler(req, res) {
    switch (method) {
        case 'GET':
            try {
                const comments = idComment
                    ? await db.collection("comments").findOne({ _id: new ObjectId(idComment) })
                    : await db.collection("comments").find({}).toArray();
                res.status(200).json({ status: 200, data: comments });
            } catch (error) {
                res.status(500).json({ status: 500, message: error.message });
            }
            break;
            case 'POST':
                // Ajouter un nouveau commentaire
            try {
                const newComment = await db.collection("comments").insertOne(body);
                res.status(201).json({ status: 201, data: newComment.ops[0] });
            } catch (error) {
                res.status(500).json({ status: 500, message: error.message });
            }
            break;
            case 'PUT':
                // Modifier un commentaire existant
            try {
                if (!idComment) {
                    return res.status(400).json({ status: 400, message: "idComment is required for PUT" });
                }
                const updatedComment = await db.collection("comments").updateOne(
                    { _id: new ObjectId(idComment) },
                    { $set: body }
                    );
                if (updatedComment.matchedCount === 0) {
                    return res.status(404).json({ status: 404, message: "Comment not found" });
                }
                res.status(200).json({ status: 200, message: "Comment updated successfully" });
            } catch (error) {
                res.status(500).json({ status: 500, message: error.message });
            }
            break;
            case 'DELETE':
                // Supprimer un commentaire
            try {
                if (!idComment) {
                    return res.status(400).json({ status: 400, message: "idComment is required for DELETE" });
                }
                const deletedComment = await db.collection("comments").deleteOne({ _id: new ObjectId(idComment) });
                if (deletedComment.deletedCount === 0) {
                    return res.status(404).json({ status: 404, message: "Comment not found" });
                }
                res.status(200).json({ status: 200, message: "Comment deleted successfully" });
            } catch (error) {
                res.status(500).json({ status: 500, message: error.message });
            }
            break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
    }
}
