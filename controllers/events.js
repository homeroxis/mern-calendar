
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const Evento = require('../models/Evento');

const getEventos = async( req, res = response ) => {

  const eventos = await Evento.find()
                              .populate('user', 'name');

  return res.json({
    ok: true,
    eventos
  })
}

const crearEvento = async( req, res = response ) => {

  const evento = new Evento( req.body );

  try {

    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    return res.status(200).json({
      ok: true,
      evento: eventoGuardado
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const actualizarEvento = async( req, res = response ) => {

  const eventoId = req.params.id;
  const uid = req.uid;

  try {

    const evento = await Evento.findById( eventoId );

    if ( !evento ) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if ( evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true  } );

    return res.status(200).json({
      ok: true,
      evento: eventoActualizado
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}

const borrarEvento = async( req, res = response ) => {

  const eventoId = req.params.id; // este es el id que viene por la url
  const uid = req.uid;

  try {

    const evento = await Evento.findById( eventoId );

    if ( !evento ) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if ( evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de borrar este evento'
      });
    }

    const eventoEliminado = await Evento.findByIdAndDelete( eventoId );

    return res.status(200).json({
      ok: true,
      evento: eventoEliminado
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  borrarEvento
}