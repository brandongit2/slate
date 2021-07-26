import {ComponentMeta, ComponentStory} from "@storybook/react"
import React from "react"

import {H6} from "./H6"

const meta: ComponentMeta<typeof H6> = {
  title: `Headers/H6`,
  component: H6,
}
export default meta

const Template: ComponentStory<typeof H6> = (args) => <H6 {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: `This is a sixth-level header`,
}
