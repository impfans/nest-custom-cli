export declare type User = any;
export declare class UserService {
    private readonly users;
    constructor();
    findOne(username: string): Promise<User | undefined>;
}
