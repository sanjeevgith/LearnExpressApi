const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]  //remove space from Bearer hxgwyg
        jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
            if (err)
                res.status(403).json("Token is not verified!");
            req.user = user;
            next();

        })
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

// const verifyTokenAndAdmin = (req, res, next) => {
//     verifyToken(req, res, () => {
//       if (req.user.role ==="admin") {
//         next();
//       } else {
//         res.status(403).json("You are not alowed to do that!");
//       }
//     });
//   };


module.exports = verifyToken ;