import express, {NextFunction, Request, Response} from "express";

const app = express();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000


app.get("/testApi", (req: Request, res: Response) => {
    res.send("L'api pokemon est active")
})


app.listen(PORT, () => {
    console.log(`le serveur est en cours d'execution sur le port ${PORT}`);
})