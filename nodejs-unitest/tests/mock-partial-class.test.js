import { UserRepository } from '../src/user-repository';
import { UserService } from '../src/user-service';


const repository = new UserRepository();
const service = new UserService(repository);

it('mock partial class', () => {
    const findByIdMock = jest.spyOn(repository, 'findById');

    const user = {
        id: 1,
        name: 'Eko'
    };

    findByIdMock.mockReturnValue(user);

    expect(service.findById(100)).toEqual(user);
    expect(repository.findById).toHaveBeenCalled();
    expect(repository.findById).toHaveBeenCalledTimes(1);
    expect(repository.findById).toHaveBeenCalledWith(100);
});

it.failing('unmock partial class', () => {
    service.findAll();
});

