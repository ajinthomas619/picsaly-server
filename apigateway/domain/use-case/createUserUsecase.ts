import { UserModel } from '../entities/user';
import { UserRepository } from '../interface/repository/userRepository';
import { CreateUserUseCase } from '../interface/useCases/createUserUsecase';

export class CreateUser implements CreateUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(user: UserModel): Promise<UserModel | null> {
        const result = await this.UserRepository.createUser(user);

        if (result) {
            return result;
        } else {
            return null;
        }
    }
}