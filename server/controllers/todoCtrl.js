const TodoModel = require("../model/Todo");

const createToDo = async (req, res) =>{
    const{ message }= req.body;

    if(req.body.message === ""){
        return res.status(401).json({ errorMessage : "Message cannot be empty "});
    }

    //Validation: Check if message is empty or does not meet the length requirements
    if(!message || message.length < 4 || message.length > 20){
        return res
        .status(400)
        .json({ errorMessage: "Message must be between 4 and 20 characters."});
    }
    try{
        const addToDo = await TodoModel.create({ message});
        res.status(200).json({ success: "created", data: addToDo});
    }catch (error){
        console.log(error);
        res.status(500).json({ error:"Internal Server Error"});
    }
};
const getAllToDo =async(req,res) =>{
    try{
        const getToDo = await TodoModel.find({});
        res.status(200).json({ data: getToDo});
    }catch (error){
        console.log(error);
    }
};
//when you see an empty {} object passed to the .find() method, it means that the function is requesting all the documents from the collection.
const deleteToDo = async (req,res)=>{
    try{
        const deleted = await TodoModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "deleted", data:deleted});
    }catch (error){
        console.log(error);
    }
};
//findByIdAndDelete(): This is a Mongoose method that performs two action in one step:
//Find a document by its _id field.
//Delete that document from the collection.

//req.params.id refers to the ID of the ToDo item that you want to delete, which is passed in the URL. For example, if the route is /delete/:id,req.params.id will contain the value of the id.

//A client makes a request to an endpoint like:
//DELETE /todo/12345abcdef
// Where 12345abcdef is the ID of the ToDo item to be deleted.

//Route Handler:
//The ID(12345abcdef) gets assigned too req.params.id.

//Mongoose Operation:
//finfByIdAndDelete(req.params.id) runs and looks for the document with _id:12345abcdef in the MongoDB collection.

//Deletion Outcome:
// If found, the document is deleted and returned to the deleted variable.
//If not found, deleted will be null.

const updateToDo = async (req, res) =>{
    try{
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.id,
            {
                message:req.body.message,
            },
            { new: true}
        );
        if(updatedTodo){
            res.json({ success: "updated", data: updatedTodo});
        } else{
            res.status(404).json({ error: "Todo not found"});
        }
    }catch(error){
        res.status(400).json({ error: error.message});
    }
};

//{new: true}: This option tells Nongoose to return the uodated document instead of the old one. without {new : true}, Mongoose would return the document as it was before the update.
//This ensures that the newly updated version of thr document is returned

module.exports = {
    createToDo, //if you want to export all the function. then you have to use brackets.
    getAllToDo,
    updateToDo,
    deleteToDo,
};