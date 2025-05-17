import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const defaultRouter: Function = () => {
  const router = Router();

  router.use(cors());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json({ limit: "5mb" }));
  router.use(express.static("public"));

  return router;
};

export default defaultRouter;
