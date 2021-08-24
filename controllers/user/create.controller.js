class createUser {
    constructor(userService, tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }
    create = async (req, res) => {
        const { body: { email, password } } = req;
        if (!email || !password) {
            res.status(404).send("You should provide email and password");
            return;
        }

        if (this.userService.getPassword(email)) {
            res.status(404).send('User with this email already exist');
            return;
        }

        const error = await this.userService.save({ email, password });

        if (error) {
            res.status(500).send('Internal server error');
            return;
        }
        const token = this.tokenService.create({ email, password });
        res.cookie("btcToken", token, { httpOnly: true });
        res.status(200).json({ token });
    }
}

module.exports = createUser;
