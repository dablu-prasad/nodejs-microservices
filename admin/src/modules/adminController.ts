import responseConstants from "../constants/modelConstants";
import adminService from "./adminService";
import Axios from "axios";

export default class AdminController {
    constructor() {
    }
    public admin = async (req, res) => {
        Axios.get(`${process.env.SERVER}/api/v1/user/user`).then(response => {
            return res.json(response.data.data)
        })
            .catch(err => {
                console.log(err)
                res.send(500)
            })
    }

    public userRegister = async (req, res) => {
        await Axios.post(`${process.env.SERVER}/api/v1/user/register`,req.body)
            .catch(err => {
                console.log(err)
                res.send(500)
            })
        return res.status(responseConstants.STANDARD.SUCCESS).send({
            message: "User Register Successfully"
        });
    }
}
