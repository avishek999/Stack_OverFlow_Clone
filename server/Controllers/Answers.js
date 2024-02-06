import mongoose from "mongoose";
import Question from "../Models/Question.js";

export const postAnswer = async(req, res) => {
   
    const{ id: _id} = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavaiable...');
    }

    try {
        const updatedQuestion = await Question.findByIdAndUpdate( _id, { $addToSet: {'answer':[{answerBody,userAnswered, userId}]}})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json(error)
    }
}

const updateNoOfQuestions = async (_id, noOfAnswers) =>{
try {
     await Question.findByIdAndUpdate(_id,{ $set:{'noOfAnswers': noOfAnswers}})
} catch (error) {
    console.log(error)
}
}


export const deleteAnswer =async ( req, res) => {
    const {id: _id} = req.params;
    const { answerid, noOfAnswers} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavaiable...');
    }
    if(!mongoose.Types.ObjectId.isValid(answerid)){
        return res.status(404).send('Answere unavaiable...');
    }

    updateNoOfQuestions(_id, noOfAnswers)
    try {
        await Question.updateOne(

            { _id},
            { $pull:{'answer':{ _id: answerid}} }
        )
        res.status(200).json({ message: "Successfully deleted"})
    } catch (error) {
        res.status(405).json(error)
    }
}