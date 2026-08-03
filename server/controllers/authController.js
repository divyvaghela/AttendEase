    const User = require("../models/User");
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");



    // ================= REGISTER =================

    const register = async (req, res) => {

        try {

            const {
                name,
                email,
                password
            } = req.body;



            const existingUser = await User.findOne({
                email
            });



            if(existingUser){

                return res.status(400).json({
                    message:"User already exists"
                });

            }





            const hashedPassword = await bcrypt.hash(
                password,
                10
            );





            const user = await User.create({

                name,

                email,

                password:hashedPassword,

                role:"Teacher",

                permissions:{

                    viewStudents:false,

                    addStudent:false,

                    deleteStudent:false,

                    attendance:false,

                    fees:false,

                    reports:false,

                    settings:false,

                    holidays:false

                }

            });







            res.status(201).json({

                message:"Registration Successful",

                user:{

                    _id:user._id,

                    name:user.name,

                    email:user.email,

                    role:user.role,

                    permissions:user.permissions

                }

            });



        }

        catch(error){


            res.status(500).json({

                message:error.message

            });


        }


    };








    // ================= LOGIN =================


    const login = async(req,res)=>{


        try{


            const {
                email,
                password
            } = req.body;





            const user = await User.findOne({
                email
            });





            if(!user){


                return res.status(404).json({

                    message:"User not found"

                });


            }







            const match = await bcrypt.compare(

                password,

                user.password

            );





            if(!match){


                return res.status(400).json({

                    message:"Invalid Password"

                });


            }








            const token = jwt.sign(

                {

                    id:user._id,

                    role:user.role

                },


                process.env.JWT_SECRET,


                {

                    expiresIn:"1d"

                }


            );








            let permissions = {};





            // ADMIN FULL ACCESS

            if(user.role === "Admin"){


                permissions={


                    viewStudents:true,

                    addStudent:true,

                    deleteStudent:true,

                    attendance:true,

                    fees:true,

                    reports:true,

                    settings:true,

                    holidays:true


                };


            }






            // TEACHER ACCESS

            else{


                permissions={


                    viewStudents:
                    user.permissions?.viewStudents || false,



                    addStudent:
                    user.permissions?.addStudent || false,



                    deleteStudent:
                    user.permissions?.deleteStudent || false,



                    attendance:
                    user.permissions?.attendance || false,



                    fees:
                    user.permissions?.fees || false,



                    reports:
                    user.permissions?.reports || false,



                    settings:
                    user.permissions?.settings || false,



                    holidays:
                    user.permissions?.holidays || false


                };


            }









            res.json({

                message:"Login Successful",


                token,



                user:{


                    _id:user._id,


                    name:user.name,


                    email:user.email,


                    role:user.role,


                    permissions


                }


            });





        }

        catch(error){


            res.status(500).json({

                message:error.message

            });


        }


    };












    // ================= CREATE USER =================


    const createUser = async(req,res)=>{


        try{


            const {

                name,

                email,

                password,

                role,

                permissions


            } = req.body;







            const existingUser = await User.findOne({

                email

            });





            if(existingUser){


                return res.status(400).json({

                    message:"User already exists"

                });


            }







            const hashedPassword = await bcrypt.hash(

                password,

                10

            );







            const user = await User.create({


                name,


                email,


                password:hashedPassword,


                role,



                permissions: role==="Admin"

                ?

                {

                    viewStudents:true,

                    addStudent:true,

                    deleteStudent:true,

                    attendance:true,

                    fees:true,

                    reports:true,

                    settings:true,

                    holidays:true

                }


                :

                permissions



            });








            res.status(201).json({


                message:"User Created Successfully",


                user



            });





        }


        catch(error){


            res.status(500).json({

                message:error.message

            });


        }



    };



    // ================= GET USERS =================

    const getUsers = async (req, res) => {
        try {

            const users = await User.find({})
                .select("-password")
                .sort({ createdAt: -1 });

            res.json(users);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    };


    // ================= UPDATE USER =================
const updateUser = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            name,
            email,
            role,
            permissions
        } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const emailExists = await User.findOne({
            email,
            _id: { $ne: id }
        });

        if (emailExists) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        user.name = name;
        user.email = email;
        user.role = role;

        if (role === "Admin") {
            user.permissions = {
                viewStudents: true,
                addStudent: true,
                deleteStudent: true,
                attendance: true,
                fees: true,
                reports: true,
                settings: true,
                holidays: true
            };
        } else {
            user.permissions = permissions;
        }

        await user.save();

        res.json({
            message: "User Updated Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


    // ================= DELETE USER =================
const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.deleteOne();

        res.json({
            message: "User Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
    module.exports = {

        register,

        login,

        createUser,

        getUsers,

        updateUser,

        deleteUser

    };









 