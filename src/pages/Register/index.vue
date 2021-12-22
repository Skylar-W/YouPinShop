<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入您的手机号"
          v-model="phone"
          name="phone"
          v-validate="{regex: /^1\d{10}$/}"
          :class="{ invalid: errors.has('phone') }"
          required
        />
        <span class="error-msg">{{errors.first("phone")}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input 
          type="text" 
          placeholder="请输入验证码" 
          v-model="code"
          name="code"
          v-validate="{ regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
       />
        <button @click="getVerifyCode">获取验证码</button>
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
          name="password"
          v-validate="{ regex: /^[0-9a-zA-Z_]{6,12}$/ }"
          :class="{ invalid: errors.has('password') }"
          required
        />
        <span class="error-msg">{{errors.first('password')}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="password2"
          name="password2"
          v-validate="{is: password}"
          :class="{ invalid: errors.has('password2') }"
          required
        />
        <span class="error-msg">{{errors.first('password2')}}</span>
      </div>
      <div class="controls">
        <input 
          type="checkbox"
          name="agree" 
          v-model="agree"
          v-validate="{ isAgree: true }"
          :class="{ invalid: errors.has('agree') }"
          required
        />
        <span>同意协议并注册 |《优品购用户协议》</span>
        <span class="error-msg">{{ errors.first('agree') }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机优品购</li>
        <li>销售联盟</li>
        <li>优品购社区</li>
      </ul>
      <div class="address">地址：北京市西城区帝景大厦29层306室</div>
      <div class="beian">京ICP备19002765号</div>
    </div>
  </div>
</template>

<script>
import { phoneRegExp, pwdRegExp } from "@/utils/regExp";
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      password2: "",
      agree: true
    };
  },
  methods: {
    async getVerifyCode() {
      //获取验证码
      try {
        let { phone } = this;
        phoneRegExp.test(phone) &&
        (await this.$store.dispatch("getVerifyCode", phone));
        //将组件的code属性值变为仓库中验证码[验证码直接自己填写了]
        this.code = this.$store.state.user.code;
      } catch (err) {
        alert(err.message);
      }
    },
    async userRegister() {
      const success = await this.$validator.validateAll()
      //提交注册信息
      if(success) {
        try {
          let { phone, code, password, password2 } = this;
          //注册信息正则校验
          // if (
          //   phoneRegExp.test(phone) &&
          //   pwdRegExp.test(password) &&
          //   password === password2
          // ) {
            await this.$store.dispatch("userRegister", { phone, password, code });
            //注册信息校验通过(注册成功)后进行路由跳转
            this.$router.push("/login");
          // }
        } catch (err) {
          alert(err.message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      button {
        width: 100px;
        height: 38px;
        margin-left: 4px;
      }

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>