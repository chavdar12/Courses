import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService (fake auth)', () => {
  let users: UserService;
  beforeEach(() => (users = TestBed.inject(UserService)));

  it('logs in the seeded user and logs out', () => {
    expect(users.login('johny@gmail.com', 'wrong')).toBe(false);
    expect(users.isLoggedIn()).toBe(false);

    expect(users.login('johny@gmail.com', '12345')).toBe(true);
    expect(users.currentUser()?.username).toBe('Johny');

    users.logout();
    expect(users.isLoggedIn()).toBe(false);
  });

  it('registers new users and rejects duplicates', () => {
    const pesho = { username: 'Pesho', email: 'pesho@gmail.com', password: '123' };
    expect(users.register(pesho)).toBe(true);
    expect(users.currentUser()?.email).toBe('pesho@gmail.com');

    expect(users.register({ ...pesho, email: 'other@gmail.com' })).toBe(false);
    expect(users.register({ ...pesho, username: 'Other', email: 'johny@gmail.com' })).toBe(false);
  });
});
