import {NextPage} from "next"
import {useMemo, useState} from "react"
import {Descendant, createEditor} from "slate"
import {Editable, Slate, withReact} from "slate-react"
import {CustomElement} from "src/types"

import MainLayout from "#components/layouts/MainLayout"

const Doc: NextPage = () => {
  const editor = useMemo(() => withReact(createEditor()), [])

  const initialValue: CustomElement[] = [
    {
      type: `paragraph`,
      children: [{text: `Hello world`}],
    },
  ]
  const [value, setValue] = useState<Descendant[]>(initialValue)

  return (
    <MainLayout title="Document">
      <div className="max-w-4xl w-full mx-auto rounded-lg bg-black bg-opacity-10 p-6">
        <Slate value={value} onChange={setValue} editor={editor}>
          <Editable />
        </Slate>
      </div>
    </MainLayout>
  )
}

export default Doc
