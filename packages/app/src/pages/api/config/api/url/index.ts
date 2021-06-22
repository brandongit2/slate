import config from "config"
import {NextApiHandler} from "next"

const handler: NextApiHandler = (req, res) => {
  if (req.method === `GET`) {
    res.send(config.get(`api.url`))
  } else {
    res.status(405).end()
  }
}

export default handler
