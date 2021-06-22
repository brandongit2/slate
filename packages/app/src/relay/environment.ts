import {Environment, Network, RecordSource, RequestParameters, Store} from "relay-runtime"

async function fetchQuery(request: RequestParameters, variables: Record<string, any>) {
  const res = await fetch(`${process.env.apiUrl}/graphql`, {
    method: `POST`,
    headers: {
      "Content-Type": `application/json`,
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  })

  return await res.json()
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})
