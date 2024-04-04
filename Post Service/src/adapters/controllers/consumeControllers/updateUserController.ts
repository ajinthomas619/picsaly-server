import {Request,Response} from 'express'
import { Userdata } from '../../../utils/interface/interface'

export const updateUserController = async(
    dependencies:any,
    data:Userdata
) => {
    const {
        consumeUsecase:{updateUserUsecase}
    } = dependencies
    console.log('update data',data)

    const response = await updateUserUsecase(dependencies).executeFunction(data)
    console.log('response:',response)
}