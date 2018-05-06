import { stringify } from 'qs';
import request from '../utils/request';

// --------------此为新增接口start---------------

/** 基本认证 */
export async function baseAuthorized(params) {
  return request('/api/authorize/base', {
    method: 'POST',
    body: params,
  });
}

/** 短信认证  */
export async function smsAuthorized(params) {
  return request('/api/authorize/sms', {
    method: 'POST',
    body: params,
  });
}

/** 获取登录短信 */
export async function obainSmsLogin(params) {
  return request('/api/sms/login', {
    method: 'POST',
    body: params,
  });
}







// --------------此为新增接口end-----------------


export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
