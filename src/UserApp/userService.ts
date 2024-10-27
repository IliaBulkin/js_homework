const userRepository = require('../repositories/userRepository');

async function login(email: any, password: any) {
    const user = await userRepository.findByEmail(email);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
}

async function register(userData: any) {
    const existingUser = await userRepository.findUserByEmail(userData.email);

    if (existingUser !== "Not Found") {
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