import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from 'components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large">返回登录页面</Button>
    </Link>
  </div>
);

export default ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        你的账户：{location.state ? location.state.account : '已'} 重置密码成功
      </div>
    }
    description="您的账户密码已经更新，请使用新密码登录，祝你生意兴隆，身体健康，谢谢合作。"
    actions={actions}
    style={{ marginTop: 56 }}
  />
);
