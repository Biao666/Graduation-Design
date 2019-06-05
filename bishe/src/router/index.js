import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import FaX from '../components/FaX.vue'
import Person from '../components/Person/Person.vue'
import PersonalSet from '../components/Person/personalSet/PersonalSet.vue'
import Perset from '../components/Person/personalCenter/perset.vue'
import Pshow from '../components/Person/personalCenter/pshow.vue'
import pdata from '../components/Person/personalSet/Pdata.vue'
import pcheck from '../components/Person/personalSet/pCheck.vue'
import passwordset from '../components/Person/personalSet/passwordset.vue'
import pmsg from '../components/Person/personalSet/pmsg.vue'
import pfavorites from '../components/Person/personalCenter/pfavorites.vue'
import pseen from '../components/Person/personalCenter/pseen.vue'
import pcomment from '../components/Person/personalCenter/pcomment.vue'
import detailshow from '../components/detailshow.vue'
import news from '../components/news.vue'
import publish from '../components/publish.vue'
import admin from '../components/admin/admin.vue'
import fabu from '../components/admin/fabu.vue'
import check from '../components/admin/check.vue'
import manage from '../components/admin/manage.vue'
import writtenoff from '../components/Person/personalSet/writtenoff.vue'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [{
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/FaX/:page',
            name: 'FaX',
            component: FaX
        },
        {
            path: '/news',
            name: 'news',
            component: news
        },
        {
            path: '/FaX/detailshow/:id',
            name: 'detailshow',
            component: detailshow
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin,
            children: [{
                    path: '/admin/fabu',
                    name: 'fabu',
                    component: fabu,
                },
                {
                    path: '/admin/check/:page',
                    name: 'check',
                    component: check,
                },
                {
                    path: '/admin/manage',
                    name: 'manage',
                    component: manage,
                }
            ]
        },
        {
            path: '/Person/:user/:page',
            name: 'Person',
            component: Person,
            children: [{
                    path: '/Person/:user/:page',
                    name: 'Perset',
                    component: Perset,
                    children: [{
                            path: '/Person/:user/:page',
                            name: 'Pshow',
                            component: Pshow
                        },
                        {
                            path: '/pfavorites/:user/:page',
                            name: 'pfavorites',
                            component: pfavorites
                        },
                        {
                            path: '/pseen/:user/:page',
                            name: 'pseen',
                            component: pseen
                        },
                        {
                            path: '/pcomment/:user/:page',
                            name: 'pcomment',
                            component: pcomment
                        }
                    ]
                },
                {
                    path: '/PersonalSet/:user',
                    name: 'personalSet',
                    component: PersonalSet,
                    children: [{
                            path: '/PersonalSet/:user',
                            name: 'pdata',
                            component: pdata
                        },
                        {
                            path: '/pcheck/:user',
                            name: 'pcheck',
                            component: pcheck
                        },
                        {
                            path: '/passwordset/:user',
                            name: 'passwordset',
                            component: passwordset
                        },
                        {
                            path: '/pmsg/:user',
                            name: 'pmsg',
                            component: pmsg
                        },
                        {
                            path: '/writtenoff/:user',
                            name: 'writtenoff',
                            component: writtenoff
                        }
                    ]
                },
                {
                    path: '/publish',
                    name: 'publish',
                    component: publish
                }
            ]

        },
    ]
})