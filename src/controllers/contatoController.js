const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    if(!req.session.user) return res.redirect('/');
    res.render('contato');
    return;
}


exports.registerContact = async (req, res) => {
    try{
        const contato = new Contato(req.body);
        await contato.register();
        
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => {
                return res.redirect('/contato');
            })
            return;
        }
        
        req.flash('success', 'Contato salvo!');
        req.session.save(() => {
            return res.redirect(`/contato/${contato.contato._id}`);
        });
        
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
}

exports.editContact = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscaId(req.params.id);
    console.log(contato);
    if(!contato) return res.render('404');

    return res.render('contato');
}; 