import React, {useEffect, useState} from "react"

const width = 20

export default function SubjectDescription({
  name,
  description,
  color,
}: {
  name: string
  description: string
  color: string
}) {
  // Break subject header into multiple lines if necessary.
  const [nameBroken, setNameBroken] = useState([name, ``])
  useEffect(() => {
    let el = document.createElement(`p`)
    el.style.fontSize = `200%`
    el.style.fontWeight = `800`
    el.style.position = `fixed`
    document.body.appendChild(el)

    let broken = name.split(String.fromCharCode(0xad))
    let str = ``
    let len = 0
    for (let frag of broken) {
      str += frag
      el.innerHTML = str

      // Subject name cannot exceed 70% width of parent
      if (el.clientWidth > 16 * (width - 2) * 0.7) {
        // If the second line would be awkwardly short
        if (name.length - len < 3) len = str.length

        break
      }
      len = str.length
    }

    el.remove()

    name = name.replaceAll(String.fromCharCode(0xad), ``)
    setNameBroken([name.slice(0, len), name.slice(len)])
  }, [])

  return (
    <>
      <div
        className="relative h-96"
        style={{
          width: `${width}rem`,
        }}
      >
        <span
          style={{
            position: `absolute`,
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          [PLACEHOLDER]
        </span>
      </div>
      <div
        className="p-4"
        style={{
          width: `${width - 2}rem`,
        }}
      >
        <p
          className="text-justify font-semibold"
          style={{
            color: `#${color}`,
          }}
        >
          <span
            className="float-left mr-1.5 font-extrabold text-3xl"
            style={{
              background: `#${color}`,
            }}
          >
            {nameBroken[0] + (nameBroken[1] === `` ? `` : `-`)}
          </span>
          <span
            className="float-left mr-1.5 font-extrabold text-3xl"
            style={{
              clear: `left`,
              background: `#${color}`,
            }}
          >
            {nameBroken[1]}
          </span>
          {description}
        </p>
      </div>
    </>
  )
}
