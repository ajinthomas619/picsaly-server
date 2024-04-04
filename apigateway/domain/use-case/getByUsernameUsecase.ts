import { UserModel } from '../entities/user';
import { UserRepository } from '../interface/repository/userRepository';
import { GetByUsernameUseCase } from '../interface/useCases/getByUsernameUsecase';

export class GetByUsername implements GetByUsernameUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async execute(username: string): Promise<UserModel | null> {
        const result = await this.UserRepository.getByUsername(username);
        return result;
    }
}