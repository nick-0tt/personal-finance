import { Router } from "express";
import { FinancialData } from "../mongoose/schemas/financial-data.mjs";

const router = Router();

router.get("/api/financial-data", async (request, response) => {
    console.log("Fetching financial data...");
    try {
        const financialData = await FinancialData.find({ userId: request.user._id });
        response.json(financialData);
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
});

router.post("/api/financial-data", async (request, response) => {
    const { body } = request;
    
    const newFinancialData = new FinancialData({
        userId: request.user._id,
        type: body.type,
        source: body.source,
        amount: parseInt(body.amount),
        category: body.category,
    });

    try {
        const savedFinancialData = await newFinancialData.save();
        return response.status(201).send({status: "FinancialData created successfully"});
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
})

router.put("/api/financial-data", async (request, response) => {
    const { body } = request;
    const { id, newData } = body;

    try {
        const updatedFinancialData = await FinancialData.updateOne({ userId: request.user._id, _id: id }, newData);
        return response.status(201).send({status: "FinancialData updated successfully"});
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
})

router.delete("/api/financial-data", async (request, response) => {
    const { body } = request;
    const { id } = body;

    try {
        const deletedFinancialData = await FinancialData.deleteOne({ userId: request.user._id, _id: id });
        return response.status(200).send({status: "FinancialData deleted successfully"});
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
})

export default router;