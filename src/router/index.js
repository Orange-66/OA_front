import Vue from 'vue'
import Router from 'vue-router'
import {get, post, put, del} from '@/shared/ApiConfig.js'
// Containers
import DefaultContainer from '@/page/containers/DefaultContainer'

// Views
// 首页
import Dashboard from '@/page/views/Dashboard'
import Bulletin from '@/page/views/Bulletin'
const Login = () => import('@/Login')

// 名片夹系统
import Connector from '@/page/businessCard/Connector'
import ConnectorType from '@/page/businessCard/ConnectorType'
import AddressBook from '@/page/businessCard/AddressBook'

// 消息收发
import WriteMail from '@/page/mailManage/WriteMail'
import UnreadMail from '@/page/mailManage/UnreadMail'
import SendBox from '@/page/mailManage/SendBox'
import DraftBox from '@/page/mailManage/DraftBox'
import ReceiveBox from '@/page/mailManage/ReceiveBox'
import RubbishBox from '@/page/mailManage/RubbishBox'
import RubbishEcharts from '@/echarts/RubbishEcharts'

// 云文件
import FileDirectory from '@/page/cloudFile/FileDirectory'
// import MyFile from '@/page/cloudFile/MyFile'
// import MyShare from '@/page/cloudFile/MyShare'

// 会议管理
import ConferenceApproval from '@/page/conferenceManage/ConferenceApproval'
import ConferenceRoom from '@/page/conferenceManage/ConferenceRoom'
import ParticipateConference from '@/page/conferenceManage/ParticipateConference'
import SponsorConference from '@/page/conferenceManage/SponsorConference'
import ConferenceAppointment from '@/page/conferenceManage/ConferenceAppointment'


// 系统管理
import Department from '@/page/systemManage/Department'
import Job from '@/page/systemManage/Job'
import Authority from '@/page/systemManage/Authority'
import EmployeeManage from '@/page/systemManage/Employee'
import Character from '@/page/systemManage/Character'

// 资产管理
import AssertInventory from '@/page/assertManage/assertInventory'
import OfficeConsumption from '@/page/assertManage/OfficeConsumption'
// 车辆管理
import InfoCar from '@/page/carManage/InfoCar'
import PendingCar from '@/page/carManage/PendingCar'
import RecordCar from '@/page/carManage/RecordCar'
// 外派人才
import ExpatriateRecord from '@/page/expatriateManage/ExpatriateRecord'
import ExpatriateEmployeeInfo from '@/page/expatriateManage/ExpatriateEmployeeInfo'
import Company from '@/page/expatriateManage/Company'
import CompanyDemand from '@/page/expatriateManage/CompanyDemand'

// personalCenter
// 个人中心管理
import MaintainInfo from '@/page/personalCenter/MaintainInfo'
import SearchInfo from '@/page/personalCenter/SearchInfo'
import Application from '@/page/personalCenter/Application'
import InfoLeave from '@/page/personalCenter/application/InfoLeave'
import InfoReimbursement from '@/page/personalCenter/application/InfoReimbursement'
import InfoRentalCar from '@/page/personalCenter/application/InfoRentalCar'

// 工作安排
import Agent from '@/page/workManage/Agent'
// import AgentManage from '@/page/workManage/agent/AgentManage'
// import AgentSearch from '@/page/workManage/agent/AgentSearch'
// import Organization from '@/page/workManage/agent/Organization'
import Approval from '@/page/workManage/Approval'
// import LeaveApproval from '@/page/workManage/approval/LeaveApproval'
// import ReimbursementApproval from '@/page/workManage/approval/ReimbursementApproval'
// import RentalApproval from '@/page/workManage/approval/RentalApproval'
import ScheduleManage from '@/page/workManage/ScheduleManage'
// import ArrangeWork from '@/page/workManage/scheduleManage/ArrangeWork'
// import EditWork from '@/page/workManage/scheduleManage/EditWork'
import Calendar from '@/page/workManage/Calendar'
import ComprehensiveSearch from '@/page/workManage/ComprehensiveSearch'

// 错误页面
import Page400 from '@/page/error/Page400'
import Page415 from '@/page/error/Page415'
import Page404 from '@/page/error/Page404'
import Page500 from '@/page/error/Page500'
Vue.use(Router)

const  items=[];
const router = new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),

  routes:[
    // 首页
    {
      path: '/',
      redirect: '/login',
      name: '首页',
      component: DefaultContainer,
      children: [
        {
          path: 'home',
          name: '首页',
          component: Dashboard
        },
        {
          path: 'bulletin',
          name: '系统公告',
          component: Bulletin
        },
      ]
    },
    // 名片夹系统
    {
      path: '/businessCard',
      redirect: '/businessCard/connector',
      name: '名片夹系统',
      component: DefaultContainer,
      children: [
        {
          path: 'connector',
          name: '联系人查询',
          component: Connector
        },
        {
          path: 'connectorType',
          name: '名片夹分类',
          component: ConnectorType
        },
        {
          path: 'address_book',
          name: '公司通讯录',
          component: AddressBook
        }
      ]
    },
    // 邮件系统
    {
      path: '/mailManage',
      redirect: '/mailManage/write_mail',
      name: '消息收发',
      component: DefaultContainer,
      children: [
        {
          path: 'write_mail',
          name: '发送新消息',
          component: WriteMail
        },
        {
          path: 'unread_mail',
          name: '未阅消息',
          component: UnreadMail
        },
        {
          path: 'send_box',
          name: '发件箱',
          component: SendBox
        },
        {
          path: 'draft_box',
          name: '草稿箱',
          component: DraftBox
        },
        {
          path: 'receive_box',
          name: '收件箱',
          component: ReceiveBox
        },
        {
          path: 'rubbish_box',
          name: '垃圾箱',
          component: RubbishBox
        },
        {
          path: 'rubbish_echarts',
          name: '垃圾箱数据分析',
          component: RubbishEcharts
        },
      ]
    },
    // 会议管理
    {
      path: '/conference_manage',
      redirect: '/conference_manage/conference_room',
      name: '会议管理',
      component: DefaultContainer,
      children: [
        {
          path: 'conference_room',
          name: '会议室管理',
          component: ConferenceRoom
        },
        {
          path: 'conference_approval',
          name: '会议预约审批',
          component: ConferenceApproval
        },
        {
          path: 'conference_appointment',
          name: '会议预约信息',
          component: ConferenceAppointment
        },
        {
          path: 'participate_conference',
          name: '我要参加的会议',
          component: ParticipateConference
        },
        {
          path: 'sponsor_conference',
          name: '我发布的会议',
          component: SponsorConference
        },
      ]
    },
    // 日程安排
    {
      path: '/work_manage',
      redirect: '/work_manage/schedule_manage',
      name: '工作安排',
      component: DefaultContainer,
      children: [
        {
          path: 'schedule_manage',
          name: '日程安排',
          component: ScheduleManage
        },
        {
          path: 'agent',
          name: '代读设置',
          component: Agent
        },
        {
          path: 'approval',
          name: '待办审批',
          component: Approval
        },
        {
          path: 'calendar',
          name: '日历查看',
          component: Calendar
        },
        {
          path: 'comprehensive_search',
          name: '综合查询',
          component: ComprehensiveSearch
        },
      ]
    },
    // 云文件
    {
      path: '/cloud_file',
      redirect: '/cloud_file/file_directory',
      name: '云文件存储',
      component: DefaultContainer,
      children: [
        {
          path: 'file_directory',
          name: '云文件目录',
          component: FileDirectory
        },
        // {
        //   path: 'my_file',
        //   name: '云文件存储',
        //   component: MyFile
        // },
        // {
        //   path: 'my_share',
        //   name: '云文件存储',
        //   component: MyShare
        // },
      ]
    },
    // 系统管理
    {
      path: '/system_manage',
      redirect: '/system_manage/department_manage',
      name: '系统管理',
      component: DefaultContainer,
      children: [
        {
          path: 'department_manage',
          name: '部门管理',
          component: Department
        },
        {
          path: 'job_manage',
          name: '职务管理',
          component: Job
        },
        {
          path: 'character_manage',
          name: '角色管理',
          component: Character
        },
        {
          path: 'employee_manage',
          name: '员工管理',
          component: EmployeeManage
        },
        {
          path: 'authority_manage',
          name: '权限管理',
          component: Authority
        },
      ]
    },
    // 资产管理
    {
      path: '/assert_manage',
      redirect: '/assert_manage/assertInventory_manage',
      name: '资产管理',
      component: DefaultContainer,
      children: [
        {
          path: 'assertInventory_manage',
          name: '库存管理',
          component: AssertInventory
        },
        {
          path: 'officeconsumption_manage',
          name: '办公用品消耗管理',
          component: OfficeConsumption
        },
      ]
    },
    // 车辆管理
    {
      path: '/car_manage',
      redirect: '/car_manage/info_car',
      name: '车辆管理',
      component: DefaultContainer,
      children: [
        {
          path: 'info_car',
          name: '查看车辆信息',
          component: InfoCar
        },
        {
          path: 'pending_car',
          name: '派车待办',
          component: PendingCar
        },
        {
          path: 'record_car',
          name: '派车记录',
          component: RecordCar
        },
      ]
    },
    // 外派人才
    {
      path: '/expatriate_manage',
      redirect: '/expatriate_manage/expatriateEmployee_info',
      name: '外派人才',
      component: DefaultContainer,
      children: [
        {
          path: 'expatriateEmployee_info',
          name: '外派人员列表',
          component: ExpatriateEmployeeInfo
        },
        {
          path: 'company',
          name: '合作公司列表',
          component: Company
        },
        {
          path: 'companyDemand',
          name: '公司需求列表',
          component: CompanyDemand
        },
        {
          path: 'expatriateRecord_manage',
          name: '外派记录显示',
          component: ExpatriateRecord
        },

      ]
    },
    // 个人中心
    {
      path: '/personal_center',
      redirect: '/personal_center/maintain_info',
      name: '个人中心',
      component: DefaultContainer,
      children: [
        {
          path: 'maintain_info',
          name: '员工信息维护',
          component: MaintainInfo
        },
        {
          path: 'search_info',
          name: '检索他人信息',
          component: SearchInfo
        },
        {
          path: 'application',
          name: '个人申请中心',
          component: Application,
          children:[
            {
              path: 'info_leave',
              name: '请假记录',
              component: InfoLeave
            },
            {
              path: 'info_reimbursement',
              name: '报销记录',
              component: InfoReimbursement
            },
            {
              path: 'info_rental_car',
              name: '用车记录',
              component: InfoRentalCar
            }
          ]
        },

      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/500',
      name: '500',
      component: Page500
    },
    {
      path: '/400',
      name: '400',
      component: Page400
    },
    {
      path: '/415',
      name: '415',
      component: Page415
    },
    {
      path: '/*',
      name: '404',
      component: Page404
    },
 {
   path: '/login',
     name: '登陆',
   component:Login
 }
  ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {




  if (to.path === '/login') {
    next();

  } else {
    let token = localStorage.getItem('token');
    if (token === 'null' || token === '') {
      next('/login');

    } else {
      //addDynamicMenuAndRoutes(1, to, from)
      //console.log("hhhhhhhhh");
      next();

    }
  }
});

/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(userId, to, from) {
  console.log("addDynamicMenuAndRoutes",localStorage.getItem('routers'));

  console.log("routers",typeof(localStorage.getItem('routers')));

 /* if() {
    console.log("routers",localStorage.getItem('routers'));
    return
  }*/
get(
    'employee/findTree.action',
    {userId:userId}
  ).then(function (res) {
      // 添加动态路由
    console.log("*********"+res);
      /*let dynamicRoutes = addDynamicRoutes(res.tree)
      // 处理静态组件绑定路由
      handleStaticComponent(router, dynamicRoutes)
      router.addRoutes(router.options.routes)*/

    //this.changeRouter({routers: res.tree});
    })
};

/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent(router, dynamicRoutes) {

  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
};



function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else {
      // 创建路由配置
      var route = {
        path: menuList[i].path,
        component: menuList[i].component,
        name: menuList[i].name,
        redirect:menuList[i].redirect
      }

      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}



export default router

