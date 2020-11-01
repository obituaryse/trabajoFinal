const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const app = express();

const Carrito = require("../models").Carrito;

app.get("/carritos", (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    Carrito.findAndCountAll({
        limit: limit,
        offset: from,
        attributes: ["id", "nit", "nombre"],
    })
        .then(({ count, rows }) => {
            res.json({
                ok: true,
                carritos: rows,
                total: count,
            });
        })
        .catch((err) =>
            res.status(400).json({
                ok: false,
                message: err,
            })
        );
});

app.get("/carritos/:carritoId", (req, res) => {
    let carritoId = req.params.carritoId;

    Carrito.findOne({ where: { id: carritoId } })
        .then((carrito) => {
            if (!carrito) {
                return res.status(404).json({
                    ok: false,
                    message: 'carrito not found'
                })
            }
            return res.json({ ok: true, carrito });
        })
        .catch((err) => res.status(400).json({ ok: false, err }));
});

app.post("/carritos", (req, res) => {
    let body = req.body;

    Carrito.create({
        nit: body.nit,
        nombre: body.nombre
    })
        .then((carrito) => {
            res.status(201).json({
                ok: true,
                carrito,
            });
        })
        .catch((err) =>
            res.status(400).json({
                ok: false,
                err,
            })
        );
});

app.put("/carritos/:carritoId", (req, res) => {
    let carritoId = req.params.carritoId;
    let body = _.pick(req.body, ["nit", "nombre"]);

    Carrito.update(body, {
        where: {
            id: carritoId,
        },
    })
        .then((carrito) =>
            res.json({
                ok: true,
                carrito,
            })
        )
        .catch((err) =>
            res.status(400).json({
                ok: false,
                err,
            })
        );
});

app.delete("/carritos/:carritoId", (req, res) => {
    let carritoId = req.params.carritoId;
    Carrito.destroy({
        where: {
            id: carritoId
        },
    })
        .then((carrito) => {
            if (!carrito) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "No se ha encontrado el carrito",
                    },
                });
            };
            res.status(204).json({
                ok: true,
                carrito: carrito,
            });
        })
        .catch((err) =>
            res.status(400).json({
                ok: false,
                message: err,
            })
        );
});

module.exports = app;
