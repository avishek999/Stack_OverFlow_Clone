import Express from "express";
import mongoose from "mongoose";
import Cors from "cors";


import userRoutes from './Routes/User.js'
import questionRoutes from './Routes/Question.js'
import answerRoutes  from './Routes/Answers.js'

const app = Express();
app.use(Express.json({ limit: "30mb", extended: true }));
app.use(Express.urlencoded({ limit: "30mb", extended: true }));
app.use(Cors());

app.get('/', (req, res) => {
    res.send("This is a Stack overflow Clone API");
});


app.use('/user',userRoutes)
app.use("/questions", questionRoutes);
app.use('/answer', answerRoutes);




const port = process.env.PORT || 5000;

const CONNECTION_URL = "mongodb+srv://avishekprasad0999:12345@stack-overflow-clone.z0a7vbm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(port, () => { console.log(`Server is running on port ${port}`); }))
    .catch((err) => console.log(err.message));