import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const {
        query: { idComment },
        method,
    } = req;

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (method) {
        case 'GET':
            // Récupérer un commentaire par son ID
            const comment = await db.collection("comments").findOne({ _id: new ObjectId(idComment) });
            res.json({ status: 200, data: comment });
            break;
            case 'POST':
                // Ajouter un commentaire
            const newComment = await db.collection("comments").insertOne(req.body
