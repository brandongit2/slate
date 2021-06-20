import React, {FC} from "react"
import {PreloadedQuery, usePreloadedQuery} from "react-relay"

import {UserQuery as UserQueryType} from "@app/queries/__generated__/UserQuery.graphql"
import {UserQuery} from "@app/queries/User"

type Props = {
  queryRef: PreloadedQuery<UserQueryType>
}

const SubjectList: FC<Props> = ({queryRef}) => {
  const data = usePreloadedQuery(UserQuery, queryRef)

  return <div>your name is {data.user.name}</div>
}

export default SubjectList
