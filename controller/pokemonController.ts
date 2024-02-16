import axios , { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";
import { API_ERROR_MESSAGE } from "../constantes/errorCodes";
import { PokemonData } from "../interfaces/Pokemon";
import { LocationPokemon } from "../interfaces/Location-Pokemon";

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

            let tabAbilities: Array<string> = []
            let tabTypes: Array<string> = []
            
            
            for(let value of response.data.abilities){
                tabAbilities = [...tabAbilities, value.ability.name]
            }

            for(let value of response.data.types){
                tabTypes = [...tabTypes, value.type.name]
            }

            console.log(response.data.types.type)
            const pokemon: PokemonData = {
                id: response.data.id,
                name: response.data.name,
                type: tabTypes,
                abilities: tabAbilities,
                height: response.data.height,
                weight: response.data.weight,
            }
            
            res.json(pokemon);
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

    public async getLocationPokemon(req: Request, res: Response): Promise<void>{

        const name: string = req.params.name;


        try{
            const response: AxiosResponse = await axios.get(
                `${this.BASE_URL_POKEMON}/pokemon/${name}/encounters`
            )
            let tabLocation: Array<LocationPokemon | string> = []
            
            for(let location of response.data){
                if(location.version_details[1] != undefined){
                    if(location.version_details[1].encounter_details.length > 1){
                        const locationData: LocationPokemon = {
                            name: location.location_area.name,
                            encounterRate: location.version_details[1].encounter_details[1].chance,
                            maxLevel: location.version_details[1].encounter_details[1].max_level,
                            minLevel: location.version_details[1].encounter_details[1].min_level,
                            methodEncounter: location.version_details[1].encounter_details[1].method.name,
                            
                        }
                        tabLocation = [...tabLocation, locationData]
                    }
                }else{
                    tabLocation = [...tabLocation, 'Aucune information trouvé']
                } 
            }
            res.send(tabLocation)
            
        }catch(error){
            res.send(error)
        }
    }
}