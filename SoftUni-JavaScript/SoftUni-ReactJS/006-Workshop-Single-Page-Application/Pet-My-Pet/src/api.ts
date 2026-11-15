export type Pet = {
    _id: string;
    _ownerId: string;
    name: string;
    description: string;
    imageUrl: string;
    type: string;
};
export type PetInput = Pick<Pet, 'name' | 'description' | 'imageUrl' | 'type'>;
export type User = { _id: string; email: string; accessToken: string };

// Tests point this at their own server instance
export const config = { baseUrl: 'http://localhost:3030' };

export const session = {
    get: (): User | null => JSON.parse(sessionStorage.getItem('user') ?? 'null'),
    set: (user: User) => sessionStorage.setItem('user', JSON.stringify(user)),
    clear: () => sessionStorage.removeItem('user'),
};

async function request<T>(method: string, url: string, body?: unknown): Promise<T> {
    const headers: Record<string, string> = {};
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    const token = session.get()?.accessToken;
    if (token) headers['X-Authorization'] = token;

    const res = await fetch(config.baseUrl + url, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (res.status === 204) return undefined as T;
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
}

const where = (query: string) => `where=${encodeURIComponent(query)}`;
const newestFirst = `sortBy=${encodeURIComponent('_createdOn desc')}`;

export const login = (email: string, password: string) =>
    request<User>('POST', '/users/login', { email, password });
export const register = (email: string, password: string) =>
    request<User>('POST', '/users/register', { email, password });
export const logout = () => request<void>('GET', '/users/logout');

export const getPets = () => request<Pet[]>('GET', `/data/pets?${newestFirst}`);
export const getMyPets = (userId: string) =>
    request<Pet[]>('GET', `/data/pets?${where(`_ownerId="${userId}"`)}&${newestFirst}`);
export const getPet = (id: string) => request<Pet>('GET', `/data/pets/${id}`);
export const createPet = (pet: PetInput) => request<Pet>('POST', '/data/pets', pet);
export const editPet = (id: string, pet: PetInput) => request<Pet>('PUT', `/data/pets/${id}`, pet);
export const deletePet = (id: string) =>
    request<{ _deletedOn: number }>('DELETE', `/data/pets/${id}`);

export const likePet = (petId: string) => request<unknown>('POST', '/data/likes', { petId });
export const getLikes = (petId: string) =>
    request<number>('GET', `/data/likes?${where(`petId="${petId}"`)}&distinct=_ownerId&count`);
export const getMyLike = (petId: string, userId: string) =>
    request<number>(
        'GET',
        `/data/likes?${where(`petId="${petId}" and _ownerId="${userId}"`)}&count`,
    );
