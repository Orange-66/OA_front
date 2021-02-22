export default {
  items: [
    //首页
    {
      name: '首页',
      url: '/home',
      icon: 'icon-home',
    },
    //个人中心
    {
      name: '个人中心',
      url: '/personal_center/typography',
      icon: 'icon-people',
      children: [
        {
          name: '员工信息维护',
          url: '/personal_center/maintain_info',
          icon: 'icon-drop'
        },
        {
          name: '检索他人信息',
          url: '/personal_center/search_info',
          icon: 'icon-drop'
        },
        {
          name: '个人申请中心',
          url: '/personal_center/application',
          icon: 'icon-drop'
        },
      ]
    },
    //工作安排
    {
      name: '工作安排',
      url: '/theme/typography',
      icon: 'icon-calendar',
      children: [
        {
          name: '日程安排',
          url: '/work_manage/schedule_manage',
          icon: 'icon-drop'
        },
        {
          name: '综合查询',
          url: '/work_manage/comprehensive_search',
          icon: 'icon-drop'
        },
        {
          name: '日历查看',
          url: '/work_manage/calendar',
          icon: 'icon-drop'
        },
        {
          name: '代读设置',
          url: '/work_manage/agent',
          icon: 'icon-drop'
        },
        {
          name: '代办审批',
          url: '/work_manage/approval',
          icon: 'icon-drop'
        },
      ]
    },
    //名片夹
    {
      name: '名片夹',
      url: '/theme/typography',
      icon: 'icon-folder',
      children: [
        {
          name: '联系人查询',
          url: '/businessCard/connector',
          icon: 'icon-drop'
        },
        {
          name: '名片夹分类',
          url: '/businessCard/connectorType',
          icon: 'icon-drop'
        },
        {
          name: '公司通讯录',
          url: '/businessCard/address_book',
          icon: 'icon-drop'
        },
      ]
    },
    //消息收发
    {
      name: '消息收发',
      url: '/theme/typography',
      icon: 'icon-envelope-letter',
      children: [
        {
          name: '发送新消息',
          url: '/mailManage/write_mail',
          icon: 'icon-drop'
        },
        {
          name: '未阅消息',
          url: '/mailManage/unread_mail',
          icon: 'icon-drop'
        },
        {
          name: '发件箱',
          url: '/mailManage/send_box',
          icon: 'icon-drop'
        },
        {
          name: '草稿箱',
          url: '/mailManage/draft_box',
          icon: 'icon-drop'
        },
        {
          name: '收件箱',
          url: '/mailManage/receive_box',
          icon: 'icon-drop'
        },
        {
          name: '垃圾箱',
          url: '/mailManage/rubbish_box',
          icon: 'icon-drop'
        },

      ]
    },
    //云文件存储
    {
      name: '云文件存储',
      url: '/theme/typography',
      icon: 'icon-cloud-upload',
      children: [
        {
          name: '云文件目录',
          url: '/cloud_file',
          icon: 'icon-drop'
        },
        {
          name: '我的云共享',
          url: '/cloud_file',
          icon: 'icon-drop'
        },
      ]
    },
    //会议管理
    {
      name: '会议管理',
      url: '/theme/typography',
      icon: 'icon-bubbles',
      children: [
        {
          name: '会议室管理',
          url: '/conference_manage/conference_room',
          icon: 'icon-drop'
        },
        {
          name: '会议预约信息',
          url: '/conference_manage/conference_appointment',
          icon: 'icon-drop'
        },
        {
          name: '我要参加的会议',
          url: '/conference_manage/participate_conference',
          icon: 'icon-drop'
        },
        {
          name: '我发布的会议',
          url: '/conference_manage/sponsor_conference',
          icon: 'icon-drop'
        },
      ]
    },
    //系统管理
    {
      name: '系统管理',
      url: '/theme/typography',
      icon: 'icon-grid',
      children: [
        {
          name: '部门管理',
          url: '/system_manage/department_manage',
          icon: 'icon-drop'
        },
        {
          name: '职务管理',
          url: '/system_manage/job_manage',
          icon: 'icon-drop'
        },
        {
          name: '员工管理',
          url: '/system_manage/employee_manage',
          icon: 'icon-drop'
        },
        {
          name: '角色管理',
          url: '/system_manage/character_manage',
          icon: 'icon-drop'
        },
        {
          name: '权限管理',
          url: '/system_manage/authority_manage',
          icon: 'icon-drop'
        },
      ]
    },
    //资产管理
    {
      name: '资产管理',
      url: '/theme/typography',
      icon: 'icon-diamond',
      children: [
        {
          name: '库存管理',
          url: '/assert_manage/assertInventory_manage',
          icon: 'icon-drop'
        },
        {
          name: '办公用品消耗',
          url: '/assert_manage/officeconsumption_manage',
          icon: 'icon-drop'
        }
      ]
    },
    //车辆管理
    {
      name: '车辆管理',
      url: '/theme/typography',
      icon: 'icon-speedometer',
      children: [
        {
          name: '查看车辆信息',
          url: '/car_manage/info_car',
          icon: 'icon-drop'
        },
        {
          name: '派车待办',
          url: '/car_manage/pending_car',
          icon: 'icon-drop'
        },
        {
          name: '派车记录',
          url: '/car_manage/record_car',
          icon: 'icon-drop'
        }
      ]
    },
    //外派人才
    {
      name: '外派人才',
      url: '/theme/typography',
      icon: 'icon-plane',
      children: [
        {
          name: '外派人员列表',
          url: '/expatriate_manage/expatriateEmployee_info',
          icon: 'icon-drop'
        },
        {
          name: '合作公司列表',
          url: '/expatriate_manage/company',
          icon: 'icon-drop'
        },
        {
          name: '公司需求列表',
          url: '/expatriate_manage/companyDemand',
          icon: 'icon-drop'
        },
        {
          name: '外派记录显示',
          url: '/expatriate_manage/expatriateRecord_manage',
          icon: 'icon-drop'
        }
      ]
    },
    //系统公告
    {
      name: '系统公告',
      url: '/bulletin',
      icon: 'icon-book-open',
    }
  ]
}
