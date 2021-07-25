import {ComponentMeta, ComponentStory} from "@storybook/react"
import React from "react"

import {H2} from "./H2"

const meta: ComponentMeta<typeof H2> = {
  title: `Headers/H2`,
  component: H2,
}
export default meta

const Template: ComponentStory<typeof H2> = (args) => <H2 {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: `This is a second-level header`,
}
