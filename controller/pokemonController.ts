import axios , { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";
import { API_ERROR_MESSAGE } from "../constantes/errorCodes";
import { MinimalWeatherData } from "../interfaces/MinimalWeatherData";

/**
 * @swagger
 * tags:
 *  name: Weather
 * description: Opération lié à la météo
 */

export class PokemonController {

    private BASE_URL_POKEMON: string;

    constructor(base_url: string){
        this.BASE_URL_POKEMON = base_url;
    }

    /**
     * @swagger
     * /pokemon:
     * get: 
     *      summary: Obtient les liens des 20 premiers pokemons.
     *      description: Recupérer les informations météo pour une ville donnée.
     *      tags: [Weather]
     *      parameters:
     *          - in: path
     *            name: city
     *            required: true
     *            description: Nom de la ville.
     *            schema:
     *              tpe: string
     *      responses:
     *          200:
     *            description: Sccuès, retourne les donnéees météo.
     *          400:
     *            description: Erreur, lors de la récupération des données météo.
     */

    public async getAllPokemon(req: Request, res: Response):Promise<void>{

        try{
            const response: AxiosResponse = await axios.get(
                `${this.BASE_URL_POKEMON}/pokemon`
            )
            res.json(response.data);
            
            
        }catch(error){
            res.send(error)
        }
    }


    /**
     * @swagger
     * /pokemon:
     * get: 
     *      summary: Obtient les liens des 20 premiers pokemons.
     *      description: Recupérer les informations météo pour une ville donnée.
     *      tags: [Weather]
     *      parameters:
     *          - in: path
     *            name: city
     *            required: true
     *            description: Nom de la ville.
     *            schema:
     *              tpe: string
     *      responses:
     *          200:
     *            description: Sccuès, retourne les donnéees météo.
     *          400:
     *            description: Erreur, lors de la récupération des données météo.
     */

    public async getPokemon(req: Request, res: Response):Promise<void>{

        const name: string = req.params.name;

        try{
            const response: AxiosResponse = await axios.get(
                `${this.BASE_URL_POKEMON}/pokemon/${name}`
            )
            res.json(response.data);
            
            
        }catch(error){
            res.send(error)
        }
    }


    /**
     * @swagger
     * /pokemon:
     * get: 
     *      summary: Obtient les liens des 20 premiers pokemons.
     *      description: Recupérer les informations météo pour une ville donnée.
     *      tags: [Weather]
     *      parameters:
     *          - in: path
     *            name: city
     *            required: true
     *            description: Nom de la ville.
     *            schema:
     *              tpe: string
     *      responses:
     *          200:
     *            description: Sccuès, retourne les donnéees météo.
     *          400:
     *            description: Erreur, lors de la récupération des données météo.
     */

    public async getLocationPokemon(req: Request, res: Response):Promise<void>{

        const name: string = req.params.name;

        try{
            const response: AxiosResponse = await axios.get(
                `${this.BASE_URL_POKEMON}/pokemon/${name}/encounters`
            )
            res.json(response.data);
            
            
        }catch(error){
            res.send(error)
        }
    }
}