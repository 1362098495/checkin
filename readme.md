# Checkin

GitHub Actions 实现 [GLaDOS][glados] 自动签到

## 使用说明

1. Fork 这个仓库
2. 登录 [GLaDOS][glados] 获取 Cookie
3. 添加 Cookie 到 Secret `GLADOS`
4. 启用 Actions, 每天北京时间 00:10 自动签到
5. 如需推送通知, 可用 [Server酱][Server], 添加 Token 到 Secret `NOTIFY`
6. 设置账号名，添加 Account 到 Secret `Account`

[glados]: https://github.com/glados-network/GLaDOS
[Server]: https://sct.ftqq.com/
