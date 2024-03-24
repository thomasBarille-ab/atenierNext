import clientPromise from "../../../lib/mongodb";
/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: L'identifiant unique du film.
 *         title:
 *           type: string
 *           description: Le titre du film.
 *         director:
 *           type: string
 *           description: Le réalisateur du film.
 *         year:
 *           type: integer
 *           description: L'année de sortie du film.
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: Les genres du film.
 *       example:
 *         _id: "123456789"
 *         title: "Inception"
 *         director: "Christopher Nolan"
 *         year: 2010
 *         genre: ["Action", "Adventure", "Sci-Fi"]
 * tags:
 *   - name: Movies
 *     description: Opérations sur les films
 *
 * @swagger
 * /api/movies:
 *   get:
 *     tags: [Movies]
 *     summary: Récupère tous les films
 *     description: Renvoie une liste de tous les films disponibles dans la base de données.
 *     responses:
 *       200:
 *         description: Une liste de films a été récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *
 *   post:
 *     tags: [Movies]
 *     summary: Ajoute un nouveau film
 *     description: Crée un nouveau film dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Nouveau film créé avec succès.
 *
 */

export default async function handler(req, res) {
    const { method, body, query: { _id } } = req;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (method) {
        case 'GET':
            try {
                const movies = await db.collection("movies").find({}).limit(10).toArray();
                res.status(200).json({ status: 200, data: movies });
            } catch (error) {
                res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
            }
            break;
        case 'POST':
            try {
                const movie = await db.collection("movies").insertOne(body);
                res.status(201).json({ status: 201, data: movie.ops[0] });
            } catch (error) {
                res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
            }
            break;
        case 'PUT':
            try {
                if (!_id) {
                    return res.status(400).json({ status: 400, message: "Movie ID is required" });
                }
                const updated = await db.collection("movies").updateOne({ _id: new ObjectId(_id) }, { $set: body });
                if (updated.matchedCount === 0) {
                    return res.status(404).json({ status: 404, message: "Movie not found" });
                }
                res.status(200).json({ status: 200, message: "Movie updated successfully" });
            } catch (error) {
                res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
            }
            break;
        case 'DELETE':
            try {
                if (!_id) {
                    return res.status(400).json({ status: 400, message: "Movie ID is required" });
                }
                const deleted = await db.collection("movies").deleteOne({ _id: new ObjectId(_id) });
                if (deleted.deletedCount === 0) {
                    return res.status(404).json({ status: 404, message: "Movie not found" });
                }
                res.status(200).json({ status: 200, message: "Movie deleted successfully" });
            } catch (error) {
                res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}