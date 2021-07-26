import {ComponentMeta, ComponentStory} from "@storybook/react"
import React from "react"

import {H5} from "./H5"

const meta: ComponentMeta<typeof H5> = {
  title: `Headers/H5`,
  component: H5,
}
export default meta

const Template: ComponentStory<typeof H5> = (args) => <H5 {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: `This is a fifth-level header`,
}
