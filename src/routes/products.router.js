const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get("/api/products/:pid", (req, res) => {
    const id = req.params.pid

    fs.readFile('products.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        let products = JSON.parse(data)
        const product = products.find((p) => p.id === parseInt(id))
        if (product) {
            res.json(product)
        } else {
            res.json(products)
        }
    })
})

router.post("/api/products/:pid", (req, res) => {
    const product = req.body
    fs.readFile('products.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        let products = JSON.parse(data)
        const newProduct = {
            id: products.length + 1,
            title: product.title,
            description: product.description,
            code: product.code,
            price: parseInt(product.price),
            status: true,
            stock: parseInt(product.stock),
            category: product.category
        }
        products.push(newProduct)

        fs.writeFile('products.json', JSON.stringify(products), err => {
            if (err) {
                console.log(err)
            }
        })

        res.json({ message: "Producto agregado" })
    })
})

router.put("/api/products/:pid", (req, res) => {
    const id = req.params.pid
    fs.readFile('products.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        let products = JSON.parse(data)
        const product = products.find((p) => p.id === parseInt(id))

        if (product) {
            const body = req.body

            product.title = body.title
            product.description = body.description
            product.code = body.code
            product.price = parseInt(body.price)
            product.status = body.status
            product.stock = parseInt(body.stock)
            product.category = body.category

            res.json(product)
            fs.writeFile('products.json', JSON.stringify(products), err => {
                if (err) {
                    console.log(err)
                }
            })
        }
    })
})

router.delete("/api/products/:pid", (req, res) => {
    const id = req.params.pid
    fs.readFile('products.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        let products = JSON.parse(data)
        products = products.filter((p) => p.id !== parseInt(id))
        fs.writeFile('products.json', JSON.stringify(products), err => {
            if (err) {
                console.log(err)
            }
        })
        res.json({ message: "Producto eliminado" })
    })
})

module.exports = router