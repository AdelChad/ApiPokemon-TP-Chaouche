import { CUSTOME_ERROR_NAME } from "../constantes/errorCodes";

export class CustomError extends Error {
    errorcode:number;
    constructor(message:string, errorcode: number){
        super(message);
        this.name = CUSTOME_ERROR_NAME
        this.errorcode = errorcode
    }
}