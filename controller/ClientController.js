import { Client } from "../models/Client.js";

export const updateClient = async (req, res) => {
  try {
    const ClientId = req.params.ClientId;
    const filter = { ClientId: ClientId };
    const update = req.body;

    let clientObj = await Client.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!clientObj) {
      return res.status(404).send("Data for given client id not found");
    }

    res.send("Client details updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
