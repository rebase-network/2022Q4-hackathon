<template>
  <div class="min-h-full ">
    <Disclosure as="nav" class="bg-white p-2 border-b-gray-200 border-b-2" v-slot="{ open }">
      <div class="mx-10 px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <a href="/">
                <img class="h-20 w-20" src="@/assets/logos/Freebe_logo.svg" alt="Your Company" />
              </a>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a v-for="(item, index) in navigation" @click="checkoutNav(index)" :key="item.name" :href="item.href"
                  :class="[navActive === index ? 'bg-mianColor text-white' : 'text-bubble-gum hover:text-mianColor',
                  'px-3 py-2 rounded-md text-m font-medium font-medium-700 ']">{{ item.name }}</a>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <FreeAccount />
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-mianColor hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <DisclosureButton v-for="item, index in navigation" :key="item.name" as="a" :href="item.href"
            :class="[navActive === index ? 'bg-mianColor text-white ' : 'text-gray-300 hover:bg-mianColor hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
            :aria-current="navActive === index ? 'page' : undefined">{{ item.name }}</DisclosureButton>
        </div>
        <div class="border-t border-gray-700 pt-4 pb-3">
          <div class="flex items-center px-5">
            <FreeAccount />
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-mianColor hover:text-white">
              {{ item.name }}
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'MyDAOs', href: '#', current: true },
  { name: 'DAO Square', href: 'square', current: false },
  { name: 'Notifications', href: '#', current: false },
  { name: 'Create', href: '/createdao', current: false },
]
const userNavigation = [
  { name: 'Profile', href: '#' },
  { name: 'Disconnect', href: '#' },
]
const navActive = ref(0);

function checkoutNav(index: number) {
  navActive.value = index;
}
</script>
