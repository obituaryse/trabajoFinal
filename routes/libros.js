const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const app = express();

const Libro = require("../models").Libro;

app.get("/libros/:pagina", (req, res) => {
    let limite = 5 * req.params.pagina;
    let inicio = limite - 5;
    let from = req.query.from || inicio;
    from = Number(from);
    let limit = req.query.limit || limite;
    limit = Number(limit);

    Libro.findAndCountAll({
        limit: limit,
        offset: from,
        attributes: ["id", "titulo", "descripcion", "precio"],
    })
        .then(({ count, rows }) => {
            res.json({
                ok: true,
                libros: rows,
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

app.get("/libros/:libroId", (req, res) => {
    let libroId = req.params.libroId;

    Libro.findOne({ where: { id: libroId } })
        .then((libro) => {
            if (!libro) {
                return res.status(404).json({
                    ok: false,
                    message: 'libro not found'
                })
            }
            return res.json({ ok: true, libro });
        })
        .catch((err) => res.status(400).json({ ok: false, err }));
});

app.post("/libros", (req, res) => {
    let body = req.body;

    Libro.create({
        titulo: body.titulo,
        descripcion: body.descripcion,
        precio: body.precio,
        autorId: body.autorId
    })
        .then((libro) => {
            res.status(201).json({
                ok: true,
                libro,
            });
        })
        .catch((err) =>
            res.status(400).json({
                ok: false,
                err,
            })
        );
});

app.put("/libros/:libroId", (req, res) => {
    let libroId = req.params.libroId;
    let body = _.pick(req.body, ["titulo", "descripcion", "precio", "autorId"]);

    Libro.update(body, {
        where: {
            id: libroId,
        },
    })
        .then((libro) =>
            res.json({
                ok: true,
                libro,
            })
        )
        .catch((err) =>
            res.status(400).json({
                ok: false,
                err,
            })
        );
});

app.delete("/libros/:libroId", (req, res) => {
    let libroId = req.params.libroId;
    Libro.destroy({
        where: {
            id: libroId
        },
    })
        .then((libro) => {
            if (!libro) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "No se ha encontrado el libro",
                    },
                });
            };
            res.status(204).json({
                ok: true,
                libro: libro,
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
