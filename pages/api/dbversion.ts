/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await sql`SELECT version()`;
    res.status(200).json({ success: true, version: result[0].version });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
