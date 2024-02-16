import dotenv from "dotenv";
import express, {NextFunction, Request, Response} from "express";
import { PokemonController } from "./controller/pokemonController";
import RequestMiddleware from './middlewares/RequestMiddlerware';
import ResponseMiddleware from './middlewares/ResponseMiddleware';
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config()

const app = express();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000
const BASE_URL: string = process.env.POKEMON_API_URL ? process.env.POKEMON_API_URL : 'default_url'

const pokemonController = new PokemonController(BASE_URL);

app.use(RequestMiddleware);
app.use(ResponseMiddleware);
app.use(errorHandler);

app.get("/testApi", (req: Request, res: Response) => {
    res.send("L'api pokemon est active")
})

app.get('/pokemon', async(req: Request, res: Response, next: NextFunction) => {
    await pokemonController.getAllPokemon(req, res, next)
})

app.get('/pokemon/:name', async(req: Request, res: Response, next: NextFunction) => {
    await pokemonController.getPokemon(req, res, next)
})

app.get('/location/:name', async(req: Request, res: Response, next: NextFunction) => {
    await pokemonController.getLocationPokemon(req, res, next)
})

app.listen(PORT, () => {
    console.log(`le serveur est en cours d'execution sur le port ${PORT}`);
})