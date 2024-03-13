import { postRepository } from "../app/repository";
import { addPostUsecase } from "../useCases/addPostuseCase";
import { showAllPostUsecase } from "../useCases/showAllPostUsecase";


const useCase:any ={
    addPostUsecase,
    showAllPostUsecase
}

const repository = {
    postRepository
}

export default {useCase,repository}