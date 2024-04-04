import { UserModel } from '../entities/user';
import { UserRepository } from '../interface/repository/userRepository';
import { GetUserByEmailUseCase } from '../interface/useCases/getUserByEmailUsecase';
export class GetUserByEmail implements GetUserByEmailUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(email: string): Promise<UserModel | null> {
        const result = await this.UserRepository.getUserByEmail(email);
        return result;
    }
}