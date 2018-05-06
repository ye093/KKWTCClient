import { routerRedux } from 'dva/router';
import { fakeAccountLogin, baseAuthorized, smsAuthorized, obainSmsLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { setToken, setCaptchaToken, removeCaptchaToken } from '../utils/tokenUtil';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    code: undefined,
    atype: '',
  },

  effects: {
    /* ----------------此处为新增start---------------- */
    *doLogin({ payload }, { call, put }) {
      // 判断是账号还是手机号登录
      let serApi = baseAuthorized;
      if (payload.type === 'mobile') {
        serApi = smsAuthorized;
      }

      const response = yield call(serApi, payload);

      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
          type: payload.type,
          autoLogin: payload.autoLogin,
        },
      });

      // 登录成功
      if (response.code === 0) {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },

    *obainCaptcha({ payload }, { call, put }) {
      //获取短信验证码
      const response = yield call(obainSmsLogin, payload);
      yield put({
        type: 'captchaResponse',
        payload: response,
      });
    },





    /* ----------------此处为新增end------------------ */



    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.code === 0) {
        // 登录成功
        setAuthority(payload.data.role, payload.autoLogin); // 设置权限
        setToken(payload.data.token, payload.autoLogin);
        removeCaptchaToken(); // 移除短信TOKEN
      }

      return {
        ...state,
        code: payload.code,
        msg: payload.msg,
        type: payload.type,
        atype: '',
      };
    },

    captchaResponse(state, { payload }) {
      if (payload.code === 0) {
        // 短信成功发送
        let captchaToken = payload.data.token;
        setCaptchaToken(captchaToken);
      }

      if (payload.code === 0) {
        message.success(payload.msg);
      } else {
        message.error(payload.msg);
      }

      return {
        ...state,
        code: payload.code,
        msg: payload.msg,
        type: 'mobile',
        atype: 'captcha',
      };

    },
  },
};
