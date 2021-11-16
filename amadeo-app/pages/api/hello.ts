// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { getSession } from "next-auth/client"
type Data = {
  name: string,
  error: string|null
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe', error: null })
}

// export default async (
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
//   ) => {
//   const session = await getSession({ req })
//   if (session) {
//     // Signed in
//     res.status(200).json({ name: 'John Doe', error: '' });
//     console.log("Session", JSON.stringify(session, null, 2))
//   } else {
//     // Not Signed in
//     res.status(401).json({ name: "", error: 'Access deny' });
//   }
//   res.end()
// }
