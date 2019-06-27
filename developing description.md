# 用户管理

使用cookie-session机制实现持久化登录，每次打开app都会向服务器请求个人信息，若成功则说明cookie仍然有效，若失败则需要用户重新登录。


## 获取登录状态

```javascript
this.$store.getters.isSignedIn
```

## 获取用户信息

```javascript
this.$store.state.user
```

## 获取用户余额

```javascript
this.$store.state.coin
```

## 时间格式化
```javascript
this.$dateFormatter(new Date) //Date to String
Date.parse(dateString)        //String to Date
```

## 时间拆分
```javascript
dateString.split(" ")[0]
```
