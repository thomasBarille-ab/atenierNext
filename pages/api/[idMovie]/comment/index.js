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
    switch (method) {
        case 'GET':
            try {
                // Si idComment est fourni, récupérer un seul commentaire, sinon récupérer tous les commentaires
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
