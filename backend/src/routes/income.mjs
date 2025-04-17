import { Router } from "express";
import { Income } from "../mongoose/schemas/income.mjs";

const router = Router();

router.get("/api/income", async (request, response) => {
    console.log("Fetching income data...");
    try {
        const incomeData = await Income.find({ userId: request.user._id });
        response.json(incomeData);
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
});

router.post("/api/income", async (request, response) => {
    const { body } = request;
    
    const newIncome = new Income({
        userId: request.user._id,
        source: body.source,
        amount: parseInt(body.amount),
        category: body.category,
    });

    try {
        const savedIncome = await newIncome.save();
        return response.status(201).send({status: "Income created successfully"});
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
})

router.put("/api/income", async (request, response) => {
    const { body } = request;
    const { id, newData } = body;

    try {
        const updatedIncome = await Income.updateOne({ userId: request.user._id, _id: id }, newData);
        return response.status(201).send({status: "Income updated successfully"});
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
})

router.delete("/api/income", async (request, response) => {
    const { body } = request;
    const { id } = body;

    try {
        const deletedIncome = await Income.deleteOne({ userId: request.user._id, _id: id });
        return response.status(200).send({status: "Income deleted successfully"});
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
})

export default router;