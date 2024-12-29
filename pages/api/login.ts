// pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from "next";

const LOGIN_API_URL =
  "https://x8ki-letl-twmt.n7.xano.io/api:YpflsRsy/auth/login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;

      // Make the POST request to Xano API
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        res.status(200).json({ success: true, data });
      } else {
        // Handle login failure
        res
          .status(400)
          .json({ success: false, message: data.message || "Login failed" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server error: " + error });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
