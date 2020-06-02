"use strict";
const nodemailer = require("nodemailer");
const Email = require("../models/email");
// async..await is not allowed in global scope, must use a wrapper
class emailUtil {
  async sendMail(code, email, productName, levelName, price, orderId, date) {
    console.log("hello mail");
    const emails = await Email.findOne();
    const { mailAddress, mailPassword, sendName } = emails;
    // console.log(mailAddress, mailPassword, sendName);
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      service: "qq", // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
      port: 465, // SMTP 端口
      secureConnection: true, // 使用了 SSL
      auth: {
        user: mailAddress,
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: mailPassword,
      },
    });

    let mailOptions = {
      from: `${sendName} <${mailAddress}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${productName}${levelName}`, // Subject line
      // 发送text或者html格式
      // text: 'Hello world?', // plain text body
      html: `<!DOCTYPE html><html lang="en"><head><base target="_blank" /><style type="text/css">::-webkit-scrollbar{ display: none; }</style><style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style><style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style></head><body tabindex="0" role="listitem"><div id="content" class="netease_mail_readhtml"><div marginwidth="0" marginheight="0" style="background-color:#f1f1f1;min-width:600px;padding:0"><table width="100%" style="background-color:#f1f1f1;min-width:600px" bgcolor="#f1f1f1"><tbody><tr><td align="center" valign="top" width="100%" style="min-width:600px"><center><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0" bgcolor="#f1f1f1"><tbody><tr><td align="center"><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0"><tbody><tr height="50"><td width="100%" height="50" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><table border="0" cellpadding="0" cellspacing="0" style="min-width:600px"><tbody><tr><td valign="middle" align="center"><div style="max-height:50px"><div></div></div></td></tr></tbody></table></td></tr></tbody></table><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><table width="560" border="0" cellpadding="0" cellspacing="0" style="min-width:560px"><tbody><tr height="50"><td width="100%" height="50" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td width="560" align="center" style="font-family:arial,helvetica,sans-serif;font-weight:bold;font-size:50px;color:#313131;text-align:left;line-height:75px"><div style="text-align:center;line-height:75px">感谢购买</div></td></tr><tr height="30"><td width="100%" height="30" style="line-height:1px;font-size:1px">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0" bgcolor="#f1f1f1"><tbody><tr><td align="center"><table width="600" style="min-width:600px;background-color:#ffffff" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><table width="560" border="0" cellpadding="0" cellspacing="0" style="min-width:560px"><tbody><tr height="30"><td width="100%" height="30" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td width="560" align="center" style="font-family:arial,helvetica,sans-serif;font-size:16px;color:#313131;text-align:left;line-height:24px"><div style="text-align:center;line-height:24px"><span style="font-size:18px"><strong>尊敬的用户,</strong></span><br>感谢您购买${productName}的会员。<br><br><span style="font-size:35px"><strong>会员码: ${code}</strong></span><br><span style="font-size:14px;color:#b2b2b2;line-height:40px">( 请保留本收据，以备后用。)</span></div></td></tr><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:600px;background-color:#ffffff"><tbody><tr><td align="center"><table width="540" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-family:arial,helvetica,sans-serif;text-transform:uppercase;font-size:14px;color:#b2b2b2;text-align:left;line-height:24px"><div style="font-family:arial,helvetica,sans-serif;font-size:14px;color:#b2b2b2;text-align:left"><strong>您的订单信息:</strong></div></td></tr><tr height="1"><td width="100%" height="1" style="line-height:1px;font-size:1px;background-color:#e2e3e4">&nbsp;</td></tr><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:600px;background-color:#ffffff"><tbody><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><table width="540" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><table align="left" border="0" cellpadding="0" cellspacing="0" width="270" style="min-width:270px"><tbody><tr><td align="center"><div style="font-family:Ariel,Helvetica,sans-serif;font-size:16px;color:#313131;text-align:left;line-height:24px"><strong>订单 ID:</strong><br>${orderId}<br><br><strong>订购日期:</strong><br>${date}<br></div></td></tr></tbody></table><table align="right" border="0" cellpadding="0" cellspacing="0" width="270" style="min-width:270px"><tbody><tr><td align="center"><div style="font-family:Ariel,Helvetica,sans-serif;font-size:16px;color:#313131;text-align:left;line-height:24px"><strong>账单地址:</strong><br><a href="mailto:qinxiaohanyu12138@gmail.com" target="_blank">${email}</a><br><br><strong>来源:</strong><br>Coodo Pay<br></div></td></tr><tr height="1"><td width="100%" height="1" style="line-height:1px;font-size:1px">&nbsp;</td></tr></tbody></table></td></tr><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:600px;background-color:#ffffff"><tbody><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><table width="540" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td></td></tr><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:600px;background-color:#ffffff"><tbody><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><table width="540" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-family:arial,helvetica,sans-serif;text-transform:uppercase;font-size:14px;color:#b2b2b2;text-align:left;line-height:24px"><div style="font-family:arial,helvetica,sans-serif;font-size:14px;color:#b2b2b2;text-align:left"><strong>以下是您订购的物品:</strong></div></td></tr><tr height="1"><td width="100%" height="1" style="line-height:1px;font-size:1px;background-color:#e2e3e4">&nbsp;</td></tr></tbody></table><table width="540" border="0" bgcolor="#f1f1f1" cellspacing="0" cellpadding="0" style="min-width:540px;background-color:#f1f1f1"><tbody><tr><td align="center"><table width="520" border="0" cellspacing="0" cellpadding="0"><tbody><tr height="10"><td width="100%" height="10" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><table align="left" width="260" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div style="font-family:arial,helvetica,sans-serif;font-size:14px;color:#313131;text-align:left"><strong>说明:</strong></div></td></tr></tbody></table><table align="left" width="140" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div style="font-family:arial,helvetica,sans-serif;font-size:14px;color:#313131;text-align:left"><strong>技术支持:</strong></div></td></tr></tbody></table><table align="right" width="80" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div style="font-family:arial,helvetica,sans-serif;font-size:14px;color:#313131;text-align:right"><strong>价格:</strong></div></td></tr></tbody></table></td></tr><tr height="10"><td width="100%" height="10" style="line-height:1px;font-size:1px">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:600px;background-color:#ffffff"><tbody><tr height="8"><td width="100%" height="8" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><table width="520" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%"><tbody><tr><td align="center" width="220px" style="min-width:220px"><div style="font-family:Ariel,Helvetica,sans-serif;font-size:14px;color:#313131;text-align:left;line-height:20px;word-break:break-all;padding:5px 5px 5px 0">${productName}${levelName}</div></td><td align="center" width="140" style="min-width:140px"><div style="font-family:Ariel,Helvetica,sans-serif;font-size:14px;color:#313131;text-align:left;line-height:20px;word-break:break-all;padding:5px 5px 5px 0">Coodo Pay</div></td><td align="center" width="80" style="min-width:80px"><div style="font-family:Ariel,Helvetica,sans-serif;font-size:14px;color:#313131;text-align:right;line-height:20px;word-break:break-all;padding:5px 0 5px 0">${price}元</div></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><table width="540" border="0" cellspacing="0" cellpadding="0"><tbody><tr height="1"><td width="100%" height="1" style="line-height:1px;font-size:1px;background-color:#e2e3e4">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:600px;background-color:#ffffff"><tbody><tr><td align="center"><table width="520" border="0" cellspacing="0" cellpadding="0"><tbody><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><table align="left" width="412px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td><div style="font-family:Ariel,Helvetica,sans-serif;font-weight:bold;text-transform:uppercase;font-size:14px;color:#b2b2b2;text-align:right;line-height:26px">总计:<br></div></td></tr></tbody></table><table align="right" width="80px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><div style="font-family:Ariel,Helvetica,sans-serif;font-weight:bold;font-size:14px;color:#313131;text-align:right;line-height:26px">${price}元<br></div></td></tr></tbody></table></td></tr><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><div style="font-family:Ariel,Helvetica,sans-serif;font-size:14px;color:#313131;text-align:center;line-height:26px"></div></td></tr><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><table width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="min-width:600px;background-color:#ffffff"><tbody><tr><td align="center"><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table width="100%" style="min-width:600px" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center"><table width="600" border="0" cellpadding="0" cellspacing="0" style="min-width:600px"><tbody><tr height="15"><td width="100%" height="15" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><table width="560" border="0" cellpadding="0" cellspacing="0" style="min-width:560px"><tbody><tr><td align="center"><div style="font-family:ariel,helvetica,sans-serif;font-weight:bold;font-size:14px;color:#313131;text-align:center;line-height:26px">需要帮助?<a style="text-decoration:none;color:#6bae7c" href="https://github.com/troyeguo/coodo-pay" target="_blank">App by Troye</a><br></div></td></tr><tr height="20"><td width="100%" height="20" style="line-height:1px;font-size:1px">&nbsp;</td></tr><tr><td align="center"><div style="font-family:ariel,helvetica,sans-serif;font-size:12px;color:#858585;text-align:center;line-height:20px"><p>© 2020 App by Troye 版权所有</p><a href="https://github.com/troyeguo/coodo-pay" style="color:#6bae7c" target="_blank">服务条款</a> |<a href="https://github.com/troyeguo/coodo-pay" style="color:#6bae7c" target="_blank">隐私权政策</a></div></td></tr><tr><td align="center" style="color:#313131">&nbsp;</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></center></td></tr></tbody></table></div></div></div></div><script>var _c=document.getElementById('content');_c.innerHTML=(_c.innerHTML||'').replace(/(href|formAction|onclick|javascript)/ig, '__$1').replace(/<\/?marquee>/ig,'');var _s = _c.getElementsByTagName('style');for(var i=0;i<_s.length;i++){ var _st = _s[i].innerHTML.split('}'); for(var j=0;j<_st.length-1;j++){ _st[j] = '.netease_mail_readhtml '+_st[j]; } _s[i].innerHTML = _st.join('}'); }</script><style type="text/css">body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}td, input, button, select, body{font-family:Helvetica, 'Microsoft Yahei', verdana}pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}th,td{font-family:arial,verdana,sans-serif;line-height:1.666}img{ border:0}header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}blockquote{margin-right:0px}</style><style id="ntes_link_color" type="text/css">a,td a{color:#064977}</style></body></html>	`, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });
  }
}
module.exports = new emailUtil();
