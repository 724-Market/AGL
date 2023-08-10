export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			BaseUrl: process.env.BASE_API || "http://localhost:3000",
			BasePaymentGateway : process.env.BASE_API_PAYMENT || "http://localhost:3000",
			BaseUrlWeb: process.env.BASE_WEB,
			CompanyImage: process.env.COMPANY_IMAGE || "",
			FixDefaultPackageTaxInclude:process.env.FIX_DEFAULT_PACKAGE_TAXINCLUDE || "0",
			FixValuePackageTaxInclude:process.env.FIX_VALUE_PACKAGE_TAXINCLUDE || "0",
			FixDefaultPackagePaperBalance:process.env.FIX_DEFAULT_PACKAGE_PAPERBALANCE || "0",
			FixValuePackagePaperBalance:process.env.FIX_VALUE_PACKAGE_PAPERBALANCE || "0",
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
			titleTemplate: '%s 💚 Agent Love Club',
			meta: [
				{ name: 'author', content: '724 Market' },
				{ name: 'description', content: 'Welcome to Agent Love Club website' },
			],
			link: [
				{
					rel: 'preconnect',
					href: 'https://fonts.googleapis.com'
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com',
					crossorigin: ''
				},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@300;400;500&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap'
				},
				{
					rel: 'icon',
					type: 'image/svg',
					href: '/favicon.svg'
				},
			]
		},
	},
	modules: [
		'@formkit/nuxt',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
	],
	devtools: {
		enabled: false,
	},
	pinia: {
		autoImports: [
			'defineStore',
			['defineStore', 'definePiniaStore'],
		],
	},
});
