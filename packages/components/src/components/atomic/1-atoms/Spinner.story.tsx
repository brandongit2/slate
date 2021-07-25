import {ComponentMeta, ComponentStory} from "@storybook/react"
import React from "react"

import {Spinner} from "./Spinner"

const meta: ComponentMeta<typeof Spinner> = {
  title: `Spinner`,
  component: Spinner,
}
export default meta

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />

export const Primary = Template.bind({})
Primary.args = {}
