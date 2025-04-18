import { Router } from "express";
import userRouter from "./users.mjs";
import expensesRouter from "./expenses.mjs";
import incomeRouter from "./income.mjs";
import financialDataRouter from "./financial-data.mjs";

const router = Router();

router.use(userRouter);
router.use(expensesRouter);
router.use(incomeRouter);
router.use(financialDataRouter);

export default router;