import {ComponentMeta, ComponentStory} from "@storybook/react"
import React from "react"

import {Button} from "./Button"

const meta: ComponentMeta<typeof Button> = {
  title: `Button`,
  component: Button,
}
export default meta

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: `Button`,
}
