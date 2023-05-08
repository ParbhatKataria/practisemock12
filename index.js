const app = require('express')();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const { WasteModel } = require('./model/waste.model');
const connection = mongoose.connect('mongodb+srv://parbhat:parbhat@cluster0.lansvyo.mongodb.net/waste?retryWrites=true&w=majority')

app.get('/', async(req,res)=>{
    try {
        let data = await WasteModel.find();
        res.send(data);
    } catch (error) {
        res.send('data not found')
    }
})

app.post('/', async(req,res)=>{
    let item = req.body;
    try {
        let data = WasteModel({...item});
        await data.save();
        res.send('data is stored');
    } catch (error) {
        res.send('data is not able to store');
    }
})

app.patch('/:id', async(req,res)=>{
    let item = req.body;
    let id = req.params.id;
    try {
        let data = await WasteModel.findByIdAndUpdate(id, item, {new:true});
        res.send(data);
    } catch (error) {
        res.send('data is not updated');
    }
})

app.delete('/:id', async(req,res)=>{
    try {
        let id = req.params.id;
        let data = await WasteModel.findByIdAndDelete(id, {new:true});
        res.send(data);
    } catch (error) {
        res.send('data is not deleted')
    }
})

app.listen(4500, async(req, res)=>{
    try {
        await connection;
        console.log('database is running')
    } catch (error) {
        console.log('database is not running')
    }
})