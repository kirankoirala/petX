var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var app = express();
app.use(bodyParser.json());

var customer_queries = require('../db/queries/customer_query')

/* GET users listing. */
router.get('/', function(req, res) {
    function renderData(data){
        res.render('customers', {
            title: 'Customers',
            customers:data
        });
    }
    customer_queries.fetch_all_customers(renderData);

});

router.get('/add',function(req,res){
    res.render('add_customer',{
        title: 'Add Customer'
    });
});

router.get('/edit/:customer_id',function(req,res){
    var customer_id = req.params.customer_id;
    function renderData(data){
        res.render('edit_customer', {
            title: 'Edit Customers',
            customer:data
        });
    }
    customer_queries.get_customer_by_id(customer_id, renderData);
});

router.post('/add',function(req,res){
    customer_queries.add_customer(req.body);
    res.redirect('/');
});

router.post('/edit/update',function(req,res){
    customer_queries.update_customer(req.body);
    res.redirect('/');
});

module.exports = router;
