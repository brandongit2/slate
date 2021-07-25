import {ComponentMeta, ComponentStory} from "@storybook/react"
import React from "react"
import {RelayEnvironmentProvider} from "react-relay"

import Index from "$pages/index"
import environment from "$relay/environment"

export default {
  title: `Homepage`,
  component: Index,
} as ComponentMeta<typeof Index>

const Template: ComponentStory<typeof Index> = (args) => (
  <RelayEnvironmentProvider environment={environment}>
    <Index {...args} />
  </RelayEnvironmentProvider>
)

export const Primary = Template.bind({})
Primary.args = {}
