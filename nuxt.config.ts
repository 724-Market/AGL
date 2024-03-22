export default defineNuxtConfig({
	ssr: false,
	runtimeConfig: {
		public: {
			BaseUrl: process.env.BASE_API || "http://localhost:3000",
			BasePaymentGateway: process.env.BASE_API_PAYMENT || "http://localhost:3000",
			BaseUrlWeb: process.env.BASE_WEB,
			CompanyImage: process.env.COMPANY_IMAGE || "",
			FixDefaultPackageTaxInclude: process.env.FIX_DEFAULT_PACKAGE_TAXINCLUDE || "0",
			FixValuePackageTaxInclude: process.env.FIX_VALUE_PACKAGE_TAXINCLUDE || "0",
			FixDefaultPackagePaperBalance: process.env.FIX_DEFAULT_PACKAGE_PAPERBALANCE || "0",
			FixValuePackagePaperBalance: process.env.FIX_VALUE_PACKAGE_PAPERBALANCE || "0",
			GatewayToken: process.env.GATEWAY_TOKEN,
		}

	},
	app: {
		head: {
			htmlAttrs: {
				lang: "th"
			},
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			titleTemplate: '%s 💚Agent Love Club',
			meta: [
				{ name: 'author', content: '724 Market' },
				{ name: 'description', content: 'Welcome to Agent Love Club website' },
			],
			link: [
				// { rel: 'stylesheet', href: '/assets/css/login.css' },
				{ rel: 'stylesheet', href: '/assets/css/monito.css' },
				{ rel: 'icon', type: 'image/svg', href: '/favicon.svg' },
			],
			script: [
				{ src: '/assets/js/popper.min.js' },
				{ src: '/assets/js/bootstrap.min.js' },
				{ src: 'https://kit.fontawesome.com/285262ebb5.js', crossorigin: 'anonymous', 'data-search-pseudo-elements': true, defer: true },
			],
		}
	},
	modules: [
		'@nuxt/devtools',
		'@formkit/nuxt',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
	],
	devtools: {
		enabled: false,
	},
	pinia: {
		storesDirs: ['./stores/**'],
	},
})
