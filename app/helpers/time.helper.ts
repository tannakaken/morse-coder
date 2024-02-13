/**
 * 与えられたミリ秒の間、非同期関数処理を止めて、他の処理を進める。
 */
export const sleep = (millseconds: number) =>
  new Promise(resolve => setTimeout(resolve, millseconds));

/**
 * sleepが止められたときに投げる定数。
 */
export const THROWED_CANCEL = 'CANCEL';
