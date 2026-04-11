import { UserRepository } from "../src/user-repository";
import { UserService } from "../src/user-service";

jest.mock('../src/user-repository.js');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

it('mock class save module', () => {
    const user = {
        id: 1,
        name: 'Eko'
    }

    userService.save(user);

    expect(userRepository.save).toHaveBeenCalled();
});

it('mock class findAll module', () => {
    const users = [
        {
            id: 1,
            name: "Eko"
        },
        {
            id: 1,
            name: "Eko"
        }
    ]

    userRepository.findAll.mockReturnValue(users);

    expect(userService.findAll()).toEqual(users);
    expect(userRepository.findAll).toHaveBeenCalled();
});

it('mock class findById module', () => {
    const user = {
        id: 1,
        name: "Eko"
    };

    userRepository.findById.mockReturnValue(user);

    expect(userService.findById(12)).toEqual(user);
    expect(userRepository.findById).toHaveBeenCalled();
})