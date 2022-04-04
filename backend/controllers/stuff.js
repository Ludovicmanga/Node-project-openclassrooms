const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => {
    const ThingObject = JSON.parse(req.body.thing);
    delete ThingObject._id;
    const thing = new Thing({
        ...ThingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré ! '}))
        .catch(error => res.status(400).json({ error }))
}

exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }))
}

exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }))
}

exports.deleteOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing => {
            if(!thing) {
                return res.status(404).json({
                    error: new Error('Objet non trouvé')
                })
            }
            if(thing.userId !== req.auth.userId){
                return res.status(400).json({
                    error: new Error('Requête non autorisée')
                })
            }
            Thing.deleteOne({_id: req.params.id})
                .then(() => res.status(202))
                .catch(error => res.status(400).json({ error }))
        })
}

exports.modifyOneThing = (req, res, next) => {
    const thingObject = req.file ?
      {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };