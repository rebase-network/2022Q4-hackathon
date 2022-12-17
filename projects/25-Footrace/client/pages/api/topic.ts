// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = `https://api.twitterscan.com/appapi/twitter-scan/trending-topics-v2?page_size=20&page_num=1`
  const data = await (await fetch(url)).json()

  res.status(200).json(data)
}
