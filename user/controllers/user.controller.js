class UserController {
    constructor(userService, tokenService, loggerService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.loggerService = loggerService;
    }
    login = async (req, res) => {
        const { body: { email, password } } = req;
        
        const userPassword = this.userService.getPassword(email);
        
        const channel = await this.loggerService.createChannel();
        
        this.loggerService.sendMessage(channel, 'debug', {email, password});   

        if (!userPassword) {
            const text = 'User with this email is not found';
            res.status(404).send(text);
            
            this.loggerService.sendMessage(channel, 'error', {text, email, password});   
            return;
        }

        if (userPassword !== password) {
            const text = 'Invalid password';
            res.status(400).send(text);
            this.loggerService.sendMessage(channel, 'error', {text, email, password});
            return;
        }

        const token = this.tokenService.create({ email, password })

        res.cookie("btcToken", token, { httpOnly: true });
        
        this.loggerService.sendMessage(channel, 'info', {text: "User is successfully logged in", token});
        res.status(200).json({ token });
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
    verify = (req, res) => {
        const { body: { token } } = req;
        const { error, data } = this.tokenService.verify(token);

        if (error || !data || !this.userService.getPassword(data.email)) {
            res.json(null);
            return;
        }

        res.json(token);
    }
}

module.exports = UserController;