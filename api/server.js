const express = require("express")
const db = require("../data/dbConfig.js")

const server = express()
server.use(express.json())

server.post("/api/accounts", async (req, res) => {
    const postData = req.body
    try {
        const accountsPost = await db("accounts").insert(postData)
        res.status(201).json({ id: accountsPost[0], ...postData })
    } catch (err) {
        res.status(500).json({
            error: "Unable to create account"
        })
    }
})

server.get("/api/accounts", async (req, res) => {
    try {
        const accountsGet = await db("accounts")
        res.status(200).json(accountsGet)
    } catch (err) {
        res.status(500).json({
            error: "Error to get accounts"
        })
    }
})

server.get("/api/accounts/:id", async (req, res) => {
    const { id } = req.params

    try {
        const accountsGetId = await db("accounts").where({ id })
        if (accountsGetId) {
            res.status(200).json(accountsGetId)
        } else {
            res.status(404).json({
                error: "Invalid account"
            })
        }
    } catch {
        res.status(500).json({
            error: "Error to get account"
        })
    }
})

server.put("/api/accounts/:id", async (req, res) => {
    const { id } = req.params
    const putBody = req.body

    try {
        const accountsPutId = await db("accounts").update(putBody).where({ id })
        if (accountsPutId) {
            res.json({ id: id, ...putBody })
        } else {
            res.status(404).json({
                error: "Invalid account"
            })
        }
    } catch {
        res.status(500).json({
            error: "Error to update account"
        })
    }
})

server.delete("/api/accounts/:id", async (req, res) => {
    const { id } = req.params

    try {
        const accountsDelete = await db("accounts").del().where({ id })
        if (accountsDelete) {
            res.status(201).json({ deleted: id })
        } else {
            res.status(404).json({
                error: "Invalid account"
            })
        } 
    } catch (err) {
        res.status(500).json({
            error: "Error to delete account"
        })
    }
})

module.exports = server