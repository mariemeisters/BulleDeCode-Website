import { NextApiRequest } from "next";
export interface MyNextApiRequest extends NextApiRequest {
    session: Record<string, any>;
}