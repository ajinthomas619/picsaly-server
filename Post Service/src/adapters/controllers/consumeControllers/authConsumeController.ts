import {Request,Response} from 'express'
import {Userdata} from '../../../utils/interface/interface'

export const createUserController = async(
    dependencies:any,
    data:Userdata
) => {
    const {
        consumeUsecase:{createUserUsecase}
    } = dependencies
    console.log('dayta =',data)
    const response = await createUserUsecase(dependencies).executeFunction(data)
    console.log('response',response)
}