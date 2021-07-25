import {ComponentMeta, ComponentStory} from "@storybook/react"
import React from "react"

import {H3} from "./H3"

const meta: ComponentMeta<typeof H3> = {
  title: `Headers/H3`,
  component: H3,
}
export default meta

const Template: ComponentStory<typeof H3> = (args) => <H3 {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: `This is a third-level header`,
}
