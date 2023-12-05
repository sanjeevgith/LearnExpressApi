const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    //console.log("token",token); //remove space from Bearer hxgwyg
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
      if (err) res.status(403).json("Token is not verified!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};


const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user.role);
    let hasUserRole = false;
    let hasAdminRole = false;
    for (let i = 0; i < req.user.role.length; i++) {
      if (req.user.role[i] == "user") {
        hasUserRole = true;
      } else if (req.user.role[i] == "admin") {
        hasAdminRole = true;
      }
    }
    if (hasUserRole || hasAdminRole) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};


const verifyTokenAndAdminFullcontrol = (req, res, next) => {
    verifyToken(req, res, () => {
      // console.log(req.user.role);
      let hasAdminRole = false;
      for (let i = 0; i < req.user.role.length; i++) {
       if (req.user.role[i] == "admin") {
          hasAdminRole = true;
        }
      }
      if (hasAdminRole) {
        next();
      } else {
        res.status(403).json("You are not allowed to do that! Only admin have permission for this request");
      }
    });
  };

module.exports = { verifyToken, verifyTokenAndAdmin ,verifyTokenAndAdminFullcontrol};
