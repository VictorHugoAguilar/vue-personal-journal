import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock
} from 'vue-router-mock'

import { config } from '@vue/test-utils'

// create one router per test fil
const router = createRouterMock()

beforeEach( () => {
  injectRouterMock(router)
})

// add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)
