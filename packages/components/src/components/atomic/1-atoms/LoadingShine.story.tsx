import {Meta, Story} from "@storybook/react"
import React from "react"

import {LoadingShine} from "./LoadingShine"

type Args = {width: number; height: number}

const meta: Meta<Args> = {
  title: `LoadingShine`,
  component: LoadingShine,
  argTypes: {
    width: {control: `number`},
    height: {control: `number`},
    className: {table: {disable: true}},
    style: {table: {disable: true}},
  },
  args: {
    width: 200,
    height: 50,
  },
}
export default meta

const Template: Story<Args> = (args) => <LoadingShine style={{width: `${args.width}px`, height: `${args.height}px`}} />

export const Primary = Template.bind({})
Primary.args = {}
