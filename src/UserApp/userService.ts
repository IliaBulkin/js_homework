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

const userService = {
    login: login,
    register: register
}

export default userService