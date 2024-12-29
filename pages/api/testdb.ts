/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await query("SELECT NOW()");
    res
      .status(200)
      .json({
        success: true,
        message: "Connection successful!",
        timestamp: result.rows[0].now,
      });
  } catch (error: any) {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Database connection failed",
        error: error.message,
      });
  }
}
