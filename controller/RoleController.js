const RoleRepository = require("../repository/RoleRepository");
exports.getAllRoles = (req, res) => {
    RoleRepository.findAllRole().then(roles => {
        res.json(roles);
    });
}

exports.getRoleById = (req, res) => {
    const {id} = req.body;
    RoleRepository.findRoleById(id).then(role=>{
        res.json(role);
    });
}