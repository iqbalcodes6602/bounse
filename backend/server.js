const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes')
const { authUser } = require("./controllers/userController")
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const productRoutes = require('./routes/productRoutes')
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
const cors = require("cors")


dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running");
})


app.use('/api/user', userRoutes)
app.post('/api/user/login', authUser)
app.use("/api/chat", chatRoutes);
app.use('/api/message', messageRoutes);
app.use("/api/product", productRoutes);


app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT;

if (process.env.PORT) {
    app.listen(PORT, console.log(`server started  on port ${PORT}`));
}

module.exports = app;