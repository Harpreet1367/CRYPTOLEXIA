import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/MainCaptchaPage/IntroView.vue'
import username from '../views/MainCaptchaPage/username.vue'

import TextCaptcha1 from '../views/TextCaptcha/TextCaptcha1.vue'
import TextCaptcha2 from '../views/TextCaptcha/TextCaptcha2.vue'
import TextCaptcha3 from '../views/TextCaptcha/TextCaptcha3.vue'
import TextCaptcha4 from '../views/TextCaptcha/TextCaptcha4.vue'
import TextCaptcha5 from '../views/TextCaptcha/TextCaptcha5.vue'
import Textform from '../views/TextCaptcha/Textform.vue'

import ImageCaptcha1 from '../views/ImageCaptcha/ImageCaptcha1.vue'
import ImageCaptcha2 from '../views/ImageCaptcha/ImageCaptcha2.vue'
import ImageCaptcha3 from '../views/ImageCaptcha/ImageCaptcha3.vue'
import ImageCaptcha4 from '../views/ImageCaptcha/ImageCaptcha4.vue'
import ImageCaptcha5 from '../views/ImageCaptcha/ImageCaptcha5.vue'
import Imageform from '../views/ImageCaptcha/Imageform.vue'


import AudioCaptcha1 from '../views/AudioCaptcha/AudioCaptcha1.vue'
import AudioCaptcha2 from '../views/AudioCaptcha/AudioCaptcha2.vue'
import AudioCaptcha3 from '../views/AudioCaptcha/AudioCaptcha3.vue'
import AudioCaptcha4 from '../views/AudioCaptcha/AudioCaptcha4.vue'
import AudioCaptcha5 from '../views/AudioCaptcha/AudioCaptcha5.vue'
import Audioform from '../views/AudioCaptcha/Audioform.vue'

import PuzzleCaptcha1 from '../views/PuzzleCaptcha/PuzzleCaptcha1.vue'
import PuzzleCaptcha2 from '../views/PuzzleCaptcha/PuzzleCaptcha2.vue'
import PuzzleCaptcha3 from '../views/PuzzleCaptcha/PuzzleCaptcha3.vue'
import PuzzleCaptcha4 from '../views/PuzzleCaptcha/PuzzleCaptcha4.vue'
import PuzzleCaptcha5 from '../views/PuzzleCaptcha/PuzzleCaptcha5.vue'
import Rotatingform from '../views/PuzzleCaptcha/Rotatingform.vue'


import endpage from '../views/endpage.vue'
//import LevelsView from '../views/LevelsView.vue'
//import Score from '../views/Score.vue'
//level 1
/*
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
*/




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IntroView
    },
    {
      path: '/username',
      name: 'user',
      component: username
    },
    {
      path: '/TextCaptcha1',
      name: 'TextCap1',
      component: TextCaptcha1
      
    },
    {
      path: '/TextCaptcha2',
      name: 'TextCap2',
      component: TextCaptcha2
      
    },
    {
      path: '/TextCaptcha3',
      name: 'TextCap3',
      component: TextCaptcha3
      
    },
    {
      path: '/TextCaptcha4',
      name: 'TextCap4',
      component: TextCaptcha4
      
    },
    {
      path: '/TextCaptcha5',
      name: 'TextCap5',
      component: TextCaptcha5
      
    },
    {
       path: '/Textform',
       name: 'Text',
       component: Textform,
     },
     
    
    {
      path: '/AudioCaptcha1',
      name: 'AudioCap1',
      component: AudioCaptcha1
      
    },
    {
      path: '/AudioCaptcha2',
      name: 'AudioCap2',
      component: AudioCaptcha2
      
    },
    {
      path: '/AudioCaptcha3',
      name: 'AudioCap3',
      component: AudioCaptcha3
      
    },
    {
      path: '/AudioCaptcha4',
      name: 'AudioCap4',
      component: AudioCaptcha4
      
    },
    {
      path: '/AudioCaptcha5',
      name: 'AudioCap5',
      component: AudioCaptcha5
      
    },
    {
      path: '/Audioform',
      name: 'Audio',
      component: Audioform,
    },
    {
      path: '/ImageCaptcha1',
      name: 'ImageCap1',
      component: ImageCaptcha1
    },
    {
      path: '/ImageCaptcha2',
      name: 'ImageCap2',
      component: ImageCaptcha2
    },
    {
      path: '/ImageCaptcha3',
      name: 'ImageCap3',
      component: ImageCaptcha3
    },
    {
      path: '/ImageCaptcha4',
      name: 'ImageCap4',
      component: ImageCaptcha4
    },
    {
      path: '/ImageCaptcha5',
      name: 'ImageCap5',
      component: ImageCaptcha5
    },
    {
      path: '/Imageform',
      name: 'Image',
      component: Imageform,
      
    },
    {
      path: '/PuzzleCaptcha1',
      name: 'PuzzleCap1',
      component: PuzzleCaptcha1
     
    },
    {
      path: '/PuzzleCaptcha2',
      name: 'PuzzleCap2',
      component: PuzzleCaptcha2
     
    },
    {
      path: '/PuzzleCaptcha3',
      name: 'PuzzleCap3',
      component: PuzzleCaptcha3
     
    },
    {
      path: '/PuzzleCaptcha4',
      name: 'PuzzleCap4',
      component: PuzzleCaptcha4
     
    },
    {
      path: '/PuzzleCaptcha5',
      name: 'PuzzleCap5',
      component: PuzzleCaptcha5
     
    },
    {
      path: '/Rotatingform',
      name: 'Rotating',
      component: Rotatingform,
     
    },
    {
      path: '/endpage',
      name: 'end',
      component: endpage
    },
   /* {
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
    },*/
  ]
})

export default router
