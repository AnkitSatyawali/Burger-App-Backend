const jwt = require('jsonwebtoken');
const config = require('../config');
module.exports = (req,res,next) => {
	try {
	const token = req.headers.authorization;
		console.log(token);

	const decodedToken = jwt.verify(token,config.JWT_KEY);
	req.user = {email:decodedToken.email,userId:decodedToken.userId};

	console.log('authorization complete');
	next();
   } catch(error) {
	   console.log(error)
   	 res.status(401).json({message:"Auth failed"});
   }
}