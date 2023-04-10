const http = require('http');

//const products = require('./data/products');

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/productController');

const server = http.createServer((req, res) => {

    if (req.url === '/api/products' && req.method === 'GET') {
        // Do it on controller
        // res.writeHead(200, { 'Content-Type': 'application/json' })
        // res.end(JSON.stringify(products))
        getProducts(req, res);
    }
    // IN express -> /api/products/:id, then inside req.params.id
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    }
    else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    }
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    }
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: ' Route Not Found ' }))
    }


    // For learning 
    // res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/html')
    //res.write('<h1> Hello World </h1>')
    //res.end()

    //res.writeHead(200, { 'Content-Type': 'application/json' })
    //res.write()
    //res.end(JSON.stringify(products))




});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server Running on ${PORT}`))