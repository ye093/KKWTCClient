import { fakeRegister, obainSmsResetpwd, doResetpwd } from '../services/api';
import { message } from 'antd';
import { setResCaptchaToken, removeResCaptchaToken } from '../utils/tokenUtil';

export default {
  namespace: 'register',

  state: {
    code: undefined,
  },

  effects: {
    // 获取重置密码短信
    *gitCaptCha( { payload }, { call, put }) {
      const response = yield call(obainSmsResetpwd, payload);
      yield put({
        type: 'captchaResponse',
        payload: response,
      });
    },

    *submit({ payload }, { call, put }) {
      const response = yield call(doResetpwd, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    // 处理短信结果
    captchaResponse(state, { payload }) {
      if (payload.code === 0) {
        // 短信成功发送
        let captchaToken = payload.data.token;
        setResCaptchaToken(captchaToken);
      }

      if (payload.code === 0) {
        message.success(payload.msg);
      } else {
        message.error(payload.msg);
      }
      return {
        ...state,
        code: payload.code,
      };
    },

    registerHandle(state, { payload }) {
      if (payload.code === 0) {
        removeResCaptchaToken();
      }
      return {
        ...state,
        code: payload.code,
        msg: payload.msg,
      };
    },
  },
};
