import {ComponentMeta, ComponentStory} from "@storybook/react"
import React from "react"

import {H4} from "./H4"

const meta: ComponentMeta<typeof H4> = {
  title: `Headers/H4`,
  component: H4,
}
export default meta

const Template: ComponentStory<typeof H4> = (args) => <H4 {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: `This is a fourth-level header`,
}
