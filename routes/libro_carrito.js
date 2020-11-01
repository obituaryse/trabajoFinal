const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const app = express();

const LibroCarrito = require("../models").LibroCarrito;

app.get("/libro_carrito", (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    LibroCarrito.findAndCountAll({
        limit: limit,
        offset: from,
        attributes: ["id", "libroId", "carritoId", "cantidad"],
    })
        .then(({ count, rows }) => {
            res.json({
                ok: true,
                libro_carrito: rows,
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

app.get("/libro_carrito/:libroCarritoId", (req, res) => {
    let libroCarritoId = req.params.libroCarritoId;

    LibroCarrito.findOne({ where: { id: libroCarritoId } })
        .then((libro_carrito) => {
            if (!libro_carrito) {
                return res.status(404).json({
                    ok: false,
                    message: 'libro_carrito not found'
                })
            }
            return res.json({ ok: true, libro_carrito });
        })
        .catch((err) => res.status(400).json({ ok: false, err }));
});

app.post("/carrito/:carritoId/libro/:libroId", (req, res) => {
    let body = req.body;

    LibroCarrito.create({
        carritoId: req.params.carritoId,
        libroId: req.params.libroId,
        cantidad: body.cantidad 
    })
        .then((libro_carrito) => {
            res.status(201).json({
                ok: true,
                libro_carrito,
            });
        })
        .catch((err) =>
            res.status(400).json({
                ok: false,
                err,
            })
        );
});

app.put("/libro_carrito/:libroCarritoId", (req, res) => {
    let libroCarritoId = req.params.libroCarritoId;
    let body = _.pick(req.body, ["cantidad"]);

    LibroCarrito.update(body, {
        where: {
            id: libroCarritoId,
        },
    })
        .then((libro_carrito) =>
            res.json({
                ok: true,
                libro_carrito,
            })
        )
        .catch((err) =>
            res.status(400).json({
                ok: false,
                err,
            })
        );
});

app.delete("/libro_carrito/:libroCarritoId", (req, res) => {
    let libroCarritoId = req.params.libroCarritoId;
    LibroCarrito.destroy({
        where: {
            id: libroCarritoId
        },
    })
        .then((libro_carrito) => {
            if (!libro_carrito) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "No se ha encontrado el libro_carrito",
                    },
                });
            };
            res.status(204).json({
                ok: true,
                libro_carrito: libro_carrito,
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
