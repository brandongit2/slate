import {ComponentMeta, ComponentStory} from "@storybook/react"
import React from "react"

import {H1} from "./H1"

const meta: ComponentMeta<typeof H1> = {
  title: `Headers/H1`,
  component: H1,
}
export default meta

const Template: ComponentStory<typeof H1> = (args) => <H1 {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: `This is a first-level header`,
}
