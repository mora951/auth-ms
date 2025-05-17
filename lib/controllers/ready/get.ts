import { makeError } from "../../errors/errorHandler";
import codes from "../../utils/server-codes";
import { Request, Response } from "express";

const { SUCCESS, SERVER_ERROR } = codes;

const isReady = (req: Request, res: Response): any => {
  try {
    res.statusCode = SUCCESS;
    res.send("Ready Route");
  } catch (error: any) {
    res.statusCode = SERVER_ERROR;
    res.send(makeError(error.message, SERVER_ERROR));
  }
};

export { isReady };
