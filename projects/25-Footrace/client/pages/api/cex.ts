// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = `https://api.footprint.network/api/v1/entity/cex/ranking?limit=20&offset=0&sort_by=balance`
  const data = await (await fetch(url)).json()

  res.status(200).json(data)
}
