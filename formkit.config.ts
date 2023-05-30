import { DefaultConfigOptions } from '@formkit/vue'
import { createProPlugin, inputs } from '@formkit/pro'
import '@formkit/pro/genesis'

const proPlugin = createProPlugin('fk-aa3fddbbd4', inputs)

const config: DefaultConfigOptions = {
  theme: 'genesis',
  plugins: [proPlugin]
}

export default config
