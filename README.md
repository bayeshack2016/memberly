<div align="center">
<img src="https://i.loli.net/2020/03/27/xdEUXeo6QDMWa2O.png" width="80px" height="80px"/>
</div>
  <h1 align="center">
    Coodo Pay
  </h1>
  <h3 align="center">
    一个稳定好用的会员支付系统
  </h3>
<p align="center">
    为独立开发者和站长打造的会员支付解决方案
</p>
<div align="center">

[演示](https://pay.960960.xyz/#/product/1) | [教程](https://www.yuque.com/docs/share/5d0fd4df-7de6-424c-a389-6e187e764966?#%20《Coodo%20Pay%20搭建教程（宝塔面板篇）》) | [文档](https://www.yuque.com/docs/share/1f840e93-4ad1-437b-8639-bc480c4ae5aa?#%20《Coodo%20Pay%20开发指南》) | [反馈](https://github.com/troyeguo/coodo-pay/issues)| [讨论](https://github.com/troyeguo/coodo-pay/discussions)

</div>

## 项目预览

<img src="https://i.loli.net/2020/07/10/szqvUMpV9IALkXQ.png">
<img src="https://i.loli.net/2020/07/10/zHZmOoi4rBMaU1D.png">

## 项目简介

这套系统可以创建商品，并为您的商品生成唯一的购买链接，内置了支付宝、Paypal 等支付方式，购买了您商品的用户会收到我们自动发送的订单邮件，并且可以使用我们的订单查询系统来查询自己的购买记录。您可以使用我们内置的账户系统来管理您的用户，也可以和您已有的账户系统集成，或者您不需要账户系统，这时您只需创建兑换码类型的商品，购买了该商品的用户将会获得一个唯一的兑换码。同时我们还提供了折扣码这一营销手段，用户只需在购买时输入您指定的折扣码，就能以优惠的价格购买您的商品。最后我们精心设计了 10 套商品页主题，并且让整个系统完美运行在了各种尺寸的电脑和手机上。

## 预览地址

[前台商品页](https://pay.960960.xyz/#/product/1)

[后台管理系统](https://pay.960960.xyz)

## 搭建方式

快速尝鲜：
使用 Heroku 或 Glitch [点我前往](https://www.yuque.com/docs/share/5db4d689-2177-4b91-9692-c9723fe16aa9?#%20《Coodo%20Pay%20搭建教程%20（Heroku%20篇）》)

正式使用：
使用宝塔面板 [点我前往](https://www.yuque.com/docs/share/5d0fd4df-7de6-424c-a389-6e187e764966?#%20《Coodo%20Pay%20搭建教程（宝塔面板篇）》)

## API 文档

[点我前往](https://www.yuque.com/docs/share/1f840e93-4ad1-437b-8639-bc480c4ae5aa?#%20《Coodo%20Pay%20开发指南》)

## 常见问题

### Coodo Pay 和发卡系统有什么区别？

发卡系统可以售卖任何虚拟商品，包括兑换码，账号密码，下载链接等，而 Coodo Pay 专注于会员支付功能，既可以售卖单独的兑换码，也可以和您已有的用户账号体系集成，提供一站式的会员激活和验证服务。

### Coodo Pay 是如何工作的？

Coodo Pay 需要您提供支付宝或 PayPal 的账号和密匙，用户支付成功后，钱会直接进入您的账户中，没有额外的手续费，也无需单独提现。

### Coodo Pay 安全吗？

Coodo Pay 是一个开源免费的支付系统，所有的代码都已上传到本仓库中，本人承诺绝不会保留后门和窃取您的个人信息。支付系统中众多关键服务都开启了安全验证功能，可有效防范常见的网络攻击。

## 技术栈

### 前端

- React (with hooks)
- React Router
- React Redux
- Ant Design
- ...

### 后端

- Koa2
- Mongodb
- PM2
- JSON Web Token
- NodeMailer
- WebSocket
- ...

## 运行源码

请确保您电脑的 node 的版本大于 10.0.0，已配置好 yarn，git 的运行环境。

1. 将项目源码下载到本地

2. 将 config.js 里的 connection 替换成自己的数据库地址，打开命令行工具，运行以下代码：

   ```
   yarn
   yarn dev
   ```

3. 前往 https://github.com/troyeguo/coodo-pay-frontend ，下载前端源码，打开命令行工具，运行以下代码：

   ```
   yarn
   yarn start
   ```

4. 整个安装和启动过程比较漫长，只要控制台和命令行没报错，还请耐心等待

5. 在浏览器中启动后，首先会看到登录页面，此时请修改 url 末尾的 login 为 install，就可以进入安装页面，再按提示进行后面的操作

6. 以上介绍可能难以覆盖所有流程，如果您在哪一步出现问题或者有疑问，欢迎通过 issue 向我提问

## 后续更新

我会根据大家的反馈不定时更新，您可以在后台管理系统的账户信息处检查更新。

## 帮助信息

我会在前面的搭建教程中尽量提到所有需要注意的问题，请仔细阅读，当然您还可以在 issue 区提问，我会在力所能及的范围内提供帮助
