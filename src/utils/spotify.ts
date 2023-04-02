import type { NextApiRequest } from "next";

type AccessTokenResponse = {
  token: string;
};

export async function getAccessToken(req: NextApiRequest, userId: string) {
  const bearerToken = `Bearer ${process.env.CLERK_SECRET_KEY ?? ""}`;
  const provider = "oauth_spotify";

  const url = new URL(
    `https://api.clerk.dev/v1/users/${userId}/oauth_access_tokens/${provider}`
  );

  const res = await fetch(url, {
    headers: {
      Authorization: bearerToken,
      "Content-Type": "application/json",
    },
  });
  const json = (await res.json()) as Array<AccessTokenResponse>;

  const token = json && (json[0]?.token as string);

  return token;
}
