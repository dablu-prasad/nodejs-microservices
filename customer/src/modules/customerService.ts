import * as amqp from "amqplib"
var channel
class CustomerService {
    constructor() {
        if (!channel) {
            this.createChannel();
        }
    }
    public createChannel = async () => {
        const connection = await amqp.connect("amqp://localhost:5672")
        channel = await connection.createChannel()
        channel.assertQueue("RABBHIT")
    }
    public customerData = () => {
        console.log("Customer DAAAAAAA")
        return channel.consume("RABBHIT", data => {
            console.log(`Received ${Buffer.from(data.content)}`)
            channel.ack(data)
            return Buffer.from(data.content)
        })
    }
}

export default new CustomerService();
