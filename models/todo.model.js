var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ToDoSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    date: Date, 
    status: String
});

ToDoSchema.plugin(mongoosePaginate);
const Todo = mongoose.model('Todo', ToDoSchema);

module.exports = Todo;