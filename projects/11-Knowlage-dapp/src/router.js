import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import WebNavbar from './components/WebNavbar.vue'
import WebFooter from './components/WebFooter.vue'

import KnowHome from './views/home/KnowHome.vue'

import MajorList from './views/major/MajorList.vue'
import SubjectList from './views/major/SubjectList.vue'
import SubjectDetail from './views/major/SubjectDetail.vue'
import SearchCourseware from './views/major/SearchCourseware.vue'

import OrganizationList from './views/major/OrganizationList.vue'
import SearchMarket from './views/market/SearchMarket.vue'

import UserProfile from './views/profile/UserProfile.vue'
import TestContract from './views/test/TestContract.vue'

export default new Router({
  routes: [
    {
      path: '/', name: 'home',
      components: { navbar: WebNavbar, default: KnowHome, footer: WebFooter }
    },

    {
      path: '/major', name: 'major',
      components: { navbar: WebNavbar, default: MajorList, footer: WebFooter }
    },
    {
      path: '/subject', name: 'subject',
      components: { navbar: WebNavbar, default: SubjectList, footer: WebFooter }
    },
    {
      path: '/subdetail', name: 'subdetail',
      components: { navbar: WebNavbar, default: SubjectDetail, footer: WebFooter }
    },
    {
      path: '/course', name: 'course',
      components: { navbar: WebNavbar, default: SearchCourseware, footer: WebFooter }
    },

    {
      path: '/org', name: 'org',
      components: { navbar: WebNavbar, default: OrganizationList, footer: WebFooter }
    },
    {
      path: '/market', name: 'market',
      components: { navbar: WebNavbar, default: SearchMarket, footer: WebFooter }
    },

    {
      path: '/profile', name: 'profile',
      components: { navbar: WebNavbar, default: UserProfile, footer: WebFooter }
    },

    {
      path: '/test', name: 'test',
      components: { navbar: WebNavbar, default: TestContract, footer: WebFooter }
    }
  ],
  mode: 'history'
})