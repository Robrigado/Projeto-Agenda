const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    };

    async logIn() {
        this.validate();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({email: this.body.email});
        
        if(!this.user || !bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Email e/ou senha inválidos.');
            this.user = null;
            return;
        }
    }

    async register() {
        this.validate();
        if(this.errors.length > 0) return;
        
        await this.userExists();
        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    };

    async userExists() {
        try {
            this.user = await LoginModel.findOne({email: this.body.email});
            if(this.user) this.errors.push('Usuário já cadastrado.');
        } catch (e) {
            console.log(e);
        }
    }

    validate() {
        this.cleanUp();

        //e-mail válido
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido!');

        //senha 6 a 12 caracteres
        if(this.body.password.length < 6 || this.body.password.length > 12) this.errors.push('Senha precisa ter entre 6 e 12 caracteres!')

    };

    cleanUp() {
        for(const key in this.body){
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    };
}

module.exports = Login;