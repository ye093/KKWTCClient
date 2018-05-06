import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon,message } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
import { getCaptchaToken } from '../../utils/tokenUtil';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    mobile: '', // 手机号
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    let putValues = null;
    let captchaToken = getCaptchaToken();
    if (!err) {
      if (type === 'mobile') {
        if (captchaToken.length === 0) {
          message.info('请先获取验证码');
          return;
        }
        putValues = {
          ...values,
          token: captchaToken,
        }
      } else {
        putValues = { ...values };
      }
      this.props.dispatch({
        type: 'login/doLogin',
        payload: {
          ...putValues,
          type,
          autoLogin: this.state.autoLogin,
        },
      });
    }
  };

  // 监听手机号输入
  onMobileInput = e => {
    // 必须是纯数字10位起,13位结束
    let reg = /^1\d{10,12}$/;
    let mobile = e.target.value;
    if (reg.test(mobile)) {
      this.setState({
        mobile
      });
    } else {
      if (this.state.mobile.length > 0) {
        this.setState({
          mobile: '',
        });
      }
    }
  };

  // 获取验证码
  onGetCaptcha = () => {
    this.props.dispatch({
      type: 'login/obainCaptcha',
      payload: {
        mobile: this.state.mobile,
      },
    });
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  renderCaptchaMessage = (code, content) => {
    if (code === 0) {
      message.success(content);
    } else {
      message.error(content);
    }
  };

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            { (login.code && login.code !== 0) &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage(login.msg)}
            <UserName name="username" placeholder="账号" />
            <Password name="password" placeholder="密码" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {login.atype === '' && (login.code && login.code !== 0) &&
              login.type === 'mobile' &&
              !login.submitting &&
              this.renderMessage(login.msg)
              }
            <Mobile name="mobile" placeholder="手机号码" onChange={this.onMobileInput}/>
            <Captcha name="captcha" placeholder="验证码" chaptchaEnable={this.state.mobile.length !== 0} onGetCaptcha={this.onGetCaptcha}/>
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            {/* <a style={{ float: 'right' }} href="">
              忘记密码
            </a> */}
            <Link className={styles.register} style={{ float: 'right' }} to="/user/register">
              忘记密码
            </Link>
          </div>
          <Submit loading={submitting}>登录</Submit>
          {/* <div className={styles.other}>
            其他登录方式
            <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="taobao-circle" />
            <Icon className={styles.icon} type="weibo-circle" />
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
          </div> */}
        </Login>
      </div>
    );
  }
}
