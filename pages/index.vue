<template>
  <div class="content-index">
    <h1>Halaman Beranda</h1>
  </div>
</template>

<script>
export default {
  components: {},
  head: {
    title: 'eFishery Test - By wismannur',
    meta: [
      { name: 'siteconfig:akamaibaseurl', content: 'https://efishery-test.wismannur.vercel.app' },
      { hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: 'eFishery Test - By wismannur' },
      { property: 'og:url', content: 'https://efishery-test.wismannur.vercel.app' },
      { hid: 'og:title', name: 'og:title', property: 'og:title', content: 'eFishery Test - By wismannur' },
      { hid: 'og:description', name: 'og:description', property: 'og:description', content: 'Web made with VueJs and NuxtJs and Vuetify by wismannur.' },
      { property: 'og:image', content: 'https://efishery-test.wismannur.vercel.app' + '/icon.png' },
      { property: 'og:image', content: 'https://efishery-test.wismannur.vercel.app' + '/icon.png' },
      { property: 'og:image:width', content: '480' },
      { property: 'og:image:height', content: '360' },

      { hid: 'twitter:site', name: 'twitter:site', property: 'twitter:site', content: 'eFishery Test - By wismannur' },
      { hid: 'twitter:title', name: 'twitter:title', property: 'twitter:title', content: 'eFishery Test - By wismannur' },
      { hid: 'twitter:description', name: 'twitter:description', property: 'twitter:description', content: 'Web made with VueJs and NuxtJs and Vuetify by wismannur.' },
      { name: 'twitter:image', content: 'https://efishery-test.wismannur.vercel.app' + '/icon.png' },
      { name: 'twitter:image', content: 'https://efishery-test.wismannur.vercel.app' + '/icon.png' },

      { hid: 'description', name: 'description', property: 'description', content: 'Web made with VueJs and NuxtJs and Vuetify by wismannur.' },
      { hid: 'keywords', name: 'keywords', content: 'efishery' },
    ],
    link: [
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/favicon.ico' },
      { rel: 'image_src', href: '/icon.png' },
      { rel: 'image_src', href: '/icon.png' },
      { href: 'https://efishery-test.wismannur.vercel.app', rel: 'canonical' },

      { rel: 'icon', type:"image/png", href: 'https://efishery-test.wismannur.vercel.app' + '/favicon.ico', sizes:"16x16" },
    ],
    script: [
      {
        type: 'application/ld+json',
        json: {
          "@context": "http://schema.org",
          "@type": "Web Application",
          "name": "Test",
          "image": 'https://efishery-test.wismannur.vercel.app',
          "description": "Web made with VueJs and NuxtJs and Vuetify by wismannur.",
          "url": "https://nuxt-mentorboxid.wismannur.vercel.app",
          "brand": {
            "@type": "Brand",
            "name": "eFishery Test",
            "logo": 'https://efishery-test.wismannur.vercel.app' + "/icon.png"
          }
        }
      }
    ]
  },
}
</script>
