const {default :mongoose} = require('mongoose');    

const connection = async () => {
    try {
        const conn= await mongoose.connect(process.env.MONGO_URI, {         
        });
        if (conn.connection.readyState === 1){
            console.log('Database connected successfully');
        }
        
    } catch (error) {
        console.log('Database connection failed');
    }
}

module.exports = connection;