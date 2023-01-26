const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    sobrenome: { type: String, require: false, default: ''},
    telefone: { type: String, require: false, default: ''},
    email: { type: String, require: false, default: ''},
    creationDate: { type: Date, default: Date.now},
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contato = null;
    };

    static async buscaId(id) {
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findById(id);
        return contato;
    };

    async register() {
        this.validate();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    };


    validate() {
        this.cleanUp();

        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido!');
        if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
        if(!this.body.telefone && !this.body.email) this.errors.push('É necessário informar pelo menos uma forma de contato.')

    };

    cleanUp() {
        for(const key in this.body){
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.sobrenome,
            telefone: this.body.telefone,
            email: this.body.email
        };
    };
}

module.exports = Contato;