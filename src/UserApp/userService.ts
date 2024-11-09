import userRepository from '../UserApp/userRepository';

async function login(email: any, password: any) {
    const user = await userRepository.findUserByEmail(email);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

async function register(userData: any) {
    const existingUser = await userRepository.findUserByEmail(userData.email);

    if (await userRepository.findUserByEmail(userData.email) !== "Not Found") {
        return "User exists";
    }
    const newUser = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role
    };
    const createdUser = await userRepository.createUser(newUser);
    const { password, email, username, role} = createdUser;
    return createdUser;
}

async function authUser(email: string, password: string) {
    let user = await userRepository.findUserByEmail(email);
    if (!user){
        return "error";
    }

    if (user.password != password){
        return "error";
    }

    return user;
}   

const userService = {
    login: login,
    register: register,
    authUser: authUser
}

export default userService