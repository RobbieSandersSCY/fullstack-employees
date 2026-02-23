import express from "express";
const router = express.Router();
export default router;

import {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
} from "#db/queries/employees";

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request must have a body");

  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary)
    return res
      .status(400)
      .send("Request body must have name, birthday, salary");

  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

router.param("id", async (req, res, next, id) => {
  // if (!id <= 0) return res.status(400).send("Please provide a valid ID");

  const employee = await getEmployee(id);
  if (!employee) return res.status(404).send("Employee does not exist");

  req.employee = employee;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.employee);
});

router.delete("/:id", async (req, res) => {
  const employee = await deleteEmployee(req.employee.id);
  if (!employee) return res.status(404).send("Employee does not exist");

  res.sendStatus(204);
});
