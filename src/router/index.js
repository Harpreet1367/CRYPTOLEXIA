import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/IntroView.vue'
import LevelsView from '../views/LevelsView.vue'
import Score from '../views/Score.vue'
//level 1
import Level1Q1 from '../views/Level1/Level1Q1.vue'
import Level1Q2 from '../views/Level1/Level1Q2.vue'
import Level1Q3 from '../views/Level1/Level1Q3.vue'
import HelpL1Q1 from '../views/Level1/HelpL1Q1.vue'
import HelpL1Q2 from '../views/Level1/HelpL1Q2.vue'
import HelpL1Q3 from '../views/Level1/HelpL1Q3.vue'
// level 2
import Level2Q1 from '../views/Level2/Level2Q1.vue'
import Level2Q2 from '../views/Level2/Level2Q2.vue'
import Level2Q3 from '../views/Level2/Level2Q3.vue'
import HelpL2Q1 from '../views/Level2/HelpL2Q1.vue'
import HelpL2Q2 from '../views/Level2/HelpL2Q2.vue'
import HelpL2Q3 from '../views/Level2/HelpL2Q3.vue'
// level 3
import Level3Q1 from '../views/Level3/Level3Q1.vue'
import Level3Q2 from '../views/Level3/Level3Q2.vue'
import Level3Q3 from '../views/Level3/Level3Q3.vue'
import HelpL3Q1 from '../views/Level3/HelpL3Q1.vue'
import HelpL3Q2 from '../views/Level3/HelpL3Q2.vue'
import HelpL3Q3 from '../views/Level3/HelpL3Q3.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IntroView
    },
    {
      path: '/levels',
      name: 'levels',
      component: LevelsView
    },
    {
      path: '/Score',
      name: 'Score',
      component: Score
    },
    {
      path: '/Level1Q1',
      name: 'Level1Q1',
      component: Level1Q1
    },
    {
      path: '/Level1Q2',
      name: 'Level1Q2',
      component: Level1Q2
    },
    {
      path: '/Level1Q3',
      name: 'Level1Q3',
      component: Level1Q3
    },
    {
      path: '/HelpL1Q1',
      name: 'HelpL1Q1',
      component: HelpL1Q1
    },
    {
      path: '/HelpL1Q2',
      name: 'HelpL1Q2',
      component: HelpL1Q2
    },
    {
      path: '/HelpL1Q3',
      name: 'HelpL1Q3',
      component: HelpL1Q3
    },
    {
      path: '/Level2Q1',
      name: 'Level2Q1',
      component: Level2Q1
    },
    {
      path: '/Level2Q2',
      name: 'Level2Q2',
      component: Level2Q2
    },
    {
      path: '/Level2Q3',
      name: 'Level2Q3',
      component: Level2Q3
    },{
      path: '/HelpL2Q1',
      name: 'HelpL2Q1',
      component: HelpL2Q1
    },
    {
      path: '/HelpL2Q2',
      name: 'HelpL2Q2',
      component: HelpL2Q2
    },
    {
      path: '/HelpL2Q3',
      name: 'HelpL2Q3',
      component: HelpL2Q3
    },
    {
      path: '/Level3Q1',
      name: 'Level3Q1',
      component: Level3Q1
    },
    {
      path: '/Level3Q2',
      name: 'Level3Q2',
      component: Level3Q2
    },
    {
      path: '/Level3Q3',
      name: 'Level3Q3',
      component: Level3Q3
    },{
      path: '/HelpL3Q1',
      name: 'HelpL3Q1',
      component: HelpL3Q1
    },
    {
      path: '/HelpL3Q2',
      name: 'HelpL3Q2',
      component: HelpL3Q2
    },
    {
      path: '/HelpL3Q3',
      name: 'HelpL3Q3',
      component: HelpL3Q3
    },
  ]
})

export default router
