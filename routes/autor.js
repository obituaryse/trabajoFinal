const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const app = express();

const Autor = require("../models").Autor;

app.get("/autores", (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 5;
    limit = Number(limit);

    Autor.findAndCountAll({
        limit: limit,
        offset: from,
        attributes: ["id", "nombre", "edad", "nacionalidad"],
    })
        .then(({ count, rows }) => {
            res.json({
                ok: true,
                autores: rows,
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

app.get("/autores/:autorId", (req, res) => {
    let autorId = req.params.autorId;

    Autor.findOne({ where: { id: autorId } })
        .then((autor) => {
            if (!autor) {
                return res.status(404).json({
                    ok: false,
                    message: 'autor not found'
                })
            }
            return res.json({ ok: true, autor });
        })
        .catch((err) => res.status(400).json({ ok: false, err }));
});

app.post("/autores", (req, res) => {
    let body = req.body;

    Autor.create({
        nombre: body.nombre,
        edad: body.edad,
        nacionalidad: body.nacionalidad,
    })
        .then((autor) => {
            res.status(201).json({
                ok: true,
                autor,
            });
        })
        .catch((err) =>
            res.status(400).json({
                ok: false,
                err,
            })
        );
});

app.put("/autores/:autorId", (req, res) => {
    let autorId = req.params.autorId;
    let body = _.pick(req.body, ["nombre", "edad", "nacionalidad"]);

    Autor.update(body, {
        where: {
            id: autorId,
        },
    })
        .then((autor) =>
            res.json({
                ok: true,
                autor,
            })
        )
        .catch((err) =>
            res.status(400).json({
                ok: false,
                err,
            })
        );
});

app.delete("/autores/:autorId", (req, res) => {
    let autorId = req.params.autorId;
    Autor.destroy({
        where: {
            id: autorId
        },
    })
        .then((autor) => {
            if (!autor) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "No se ha encontrado el autor",
                    },
                });
            };
            res.status(204).json({
                ok: true,
                autor: autor,
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
