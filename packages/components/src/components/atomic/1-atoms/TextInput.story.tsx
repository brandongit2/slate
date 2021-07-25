import {ComponentMeta, ComponentStory} from "@storybook/react"
import React from "react"

import {TextInput} from "./TextInput"

const meta: ComponentMeta<typeof TextInput> = {
  title: `TextInput`,
  component: TextInput,
}
export default meta

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />

export const Primary = Template.bind({})
Primary.args = {}
