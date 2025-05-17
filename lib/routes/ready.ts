import { Router } from "express";
import { isReady } from "../controllers/ready/get";

const ready = (router: Router) => {
  router.get("/", isReady);

  return router;
};

export { ready };
