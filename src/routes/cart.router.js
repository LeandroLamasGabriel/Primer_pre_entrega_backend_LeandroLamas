const express = require('express')
const router = express.Router()
const fs = require('fs')


router.get("/api/carts/:cid", (req, res) => {
    const cid = parseInt(req.params.cid)
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        let cart = JSON.parse(data)
        if (!cid) {
            res.json(cart)
        } else {
            let item = cart.find((c) => c.cid == cid)
            res.json(item)
        }
    })
})

router.post("/api/:cid/carts/:pid", (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        let cart = JSON.parse(data)

        if (!cid) {
            const newProductCart = {
                cid: cart.length + 1,
                Products: [{
                    product: pid,
                    quantity: 1
                }]
            }
            cart.push(newProductCart)
        } else {
            const cartIndex = cart.findIndex(carts => carts.cid === cid)

            if (cart[cartIndex].cid == cid && cart[cartIndex].Products[0].product == pid) {
                cart[cartIndex].Products[0].quantity = cart[cartIndex].Products[0].quantity + 1
            }
            console.log(cart[cartIndex].cid, cartIndex, cart[cartIndex].Products[0].quantity)
        }

        fs.writeFile('cart.json', JSON.stringify(cart), err => {
            if (err) {
                console.log(err)
            }
        })

        res.json({ message: "Producto agregado al carrito" })
    })
})

module.exports = router