import express from "express";
const router = express.Router();
export default router;

import {
  getEmployees,
  getEmployee,
  createEmployee,
} from "#db/queries/employees";

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", async (res, req) => {
  if (!req.body) return res.status(400).send("Request must have a body");

  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary)
    return res
      .status(400)
      .send("Request body must have name, birthday, salary");

  const newlyCreatedEmployee = await createEmployee({ name, birthday, salary });
  res.status(201).send(newlyCreatedEmployee);
});
