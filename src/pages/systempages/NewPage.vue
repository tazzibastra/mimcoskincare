<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
          <q-list style="min-width: 200px">
            <q-item clickable v-ripple>
              <q-item-section>Option 1</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>Option 2</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>Option 3</q-item-section>
            </q-item>
          </q-list>
        </q-drawer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
