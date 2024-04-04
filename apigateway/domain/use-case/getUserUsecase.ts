import { UserModel } from '../entities/user';
import { UserRepository } from '../interface/repository/userRepository';
import { GetUserUseCase } from '../interface/useCases/getUserUsecase';
export class GetUser implements GetUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(userId: string): Promise<UserModel | null> {
        const result = await this.UserRepository.getUser(userId);

        return result;
    }
}