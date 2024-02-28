import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { idComment } = req.query

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (method) {
        case 'GET':
            // Récupérer un commentaire par son ID
            try {
                const comment = await db.collection('comments').findOne({ _id: new ObjectId(idComment) });
                if (!comment) {
                    return res.status(404).json({ status: 404, message: 'Comment not found' });
                }
                res.status(200).json({ status: 200, data: comment });
            } catch (error) {
                res.status(500).json({ status: 500, message: error.message });
            }
            break;
            case 'POST':
                // Ajouter un commentaire
            try {
                const newComment = await db.collection('comments').insertOne(req.body);
                res.status(201).json({ status: 201, data: newComment.ops[0] });
            } catch (error) {
                res.status(500).json({ status: 500, message: error.message });
            }
            break;
            case 'PUT':
                // Modifier un commentaire
            try {
                const updatedComment = await db.collection('comments').updateOne(
                    { _id: new ObjectId(idComment) },
                    { $set: req.body }
                    );
                if (updatedComment.matchedCount === 0) {
                    return res.status(404).json({ status: 404, message: 'Comment not found' });
                }
                res.status(200).json({ status: 200, message: 'Comment updated successfully' });
            } catch (error) {
                res.status(500).json({ status: 500, message: error.message });
            }
            break;
            case 'DELETE':
                // Supprimer un commentaire
            try {
                const deletedComment = await db.collection('comments').deleteOne({ _id: new ObjectId(idComment) });
                if (deletedComment.deletedCount === 0) {
                    return res.status(404).json({ status: 404, message: 'Comment not found' });
                }
                res.status(200).json({ status: 200, message: 'Comment deleted successfully' });
            } catch (error) {
                res.status(500).json({ status: 500, message: error.message });
            }
            break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
    }
}
