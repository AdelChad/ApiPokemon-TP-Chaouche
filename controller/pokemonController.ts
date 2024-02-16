import axios , { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";
import { API_ERROR_MESSAGE, API_ERROR_MESSAGE_LOCATION } from "../constantes/errorCodes";
import { PokemonData } from "../interfaces/Pokemon";
import { LocationPokemon } from "../interfaces/Location-Pokemon";

/**
 * @swagger
 * tags:
 *  name: Pokemon
 *  description: Opération lié aux pokémons
 */

export class PokemonController {

    private BASE_URL_POKEMON: string;

    constructor(base_url: string){
        this.BASE_URL_POKEMON = base_url;
    }

    /**
     * @swagger
     * /pokemon:
     *  get: 
     *      summary: Obtient une liste de pokémons.
     *      description: Recupérer les informations pour les 20 premiers pokémons.
     *      tags: [Pokemon]
     *      responses:
     *          200:
     *            description: Sccuès, retourne les donnéees.
     *          400:
     *            description: Erreur, lors de la récupération des données pokémons.
     */
    public async getAllPokemon(req: Request, res: Response, next: NextFunction):Promise<void>{

        try{
            const response: AxiosResponse = await axios.get(
                `${this.BASE_URL_POKEMON}/pokemon`
            )
            res.json(response.data);
            
        }catch(error){
            next(new ApiError(API_ERROR_MESSAGE))
        }
    }


    /**
     * @swagger
     * /pokemon/{name}:
     *  get: 
     *      summary: Obtient les informations d'un pokémon.
     *      description: Recupérer les informations d'un pokémon donné.
     *      tags: [Pokemon]
     *      parameters:
     *          - in: path
     *            name: name
     *            required: true
     *            description: Nom du pokémon.
     *            schema:
     *              tpe: string
     *      responses:
     *          200:
     *            description: Sccuès, retourne les donnéees du pokémon.
     *          400:
     *            description: Erreur, lors de la récupération des données du pokémon.
     */

    public async getPokemon(req: Request, res: Response, next: NextFunction):Promise<void>{

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
            next(new ApiError(API_ERROR_MESSAGE))
        }
    }


    /**
     * @swagger
     * /location/{name}:
     *  get: 
     *      summary: Obtient des localisations.
     *      description: Recupérer les locations pour capturé un pokemon.
     *      tags: [Pokemon]
     *      parameters:
     *          - in: path
     *            name: name
     *            required: true
     *            description: Nom du pokémon.
     *            schema:
     *              tpe: string
     *      responses:
     *          200:
     *            description: Sccuès, retourne les localisations.
     *          400:
     *            description: Erreur, lors de la récupération des localisations.
     */

    public async getLocationPokemon(req: Request, res: Response, next: NextFunction): Promise<void>{

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
                            version: location.version_details[1].version.name,
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
            next(new ApiError(API_ERROR_MESSAGE_LOCATION))
        }
    }
}