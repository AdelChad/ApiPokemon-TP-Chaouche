import dotenv from "dotenv";
import express, {NextFunction, Request, Response} from "express";
import { PokemonController } from "./controller/pokemonController";

dotenv.config()

const app = express();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000
const BASE_URL: string = process.env.POKEMON_API_URL ? process.env.POKEMON_API_URL : 'default_url'

const pokemonController = new PokemonController(BASE_URL);


app.get("/testApi", (req: Request, res: Response) => {
    res.send("L'api pokemon est active")
})

app.get('/pokemon', async(req: Request, res: Response) => {
    await pokemonController.getAllPokemon(req, res)
})

app.get('/pokemon/:name', async(req: Request, res: Response) => {
    await pokemonController.getPokemon(req, res)
})

app.get('/location/:name', async(req: Request, res: Response) => {
    await pokemonController.getLocationPokemon(req, res)
})

app.listen(PORT, () => {
    console.log(`le serveur est en cours d'execution sur le port ${PORT}`);
})