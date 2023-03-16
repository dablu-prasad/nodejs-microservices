import responseConstants from "../constants/modelConstants";
import customerService from "./customerService";

export default class CustomerController {
    constructor() { }
    public customer = async (req, res) => {
        console.log("customer Port... 4002")
        const data = await customerService.customerData()
        res.status(responseConstants.ERROR401.CODE).send({
            message: "customer Port... 4002",
            data:data
        });
    }
}
