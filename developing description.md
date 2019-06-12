# 用户管理

使用cookie-session机制实现持久化登录，每次打开app都会向服务器请求个人信息，若成功则说明cookie仍然有效，若失败则需要用户重新登录。

是否需要本地储存用户信息?

## 获取登录状态

```javascript
this.$store.getters.isSignedIn
```

## 获取用户信息

```javascript
this.$store.state.user
```

