class UserService {
    constructor(db) {
        this.db = db;
    }

    getPassword = (email) => {
        const users = this.db.read();
        return users[email];
    }
    save = async ({ email, password }) => {
        if (!email || !password)  return Error("Email and password should be present");
        
        const users = this.db.read();
    
        const error = await this.db.save({
            ...users,
            [email]: password
        });
    
        return error;
    }
}

module.exports = UserService;