import { UserModel } from '../entities/user';
import { UserRepository } from '../interface/repository/userRepository';
import {DeleteUserUseCase } from '../interface/useCases/deleteUserUsecase';

export class DeleteUser implements DeleteUserUseCase {
    UserRepository: UserRepository;
    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }
    async execute(userId: string, data: UserModel): Promise<void> {
        await this.UserRepository.deleteUser(userId);
    }
}