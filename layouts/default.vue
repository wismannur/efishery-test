<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="drawer-lyt-default"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link :to="'/'" class="n-link-e">
        <v-toolbar-title class="title-eft" v-text="title" />
      </nuxt-link>
      <v-spacer />
      <client-only>
        <ColorModePicker />
      </client-only>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <br>
    <br>
    <v-footer
      :absolute="!fixed"
      app
      class="footer-lyt-default"
    >
      <span>&copy; {{ new Date().getFullYear() }} - Bandung, Jawa Barat, Indonesia.</span>
    </v-footer>
    <LoadingPage />
    <no-ssr>
      <MessageHandler />
      <CancelSaveData />
    </no-ssr>
  </v-app>
</template>

<script>
import ColorModePicker from '~/components/ColorModePicker';
import LoadingPage from '~/components/LoadingPage';
import MessageHandler from '~/components/MessageHandler';
import CancelSaveData from '~/components/CancelSaveData';

export default {
  components: {
    ColorModePicker,
    LoadingPage,
    MessageHandler,
    CancelSaveData,
  },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home-flood',
          title: 'Beranda',
          to: '/'
        },
        {
          icon: 'mdi-fish',
          title: 'List Ikan',
          to: '/list-ikan'
        },
        {
          icon: 'mdi-home-city',
          title: 'List Provinsi & Kota',
          to: '/list-provinsi-kota'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'eFishery Test'
    }
  }
}
</script>

<style lang="scss" scoped>
.title-eft {
  color: #00C58E;
  font-weight: 700;
}
.drawer-lyt-default {
  max-height: calc(100% - 0px) !important;
}
.n-link-e {
  text-decoration: none;
}
.footer-lyt-default {
  z-index: 99 !important;
}
</style>
