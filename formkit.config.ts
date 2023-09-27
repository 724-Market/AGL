import { DefaultConfigOptions } from '@formkit/vue'
import { createProPlugin, inputs } from '@formkit/pro'
import '@formkit/pro/genesis'
import stepNumber from '~~/plugins/stepnumber'

const proPlugin = createProPlugin('fk-aa3fddbbd4', inputs)

const config: DefaultConfigOptions = {
  theme: 'genesis',
  plugins: [proPlugin],
  inputs: {
    stepNumber
  }
}

export default config
