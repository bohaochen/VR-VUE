const API_IP = `/v1.0/admin/` // 记得打包项目时更换外网地址 

//上传模块   ===>上传接口（通用）
export const fileUpload = `${API_IP}file/adminFileUpload`

//用户模块   ===>用户登录
export const loginAction = `${API_IP}login/loginAction`;
//用户模块   ===>用户注销
export const loginOutAction = `${API_IP}logout/logOutAction`;
//系统收款账户模块   ===>获取收款账户列表
export const pushSysBankList = `${API_IP}sysbank/pushSysBankList`;
//系统收款账户模块   ===>获取账户进行编辑
export const getSysBank = `${API_IP}sysbank/getSysBank`;
//系统收款账户模块   ===>新增/更新账户
export const updateOrSave = `${API_IP}sysbank/updateOrSave`;
//主营类目管理   ===>获取类目列表
export const pushCategoryList = `${API_IP}category/pushCategoryList`;
//主营类目管理   ===>获取分类进行编辑
export const getCategory = `${API_IP}category/getCategory`;
//主营类目管理   ===>新增/更新分类信息
export const updateOrSaveCategory = `${API_IP}category/updateOrSaveCategory`;
//会员中心 分类管理   ===> 获取分类列表
export const pushModelCenterList = `${API_IP}modelcenter/pushModelCenterList`;
//会员中心 分类管理   ===> 获取分类进行编辑
export const getModelCenter = `${API_IP}modelcenter/getModelCenter`;
//会员中心 分类管理   ===>新增/更新分类信息
export const updateOrSaveModelCenter = `${API_IP}modelcenter/updateOrSaveModelCenter`;
//会员中心 分类管理   ===>根据分类ID获取内容列表
export const pushModelLevelRulesList = `${API_IP}modelcenter/pushModelLevelRulesList`;
//会员中心 分类管理   ===>根据内容ID获取内容进行编辑
export const getModelLevelRules = `${API_IP}modelcenter/getModelLevelRules`;
//会员中心 分类管理   ===>新增/更新内容
export const updateModelLevelRules = `${API_IP}modelcenter/updateModelLevelRules`;
//数据字典   ===>获取数据字典列表
export const pushSettingsList = `${API_IP}setting/pushSettingsList`;
//数据字典   ===>获取字典进行编辑
export const getSettings = `${API_IP}setting/getSettings`;
//数据字典   ===>新增/更新字典信息
export const updateOrSaveSettings = `${API_IP}setting/updateOrSaveSettings`;
//成长模块   ===>获取成长分类列表
export const pushGrowupList = `${API_IP}growup/pushGrowupList`;
//成长模块   ===>根据列表dmId获取信息进行编辑
export const getGrowup = `${API_IP}growup/getGrowup`;
//成长模块   ===>新增/更新分类
export const updateOrSaveGrowup = `${API_IP}growup/updateOrSaveGrowup`;
//成长模块   ===>根据分类dmId获取内容列表
export const pushGrowupArticle = `${API_IP}growup/pushGrowupArticle`;
//成长模块   ===>根据内容dmId获取内容进行编辑
export const getGrowupArticle = `${API_IP}growup/getGrowupArticle`;
//成长模块   ===>新增/更新内容
export const updateOrSaveGrowupArticle = `${API_IP}growup/updateOrSaveGrowupArticle`;
//模特认证管理   ===>获取认证审核列表
export const pushModelAuthenList = `${API_IP}modelAuthen/pushModelAuthenList`;
//模特认证管理   ===>获取用户详情
export const showModelAuthen = `${API_IP}modelAuthen/showModelAuthen`;
//模特认证管理   ===>根据dmId获取认证进行编辑
export const getModelAuthen = `${API_IP}modelAuthen/getModelAuthen`;
//模特认证管理   ===>更新认证信息
export const updateModelAuthenStatus = `${API_IP}modelAuthen/updateModelAuthenStatus`;
//模特管理   ===>获取模特列表
export const pushModelInfoList = `${API_IP}model/pushModelInfoList`;
//模特管理   ===>获取模特信息进行编辑
export const getModelInfo = `${API_IP}model/getModelInfo`;
//模特管理   ===>更新模特信息
export const updateModelInfo = `${API_IP}model/updateModelInfo`;
//模特管理   ===>获取推广记录列表
export const pushShareProfitFlowsList = `${API_IP}shareprofit/pushShareProfitFlowsList`;
//任务订单管理   ===>获取订单列表
export const pushOrderList = `${API_IP}order/pushOrderList`;
//任务订单管理   ===>审核订单
export const updateTaskOrder = `${API_IP}order/updateTaskOrder`;
//订单日志管理   ===>获取订单日志列表
export const pushOrderLogsByOrder = `${API_IP}orderlog/pushOrderLogsByOrder`;
//店铺所属平台分类管理   ===>获取分类列表
export const getPlateforms = `${API_IP}platform/pushPlatforms`;
//店铺所属平台分类管理   ===>获取分类进行编辑
export const getPlateform = `${API_IP}platform/pushPlatform`;
//店铺所属平台分类管理   ===>新增/更新平台
export const updateOrSavePlateform = `${API_IP}platform/updateOrSavePlatform`;
//模特推广佣金规则   ===>获取规则列表
export const pushCommisionList = `${API_IP}modelcommision/pushCommisionList`;
//模特推广佣金规则   ===>获取规则进行编辑
export const getModelCommision = `${API_IP}modelcommision/getModelCommision`;
//模特推广佣金规则   ===>更新规则
export const updateCommision = `${API_IP}modelcommision/updateCommision`;
//推广渠道   ===>获取推广渠道列表
export const pushModelExtensionList = `${API_IP}modelextension/pushModelExtensionList`;
//推广渠道   ===>获取渠道进行编辑
export const getModelExtension = `${API_IP}modelextension/getModelExtension`;
//推广渠道   ===>新增/更新推广渠道
export const updateOrSaveModelExtension = `${API_IP}modelextension/updateOrSaveModelExtension`;
//商家升级套餐管理   ===>获取升级套餐列表
export const pushSellerSpendList = `${API_IP}sellerspend/pushSellerSpendList`;
//商家升级套餐管理   ===>获取套餐进行编辑
export const getSellerSpend = `${API_IP}sellerspend/getSellerSpend`;
//商家升级套餐管理   ===>新增/更新编辑
export const updateOrSaveSellerSpend = `${API_IP}sellerspend/updateOrSaveSellerSpend`;
//商家管理   ===>获取商家列表
export const pushSellersList = `${API_IP}seller/pushSellersList`;
//商家管理   ===>获取商家信息进行编辑
export const getUserInfo = `${API_IP}seller/getUserInfo`;
//商家管理   ===>更新商家信息
export const updateUserInfo = `${API_IP}seller/updateUserInfo`;
//商家管理   ===>根据商家dmId获取店铺列表
export const getShopListBySeller = `${API_IP}shop/getShopListBySeller`;
//商家管理   ===>根据店铺dmId获取店铺进行编辑
export const getSellerShopById = `${API_IP}shop/getSellerShopById`;
//商家管理   ===>更新店铺状态
export const updateSellerShop = `${API_IP}shop/updateSellerShop`;
//短信发送管理   ===>获取短信发送对象
export const getSmsPersonList = `${API_IP}sms/getSmsPersonList`;
//短信发送管理   ===>批量发送短信
export const pushSMSList = `${API_IP}sms/pushSMSList`;
//商家发布任务审核   ===>获取任务列表
export const pushTaskInfos = `${API_IP}task/pushTaskInfos`;
//商家发布任务审核   ===>获取任务进行编辑
export const getTaskInfo = `${API_IP}task/getTaskInfo`;
//商家发布任务审核   ===>更新任务状态
export const updateTask = `${API_IP}task/updateTask`;
//任务支付信息   ===>获取支付列表
export const pushTaskPayInfoList = `${API_IP}taskpayinfo/pushTaskPayInfoList`;
//任务支付信息   ===>获取支付信息进行编辑
export const getTaskPayInfo = `${API_IP}taskpayinfo/getTaskPayInfo`;
//任务支付信息   ===>更新支付信息
export const updateTaskPayInfo = `${API_IP}taskpayinfo/updateTaskPayInfo`;
//获取省市区   ===>获取省市区
export const pushRegionList = `${API_IP}region/pushRegionList`;
//钱包管理   ===>获取商家/模特钱包列表
export const pushUserWalletList = `${API_IP}wallet/pushUserWalletList`;
//权限管理   ===>获取系统所有菜单
export const pushActionList = `${API_IP}action/pushActionList`;
//权限管理   ===>获取权限进行编辑
export const getAction = `${API_IP}action/getAction`;
//权限管理   ===>更新/新增权限
export const updateOrSaveAction = `${API_IP}action/updateOrSaveAction`;
//授权管理   ===>获取授权列表
export const pushActionRoleList = `${API_IP}actionrole/pushActionRoleList`;
//授权管理   ===>更新角色权限
export const updateActionRoles = `${API_IP}actionrole/updateActionRoles`;
//角色管理   ===>获取角色列表
export const pushRoleList = `${API_IP}role/pushRoleList`;
//角色管理   ===>获取角色进行编辑
export const getUserRole = `${API_IP}role/getUserRole`;
//角色管理   ===>新增/更新角色信息
export const updateOrSaveUserRole = `${API_IP}role/updateOrSaveUserRole`;
//用户管理   ===>获取用户列表
export const pushUserList = `${API_IP}user/pushUserList`;
//用户管理   ===>获取单个用户进行编辑	
export const getAdminUserInfo = `${API_IP}user/getUserInfo`;
//用户管理   ===>更新/新增用户信息
export const updateOrSaveUser = `${API_IP}user/updateOrSaveUser`;
//用户管理   ===>重置密码
export const resetUserPwd = `${API_IP}user/resetUserPwd`;
//banner管理   ===>获取banner列表
export const pushBannerList = `${API_IP}banner/pushBannerList`;
//banner管理   ===>获取banner进行编辑
export const getBanner = `${API_IP}banner/getBanner`;
//banner管理   ===>新增/更新banner
export const updateOrSaveBanner = `${API_IP}banner/updateOrSaveBanner`;
//佣金体系管理   ===>获取佣金分类列表
export const pushCommissionCategoryList = `${API_IP}commission/pushCommissionCategoryList`;
//佣金体系管理   ===>获取佣金分类进行编辑
export const getCommissionCategory = `${API_IP}commission/getCommissionCategory`;
//佣金体系管理   ===>新增/更新分类信息
export const updateOrSaveCommissionCategory = `${API_IP}commission/updateOrSaveCommissionCategory`;
//佣金体系管理   ===>根据分类dmId获取内容列表
export const sendCommissionSystemList = `${API_IP}commission/sendCommissionSystemList`;
//佣金体系管理   ===>获取内容进行编辑
export const getCommissionSystem = `${API_IP}commission/getCommissionSystem`;
//佣金体系管理   ===>新增/更新内容
export const updateOrSaveCommissionSystem = `${API_IP}commission/updateOrSaveCommissionSystem`;
//版本控制管理   ===>获取所有版本列表
export const pushAppversionList = `${API_IP}version/pushAppversionList`;
//版本控制管理   ===>获取版本进行编辑
export const getAppVersion = `${API_IP}version/getAppVersion`;
//版本控制管理   ===>新增/更新版本信息
export const updateOrSaveAppVersion = `${API_IP}version/updateOrSaveAppVersion`;
//反馈记录   ===>获取反馈记录列表
export const pushFeedbackRecordList = `${API_IP}feedback/pushFeedbackRecordList`;
//反馈记录   ===>获取反馈详情
export const getFeedbackRecord = `${API_IP}feedback/getFeedbackRecord`;
//反馈记录   ===>更新反馈信息状态
export const updateFeedBackRecord = `${API_IP}feedback/updateFeedBackRecord`;
//后台审核商家升级   ===>获取升级打款记录
export const sellerUpgradeAuthList = `${API_IP}seller/sellerUpgradeAuthList`;
////后台审核商家升级   ===>审核商家升级 
export const updateSellerUpgradeAuth = `${API_IP}seller/updateSellerUpgradeAuth`;
////后台审核商家升级   ===>审核商家升级 
export const updateAuthenStatus = `${API_IP}photos/updateAuthenStatus`;
////设置模特属    ===>设置模特属性
export const updateModelPropertyOne = `${API_IP}properties/updateOne`;
////设置展示照    ===>设置展示照
export const setCover = `${API_IP}photo/setCover`;
////商家详情   ===>商家详情
export const getUserInfoDetails = `${API_IP}seller/getUserInfoDetails`;
//————————————————————————————————————————————————————————————————————————————————————————————————
//获取任务列表
export const pushTaskInfosBySellerId = `${API_IP}task/pushTaskInfosBySellerId`;
//获取任务计划列表
export const getTaskPushPlanListBySellerId = `${API_IP}getTaskPushPlanListBySellerId`;
//未支付
export const pushWaitPayTaskInfos = `${API_IP}task/pushWaitPayTaskInfos`;
//任务--待付款审核
export const pushWaitPayToAuthTaskInfos = `${API_IP}task/pushWaitPayToAuthTaskInfos`;
//任务--已关闭
export const pushCanceledTaskInfos = `${API_IP}task/pushCanceledTaskInfos`;
//任务--已付款待审核
export const pushWaitToAuthTaskInfos = `${API_IP}task/pushWaitToAuthTaskInfos`;
//任务--进行中
export const pushPublishingTaskInfos = `${API_IP}task/pushPublishingTaskInfos`;
//任务--已完成
export const pushComplatedTaskInfos = `${API_IP}task/pushComplatedTaskInfos`;
//任务--审核失败
export const pushFailTaskInfos = `${API_IP}task/pushFailTaskInfos`;
//————————————————————————————————————————————————————————————————————————————————————————————————
//任务(渠道自营)-全部任务
export const pushMainStationTaskInfos = `${API_IP}task/pushMainStationTaskInfos`;
//未支付
export const pushMainStationWaitPayTaskInfos = `${API_IP}task/pushMainStationWaitPayTaskInfos`;
//任务(渠道自营)--待付款审核
export const pushMainStationWaitPayToAuthTaskInfos = `${API_IP}task/pushMainStationWaitPayToAuthTaskInfos`;
//任务(渠道自营)--已关闭
export const pushMainStationCanceledTaskInfos = `${API_IP}task/pushMainStationCanceledTaskInfos`;
//任务(渠道自营)--已付款待审核
export const pushMainStationWaitToAuthTaskInfos = `${API_IP}task/pushMainStationWaitToAuthTaskInfos`;
//任务(渠道自营)--进行中
export const pushMainStationPublishingTaskInfos = `${API_IP}task/pushMainStationPublishingTaskInfos`;
//任务(渠道自营)--已完成
export const pushMainStationComplatedTaskInfos = `${API_IP}task/pushMainStationComplatedTaskInfos`;
//任务(渠道自营)--审核失败
export const pushMainStationFailTaskInfos = `${API_IP}task/pushMainStationFailTaskInfos`;
//————————————————————————————————————————————————————————————————————————————————————————————————
//监控--未支付
export const notPayTask = `${API_IP}monitor/notPayTask`;

//订单-所有订单
//export const pushOrderList = `${API_IP}order/pushOrderList`;
//订单-待付款
export const pushUnPayOrderList = `${API_IP}order/pushUnPayOrderList`;
//订单-待发货
export const pushSendingOrderList = `${API_IP}order/pushSendingOrderList`;
//订单-已发货
export const pushWaitGetOrderList = `${API_IP}order/pushWaitGetOrderList`;
//订单-待上传
export const pushPhotosOrderList = `${API_IP}order/pushPhotosOrderList`;
//订单-待平台审核
export const pushAuthPlatformOrderList = `${API_IP}order/pushAuthPlatformOrderList`;
//订单-平台审核失败
export const pushAuthBackPlatformOrderList = `${API_IP}order/pushAuthBackPlatformOrderList`;
//订单-待商家审核
export const pushAuthingOrderList = `${API_IP}order/pushAuthingOrderList`;
//订单-商家审核失败
export const pushAuthBackBusnessOrderList = `${API_IP}order/pushAuthBackBusnessOrderList`;
//订单-待模特退回订单
export const pushBackingOrderList = `${API_IP}order/pushBackingOrderList`;
//订单-待商家确认收货订单
export const pushRefundmentingOrderList = `${API_IP}order/pushRefundmentingOrderList`;
//订单-已完成订单
export const pushCompletedOrderList = `${API_IP}order/pushCompletedOrderList`;
//订单-已关闭订单
export const pushFineshedOrderList = `${API_IP}order/pushFineshedOrderList`;
//————————————————————————————————————————————————————————————————————————————————————————————————

//订单（渠道自营）-所有订单
export const pushMainStationOrderList = `${API_IP}order/pushMainStationOrderList`;
//订单（渠道自营）-待付款
export const pushMainStationUnPayOrderList = `${API_IP}order/pushMainStationUnPayOrderList`;
//订单（渠道自营）-待发货
export const pushMainStationSendingOrderList = `${API_IP}order/pushMainStationSendingOrderList`;
//订单（渠道自营）-已发货
export const pushMainStationWaitGetOrderList = `${API_IP}order/pushMainStationWaitGetOrderList`;
//订单（渠道自营）-待上传
export const pushMainStationPhotosOrderList = `${API_IP}order/pushMainStationPhotosOrderList`;
//订单（渠道自营）-待平台审核
export const pushMainStationAuthPlatformOrderList = `${API_IP}order/pushMainStationAuthPlatformOrderList`;
//订单（渠道自营）-平台审核失败
export const pushMainStationAuthBackPlatformOrderList = `${API_IP}order/pushMainStationAuthBackPlatformOrderList`;
//订单（渠道自营）-待商家审核
export const pushMainStationAuthingOrderList = `${API_IP}order/pushMainStationAuthingOrderList`;
//订单（渠道自营）-商家审核失败
export const pushMainStationAuthBackBusnessOrderList = `${API_IP}order/pushMainStationAuthBackBusnessOrderList`;
//订单（渠道自营）-待模特退回订单
export const pushMainStationBackingOrderList = `${API_IP}order/pushMainStationBackingOrderList`;
//订单（渠道自营）-待商家确认收货订单
export const pushMainStationRefundmentingOrderList = `${API_IP}order/pushMainStationRefundmentingOrderList`;
//订单（渠道自营）-已完成订单
export const pushMainStationCompletedOrderList = `${API_IP}order/pushMainStationCompletedOrderList`;
//订单（渠道自营）-已关闭订单
export const pushMainStationFineshedOrderList = `${API_IP}order/pushMainStationFineshedOrderList`;
//分站管理  ===》获取分站等级列表
export const pushStationLevelList = `${API_IP}stationlevel/pushStationLevelList`;
//分站管理  ===》获取进行编辑
export const getStationLevelById = `${API_IP}stationlevel/getStationLevelById`;
//分站管理  ===》更新站点等级信息
export const updateStationLevel = `${API_IP}stationlevel/updateStationLevel`;
//分站管理  ===》新增站点等级信息
export const addStationLevel = `${API_IP}stationlevel/addStationLevel`;

//分站管理  ===》  获取站点列表
export const pushStationList = `${API_IP}station/pushStationList`;
//分站管理  ===》  修改站点
export const updateStationInfo = `${API_IP}station/updateStationInfo`;
//分站管理  ===》  新增站点
export const addSubstation = `${API_IP}station/addSubstation`;
//商家充值  ===》 商家充值
export const getSellerRecharge = `${API_IP}wallet/getSellerRecharge`;
//获取分站提现列表  ===》 获取分站提现列表
export const pushStationExtractList = `${API_IP}extract/pushStationExtractList`;
//获取商家提现列表  ===》 获取商家提现列表
export const pushSellerExtractList = `${API_IP}extract/pushSellerExtractList`;
//获取模特提现列表  ===》 获取模特提现列表
export const pushModelExtractList = `${API_IP}extract/pushModelExtractList`;
//提现审核  ===》 提现审核
export const authExtract = `${API_IP}extract/authExtract`;
//任务审核列表  ===》 关闭任务审核列表订单
export const cancelTaskInfo = `${API_IP}task/cancelTaskInfo`;
//审核模块  ===》 获取订单详情
export const getOrder = `${API_IP}order/getOrder`;
//管理后台--财务状况
export const getFinace = `${API_IP}finace/getFinace`;
//商家资金明细
export const businessFlows = `${API_IP}userwalletflow/businessFlows`;
//模特资金明细
export const modelFlows = `${API_IP}userwalletflow/modelFlows`;
//分站资金明细
export const stationFlows = `${API_IP}userwalletflow/stationFlows`;
// 监控模块-任务未抢完
export const notfinishtask = `${API_IP}monitor/notfinishtask`;
// 监控模块-未抢完任务详情
export const getNotFineshTaskById = `${API_IP}monitor/getNotFineshTaskById`;
// 监控模块-商家发货超时订单列表
export const expiredOrder = `${API_IP}order/expiredOrder`;
// 监控模块-查看超时订单详情
export const id = `${API_IP}order/id`;
// 延时接口 --放到监控--商家发货超时--操作里面
export const addOrderSendingTime = `${API_IP}order/addOrderSendingTime`;
// 收益统计
export const pushIncomePage = `${API_IP}income/pushIncomePage`;
// 收益统计 导出EXCEL
export const pushIncomeExcel = `${API_IP}income/pushIncomeExcel`;
// 任务--待发布
export const pushWaitToPublishTaskInfos = `${API_IP}task/pushWaitToPublishTaskInfos`;
// 任务--待发布（渠道自营里的）
export const pushMainStationWaitToPublishTaskInfos = `${API_IP}task/pushMainStationWaitToPublishTaskInfos`;
// 商家编辑---获取分类列表
export const pushCategoryAll = `${API_IP}category/pushCategoryAll`;
// 推广资金明细
export const pushShareprofitFlowList = `${API_IP}wallet/pushShareprofitFlowList`;
//订单详情查询
export const detail = `${API_IP}order/detail`;
//发现获取分类
export const getGrowupListWithArtical = `${API_IP}growup/getGrowupListWithArtical`;
//模特提现导出execl
export const exportModelExtractList = `${API_IP}extract/exportModelExtractList`;
//分站提现导出execl
export const exportStationExtractList = `${API_IP}extract/exportStationExtractList`;

// ————————————————————————————————————————————————————————————————————————————————————————————————————
//任务详情
export const getTaskInfoDetail = `${API_IP}task/getTaskInfoDetail`;
//关闭订单
export const cancelOrder = `${API_IP}order/cancelOrder`;
//监控----充值审核
export const pushMonitorTaskPayInfoList = `${API_IP}taskpayinfo/pushMonitorTaskPayInfoList`;

