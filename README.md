<div align="center">
<img src="https://i.loli.net/2020/03/27/xdEUXeo6QDMWa2O.png" width="80px" height="80px"/>
</div>
  <h1 align="center">
    Coodo Pay
  </h1>
  <h3 align="center">
    一个基于 React 和 Koa2 开发的在线支付系统
  </h3>
<p align="center">
    为独立开发者和站长打造的会员支付解决方案
</p>

## 项目预览

<img src="https://i.loli.net/2020/05/31/OAYDaXHiRV7w6j2.png">
<img src="https://i.loli.net/2020/05/31/pYhrvI7nQRKlsau.png">

## 开发背景

独立开发者常常为了寻找到一个稳定可靠的会员支付方式而发愁，微信和支付宝的 API 申请门槛高，SDK 集成难度大，而选择第三方支付平台又存在资金不安全，平台跑路的风险。Coodo Pay 作为一个开源免费的支付系统，集成了商品管理，订单管理和数据可视化等诸多实用强大的功能，无需编写任何代码即可集成目前主流的支付 API，最大程度上降低独立开发者的收款门槛。

## 开发理念

**Coodo Pay** 支持添加两种不同类型的商品：

- 如果您的应用或者网站没有用户注册功能，建议您创建会员码类型的商品，这一商品会在用户完成支付后，自动生成一个会员码，会员码作为用户付费的凭证，由用户提交给开发者进行验证，然后您只需向我们指定的验证接口发送会员码，Coodo Pay 就会向您返回该用户的订单信息。

- 如果您的应用或者网站有自己的用户系统，建议您创建非会员码非会员码类型的商品，当用户下单了非会员类型的商品，Coodo Pay 会向开发者创建商品时指定的回调地址发送订单信息，由开发者的后台服务器更新该用户的会员状态，并向 Coodo Pay 返回验证结果。

## 特色 👇

📝 零成本搭建：使用 **Heroku** 提供的免费应用和 **Mongodb Altas** 提供的免费云数据库搭建所有服务

🌉 快速上手：无需配置复杂的服务器环境，您只需注册账号和复制粘贴简单的代码即可完成所有流程

🌎 支付宝当面付收款，即时到账，未来计划添加微信支付和 Paypal 支付

💻 专为独立开发者和独立站长打造，提供从会员支付到会员资格验证的一整套解决方案

🖥 内置多套主题，个性化定制产品页面

🌱 安全稳定，防范常见网络攻击和暴力破解

😘 当然 **Coodo Pay** 还很年轻，难免有一些 bug 和瑕疵，但有你的支持它一定会越来越好 🏃

## 技术栈

### 前端

- React (with hooks)
- React Router
- React Redux
- Ant Design
- ...

### 后端

- node
- Koa2 + 相关 npm 包
- ES6
- pm2
- mongoose
- nodemon
- nodemailer
- morgan
- jsonwebtoken
- ...

## 预览地址

项目托管在 **Heroku** 上，由于免费应用的休眠机制，需要等待 10s 左右才能打开网页

[前台产品页](https://pay.960960.xyz/#/product/6)

[后台管理系统](https://pay.960960.xyz)

```
账号：coodo@102410.xyz
密码：123456
```

[API 文档](https://pay.960960.xyz/swagger)

## 项目架构

<img src="https://i.loli.net/2020/06/25/IAvzkwqybueSd1p.png">
<img src="https://i.loli.net/2020/06/25/GpBbfny8JdVN1cr.png">

## 搭建方式

请前往简书，查看详细的图文教程

[点我前往](https://www.jianshu.com/p/13e3ed3f7079)

## 运行源码

请确保您电脑的 node 的版本大于 10.0.0，已配置好 yarn，git 的运行环境。

1. 将项目源码下载到本地

2. 进入 back-end 文件夹，将 config.js 里的 connection 替换成自己的云数据库地址，打开命令行工具，运行以下代码：

   ```
   yarn
   yarn dev
   ```

3. 进入 front-end 文件夹，打开命令行工具，运行以下代码：

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
