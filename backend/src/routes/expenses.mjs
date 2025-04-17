import { Router } from "express";
import { Expenses } from "../mongoose/schemas/expenses.mjs";

const router = Router();

router.get("/api/expenses", async (request, response) => {
    console.log("Fetching expenses data...");
    try {
        const expensesData = await Expenses.find({ userId: request.user._id }).exec();
        response.json(expensesData);
    } catch (err) {
        console.error(err);
        return request.status(400).send("Bad request");
    }
});

router.post("/api/expenses", async (request, response) => {
    const { body } = request;
    
    const newExpenses = new Expenses({
        userId: request.user._id,
        source: body.source,
        amount: parseInt(body.amount),
        category: body.category,
    });

    try {
        const savedExpenses = await newExpenses.save();
        return response.status(201).send({status: "Expenses created successfully"});
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
})

router.put("/api/expenses", async (request, response) => {
    const { body } = request;
    const { id, newData } = body;

    try {
        const updatedExpenses = await Expenses.updateOne({ userId: request.user._id, _id: id }, newData);
        return response.status(201).send({status: "Expenses updated successfully"});
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
})

router.delete("/api/expenses", async (request, response) => {
    const { body } = request;
    const { id } = body;

    try {
        const deletedExpenses = await Expenses.deleteOne({ userId: request.user._id, _id: id });
        return response.status(200).send({status: "Expenses deleted successfully"});
    } catch (err) {
        console.error(err);
        return response.status(400).send("Bad request");
    }
})

export default router;